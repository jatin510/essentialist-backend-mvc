import { Application } from 'express';
import http from 'http';
import { MongoDB } from './mongoDB';

interface ServerConfig {
  mongoUrl: string;
  port: string | number;
}

/**
 * start server
 * know server is started by default
 * letting everyone know
 */

export class TestHarness {
  private express: Application;
  private expressInstance: http.Server | undefined;
  private mongo: MongoDB;
  private serverConfig: ServerConfig;

  constructor(express: Application, mongo: any, serverConfig: ServerConfig) {
    this.express = express;
    this.mongo = mongo;
    this.serverConfig = serverConfig;
  }

  async start() {
    // start database
    await this.mongo.start();

    // start express instance
    this.expressInstance = this.express.listen(this.serverConfig.port);
  }

  async stop() {
    // stop the database
    // stop the server
    this.expressInstance?.close();
  }

  getHttp() {
    return this.expressInstance;
  }
}
