module.exports = {
  apps: [
    {
      name: "back",
      script: "npm",
      args: "run start",
      watch: ".",
      // mode: "cluster",
      // instances: 2,
      watch: ["config", "components", "api", "ecosystem.config.js"],
      env: {
        DOMAIN: "104.248.52.14",
        NODE_ENV: "production",
        PORT: 1337,
        HOST: "127.0.0.1",
        DATABASE_HOST: "localhost",
        DATABASE_PORT: "5432",
        DATABASE_NAME: "strapi",
        DATABASE_USERNAME: "strapi",
        DATABASE_PASSWORD: "",
      },
    },
  ],
};
