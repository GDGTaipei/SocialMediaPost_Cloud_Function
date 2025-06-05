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
        `你是一位專業的語意分析與知識萃取模型，擅長從文章中理解深層脈絡、抽象主題、整合邏輯與提煉精要。你的任務是協助社群小編理解輸入的文章內容，並提供主題歸納與邏輯分析，作為後續撰寫摘要與社群貼文的基礎。請以全盤理解、深度解析與語意脈絡重建的角度，針對輸入文章進行分析，並提供如下資訊：
1. 該文章的核心主題為何？是否包含多重議題？
2. 文章重點為何？主要論點或情緒線索是如何鋪陳？
3. 有無特定事件、案例、數據或觀點被強調？其背後意義為何？`
        ];

        const userPrompt = [
        `請使用繁體中文，並以純文字格式完成下列任務：
1. 分析輸入文章的主題與重點脈絡
2. 擷取能代表整篇內容的標題（限15字以內）
3. 撰寫約400字的內容摘要，強調重點與邏輯脈絡
4. 提供五個與文章主題高度相關的社群標籤（格式為：#標籤 #標籤 #標籤 #標籤 #標籤）
5. 請直接輸出結果，不需任何額外說明、註解或格式符號。`,
        `文章內容如下：${article}`
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