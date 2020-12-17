module.exports = {
  apps: [
    {
      name: "workflow",
      script: "npm",
      args: "run start",
      watch: ".",
      watch: ["config", "components", "api"],
    },
  ],
};
