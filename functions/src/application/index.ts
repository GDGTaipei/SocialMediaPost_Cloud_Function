import express from 'express';
import { GenerateSocialMediaContentUseCase } from '../usecases';
import { LLMModelImplement } from '../infrastructure/llm_model';
import { getVertexAI } from 'firebase/vertexai';
import { initializeApp } from 'firebase/app';
import { getEnvironmentConfig } from '../config';
import { TranslateSocialMediaContentUseCase } from '../usecases/translate-social-media-content';

const environmentConfig = getEnvironmentConfig();

const firebaseApp = initializeApp(environmentConfig.firebaseConfig);

const llmService = getVertexAI(firebaseApp);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello from GDG Taipei');
});

app.post('/generateSocialMediaContent', async (req, res) => {
    const { article } = req.body;

    if (!article) {
        res.status(400).send('Article is required');
        return;
    }

    const llmModel = new LLMModelImplement(llmService);
    const content = await GenerateSocialMediaContentUseCase(llmModel, article);
    res.status(200).send(content);
});

app.post('/translateSocialMediaContent', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).send('Title and description are required');
        return;
    }

    const llmModel = new LLMModelImplement(llmService);
    const content = await TranslateSocialMediaContentUseCase(llmModel, title, description);
    res.status(200).send(content);
});

export { app };