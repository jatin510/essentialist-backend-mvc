import mongoose from 'mongoose';

interface MongoConfig {
  mongoUrl: string;
}

export class MongoDB {
  private mongoConfig: MongoConfig;
  private instance: any;

  constructor(mongoConfig: MongoConfig) {
    this.mongoConfig = mongoConfig;
  }
  async start() {
    /// start the mongoServer
    this.instance = await mongoose.connect(this.mongoConfig.mongoUrl);
  }

  async stop() {
    // stop the mongo server
    await mongoose.disconnect();
  }

  getInstance() {
    return this.instance;
  }
}
