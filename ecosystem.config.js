module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        HOST: "0.0.0.0",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0",
      },
    },
  ],
};
