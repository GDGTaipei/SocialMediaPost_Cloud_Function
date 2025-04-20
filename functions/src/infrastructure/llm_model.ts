import { LLMModelInterface  } from "../interfaces";
import { GenerativeModel, SchemaRequest, VertexAI } from "firebase/vertexai";
import {
GenerationConfig,
getGenerativeModel,
HarmBlockThreshold,
HarmCategory,
SafetySetting,
Content,
GenerateContentRequest,
} from "firebase/vertexai";

export class LLMModelImplement implements LLMModelInterface {
  private llmService: VertexAI;
  private safetySettings: SafetySetting[];

  constructor(llmService: VertexAI) {
      this.llmService = llmService;
      this.safetySettings = [
          {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE
          }
      ];
  }

  async generateText(systemPrompt: string[], userPrompt: string[], modelName: string, responseSchema: SchemaRequest): Promise<any> {
        
        const systemInstruction: Content = {
            role: "system",
            parts: systemPrompt.map((prompt) => ({ text: prompt })),
        };
    
        const prompt: GenerateContentRequest = {
          contents: [
            {
              role: "user",
              parts: userPrompt.map((prompt) => ({ text: prompt })),
            }
          ]
        };
    
        const generationConfig: GenerationConfig = {
          temperature: 1,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseSchema: responseSchema,
          responseMimeType: "application/json"
      };

        const model: GenerativeModel = getGenerativeModel(this.llmService, {
          model: modelName,
          generationConfig: generationConfig,
          safetySettings: this.safetySettings,
          systemInstruction
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
    
        return JSON.parse(response.text());
        
  }
}