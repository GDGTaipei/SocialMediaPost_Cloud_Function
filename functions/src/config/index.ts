import { FirebaseConfig } from "../interfaces";

export const getEnvironmentConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    
    console.log(env);

    // Parse Firebase config from environment variable if it exists
    let firebaseConfig: FirebaseConfig = {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
    };

    // Parse Firebase config from environment variable if it exists
    if (process.env.CONFIG_JSON) {
        try {
            // Format the JSON string by adding quotes around property names
            const formattedConfig = process.env.CONFIG_JSON.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
            const parsedConfig = JSON.parse(formattedConfig);
            // Validate the parsed config has all required fields
            if (
                parsedConfig.apiKey &&
                parsedConfig.authDomain &&
                parsedConfig.databaseURL &&
                parsedConfig.projectId &&
                parsedConfig.storageBucket &&
                parsedConfig.messagingSenderId &&
                parsedConfig.appId
            ) {
                firebaseConfig = parsedConfig;
            } else {
                console.error('Invalid Firebase config: missing required fields');
            }
        } catch (error) {
            console.error('Error parsing FIREBASE_CONFIG:', error);
        }
    }

    return {
        environment: env,
        firebaseConfig: firebaseConfig,
    };
};