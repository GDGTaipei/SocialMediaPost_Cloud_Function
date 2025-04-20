import express from 'express';
import { GenerateSocialMediaContentRequest } from '../usecases/generate-social-media-content';
import { LLMModelImplement } from '../infrastructure/llm_model';
import { getVertexAI } from 'firebase/vertexai';
import { initializeApp } from 'firebase/app';
import { getEnvironmentConfig } from '../config';

const environmentConfig = getEnvironmentConfig();

const firebaseApp = initializeApp(environmentConfig.firebaseConfig);

const llmService = getVertexAI(firebaseApp);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello from GDG Taipei');
});

app.post('/generate-social-media-content', async (req, res) => {
    const { article } = req.body;
    
    const llmModel = new LLMModelImplement(llmService);
    const content = await GenerateSocialMediaContentRequest(llmModel, article);
    res.status(200).send(content);
});

export { app };