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
        PORT: "3002",
        DEEPSEEK_API_KEY: "sk-75470154dc65481ca71c7fd1ec9d863e",
        TIKHUB_API_KEY: "088tWeMZ/F+avHe/E97K7ByMJiKSf7dCxRTk6GG9Yfaau1mdHGW9fDGUKw==",
        N8N_DATABASE_URL: "postgresql://postgres:123456@localhost:5433/tripcanvas",
        UNSPLASH_ACCESS_KEY: "fRXItWyNjxQJWr0GqroArKscNukNoeFAVzP01CUDaBY",
        PEXELS_API_KEY: "FZzjvx65H6O9RgIhA6kHfyxTx4lqkG2Tcra0QEUZT3VNt9B9jaBiYSUg",
      },
      max_memory_restart: "512M",
      watch: false,
    },
  ],
};
