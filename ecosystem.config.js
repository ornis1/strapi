module.exports = {
  apps: [
    {
      name: "workflow",
      script: "npm",
      args: "run start",
      watch: ".",
      mode: "cluster",
      instances: 2,
      watch: ["config", "components", "api"],
    },
  ],
};
