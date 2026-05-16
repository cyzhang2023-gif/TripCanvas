module.exports = {
  apps: [
    {
      name: "routey",
      script: "scripts/serve-aliyun.mjs",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3001",
      },
      max_memory_restart: "512M",
      watch: false,
    },
  ],
};
