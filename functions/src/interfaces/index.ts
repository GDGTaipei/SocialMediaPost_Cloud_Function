import { SchemaRequest } from 'firebase/vertexai';
import { FirebaseOptions } from 'firebase/app';
import { TransformSocialMediaContent } from '../entities';
export interface FirebaseConfig extends FirebaseOptions {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export interface LLMModelInterface {
    generateText: (systemPrompt: string[], userPrompt: string[], model: string, responseSchema: SchemaRequest) => Promise<any>;
}

export interface ContentGeneratorServiceInterface {
    generateContent: (article: string) => Promise<TransformSocialMediaContent>;
    translateContent: (title: string, description: string) => Promise<TransformSocialMediaContent>;
}

export interface GenerateSocialMediaContentUseCase {
    generateSocialMediaContent: (prompt: string, model: string, responseSchema: SchemaRequest) => Promise<string>;
}

