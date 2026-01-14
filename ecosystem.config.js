module.exports = {
  apps: [
    {
      name: 'nextjs-client',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'express-server',
      script: 'server/index.js',
      env: {
        PORT: 5000,
        NODE_ENV: 'production'
      }
    }
  ]
};
