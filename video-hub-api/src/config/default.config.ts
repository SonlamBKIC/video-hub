// import process from 'process';
import { config } from 'dotenv';
config();

export interface Config {
  appName: string;
  tenant: string;
  environment: string;
  port: number;
  socketPort: number;
  mongo: {
    debug: boolean;
    connectionString: string;
  };
  jwtSecretKey: string;
  googleApiKey: string;
}

export const defaultConfig: Config = {
  appName: process.env.APP_NAME || 'video-hub-api',
  tenant: process.env.TENANT || 'single',
  environment: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  socketPort: Number(process.env.SOCKET_PORT) || 3001,
  mongo: {
    debug: !!process.env.MONGO_DEBUG || false,
    connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/video-hub',
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'THIS IS MY SECRET KEY FOR THE JWT TOKEN GENERATION PROCESS',
  googleApiKey: process.env.GOOGLE_API_KEY || 'AIzaSyB8_22cX5EZaLoU51Ljwh8d2zIQaV51JFc',
};
