"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/* Существуют ли нужные поля */
const isData = ({ email, products, fullname }) => {
  return email && products && fullname;
};

module.exports = {
  create: async (ctx) => {
    /*
      Получить данные из запрос:
      fullname, postalCode, phone, email?, amount, products
    */

    const data = ctx.request.body;

    if (!isData(data)) {
      return "Error, invalid order data";
    }

    const { products: queryProducts, email, fullname } = data;
    const ids = queryProducts.map((p) => p.id);

    /* Поиск продуктов в бд для добавления их в заказ */

    const productsDB = await strapi.services.product.find({ id: ids });

    const ordersProducts = productsDB.filter((p) => ids.includes(p.id));

    const getQty = (id) => queryProducts.find((v) => +v.id === id).qty;

    const amount = ordersProducts.reduce((accum, p) => {
      const qty = getQty(+p.id);
      return (accum += p.price * qty);
    }, 0);

    /* Добавляем заказ в бд */
    const createdOrder = await strapi.services.orders.create({
      amount,
      email,
      fullname,
      products: ordersProducts,
    });

    const domain = process.env.DOMAIN
      ? `https://${process.env.DOMAIN}/api`
      : "http://localhost:1337";
    const list = ordersProducts.map((p, index) => {
      return `
      <p>${index + 1}) ${p.name} ${getQty(+p.id)}шт.</p>
      <p>На сумму ${amount}руб.</p>
      `;
    });
    const message = `<h1>Новый заказ  id: ${createdOrder.id}</h1>
    <h3>Список</h3>
    ${list}
    <a href="${domain}/admin/plugins/content-manager/collectionType/application::orders.orders">Тык</a>
    `;

    /* Отправляем на почту уведомление о новом заказе */
    /* Почту на которую отправляем уведомление берем из бд */
    const emailEntity = await strapi.services.cart.find();

    const sanitizedEmailEntity = sanitizeEntity(emailEntity, {
      model: strapi.models.cart,
    });

    const to = sanitizedEmailEntity.email || "margarita.egorycheva@gmail.com";

    const from = sanitizedEmailEntity.emailFrom || "m.tukhtarov@gmail.com";

    strapi.plugins.email.provider
      .send({
        to,
        from,
        replyTo: to,
        subject: `Новый заказ`,
        html: message,
      })
      .catch((e) => console.error(e.response.body.errors));

    return "";
  },
};
