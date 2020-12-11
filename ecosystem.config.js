module.exports = {
  apps: [
    {
      name: "back",
      script: "yarn",
      args: "start",
      watch: ".",
      // mode: "cluster",
      // instances: 2,
      watch: ["config", "components", "api", "extensions"],
      env: {
        NODE_ENV: "production",
        PORT: 1337,
        HOST: "127.0.0.1",
        DATABASE_HOST: "",
        DATABASE_PORT: "5432",
        DATABASE_NAME: "strapi",
        DATABASE_USERNAME: "strapi",
        DATABASE_PASSWORD: "",
      },
    },
  ],
};
