import { ContentGeneratorServiceInterface, LLMModelInterface } from "../interfaces";
import { SchemaRequest, SchemaType } from "firebase/vertexai";
import { TransformSocialMediaContent } from "../entities";

export class ContentGeneratorService implements ContentGeneratorServiceInterface {
    private llmModel: LLMModelInterface;
    private model: string;
    constructor(llmModel: LLMModelInterface) {
        this.llmModel = llmModel;
        this.model = "gemini-2.0-flash-lite-001";
    }
    
    async generateContent(article: string): Promise<TransformSocialMediaContent> {
        
        const systemPrompt = [
            `請使用繁體中文，並以純文字格式（不包含任何註解或 Markdown）完成以下任務：

1. 擷取文章標題（限15字以內）
2. 撰寫約400字的文章摘要
3. 提供五個與文章主題相關的標籤，格式為：#標籤 #標籤 #標籤 #標籤 #標籤
4. 請直接輸出結果，不需任何額外說明或格式符號。`
        ];

        const userPrompt = [
            "輸入的文章為：" + article,
        ];
        
        const schema: SchemaRequest  = {
            type: SchemaType.OBJECT,
            properties: {
                title: {
                    type: SchemaType.STRING,
                },
                description: {
                    type: SchemaType.STRING,
                },
                tags: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING,
                    },
                },
            },
            required: ["title", "description", "tags"]
        };
        
        return this.llmModel.generateText(systemPrompt, userPrompt, this.model, schema);
    }

    async translateContent(title: string, description: string): Promise<TransformSocialMediaContent> {
        const systemPrompt = [
            `請使用繁體中文，並以純文字格式（不包含任何註解或 Markdown）完成以下任務：

1. 翻譯輸入的標題
2. 翻譯輸入的摘要
3. 提供五個與文章主題相關的標籤，格式為：#標籤 #標籤 #標籤 #標籤 #標籤
4. 請直接輸出結果，不需任何額外說明或格式符號。
`
        ];

        const userPrompt = [
            "輸入的標題為：" + title,
            "輸入的摘要為：" + description,
        ];

        const schema: SchemaRequest  = {
            type: SchemaType.OBJECT,
            properties: {
                title: {
                    type: SchemaType.STRING,
                },
                description: {
                    type: SchemaType.STRING,
                },
                tags: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING,
                    },
                },
            },
            required: ["title", "description", "tags"]
        };
        
        return this.llmModel.generateText(systemPrompt, userPrompt, this.model, schema);
    }   

    async generateTags(article: string): Promise<string[]> {
        const systemPrompt = [
            `請使用繁體中文，並以純文字格式（不包含任何註解或 Markdown）完成以下任務：

1. 提供五個與文章主題相關的標籤，格式為：#標籤 #標籤 #標籤 #標籤 #標籤
2. 請直接輸出結果，不需任何額外說明或格式符號。`
        ];

        const userPrompt = [
            "輸入的文章為：" + article,
        ];
        
        const schema: SchemaRequest  = {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.STRING,
            },
        };
        
        return this.llmModel.generateText(systemPrompt, userPrompt, this.model, schema);
    }

    async genSummary(article: string): Promise<string> {
        const systemPrompt = [
            `請使用繁體中文，並以純文字格式（不包含任何註解或 Markdown）完成以下任務：

1. 提供文章的摘要，限100字以內
2. 請直接輸出結果，不需任何額外說明或格式符號。`
        ];

        const userPrompt = [
            "輸入的文章為：" + article,
        ];
        
        const schema: SchemaRequest  = {
            type: SchemaType.STRING,
        };
        
        return this.llmModel.generateText(systemPrompt, userPrompt, this.model, schema);    
    }
}