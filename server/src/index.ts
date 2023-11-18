import app from './app';
import config from './config/config';
import http from 'http';

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log('SERVER');
  console.log(`Listening to port ${config.port}`);
});
