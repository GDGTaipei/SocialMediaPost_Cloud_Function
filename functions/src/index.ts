import { onRequest } from "firebase-functions/v2/https";
import { app } from "./application";    
import { getEnvironmentConfig } from './config';

// Get environment configuration
const envConfig = getEnvironmentConfig();

// Apply configuration to the app
app.set('env', envConfig.environment);


exports.mindfulMoments = onRequest({ 
    cors: true,
}, app);   