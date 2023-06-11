import app from './app';
import { config } from './config';
import { MongoDB } from './mongoDB';

(async () => {
  // start monogdb
  const mongoDB = new MongoDB(config);
  try {
    await mongoDB.start();
    console.log('mongoose connected successfully');
  } catch (error) {
    console.log('error connecting to mongodb', error);
    return;
  }

  // start Server
  try {
    await app.listen(config.port, () => {
      console.log('server running on port: ', config.port);
    });
  } catch (error) {
    console.log('error connecting to the server ', error);
    return;
  }
})();
