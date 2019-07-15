/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const Express = require('express');
const path = require('path');

const { handleRoutes } = require('./routes');

async function start() {
  // Config Express
  const app = Express();
  app.set('port', process.env.PORT || 3000);
  app.use('/', Express.static(path.join(__dirname, '../public')));

  // Use router to handle /api routes
  await handleRoutes(app);

  app.listen(app.get('port'), () => console.log(`AgriSCM File Sharing listening on port ${app.get('port')}`));
}

start();
