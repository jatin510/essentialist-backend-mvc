export const config = {
  mongoUrl: process.env.MONGODB_URI || 'mongodb://mongodb:27017/',
  mongoDatabase: '',
  port: process.env.SERVER_PORT || 3000,
};
