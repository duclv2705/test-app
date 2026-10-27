const path = require('node:path');

module.exports = {
  apps: [
    {
      name: 'ihnonomiru-api',
      cwd: __dirname,
      script: '/usr/bin/npm',
      args: 'run start:api',
      env: {
        NODE_ENV: 'production',
        PORT: '4000',
        WEB_ORIGIN: 'https://ihnonomiru.fun',
      },
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      time: true,
      max_memory_restart: '300M',
    },
    {
      name: 'ihnonomiru-web',
      cwd: __dirname,
      script: '/usr/bin/npm',
      args: 'run start:web',
      env: {
        NODE_ENV: 'production',
        PORT: '13001',
        API_URL: 'http://127.0.0.1:4000/api',
      },
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      time: true,
      max_memory_restart: '500M',
    },
  ],
};