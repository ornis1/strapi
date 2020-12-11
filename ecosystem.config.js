module.exports = {
  apps: [
    {
      name: "back",
      script: "npm",
      args: "start",
      watch: ["config", "components", "api"],
      instances: 2,
    },
  ],
};
