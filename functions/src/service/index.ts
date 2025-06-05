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
        `請使用繁體中文，並以純文字格式完成下列任務：
        
        1. 分析輸入文章的主題與重點脈絡
        2. 擷取能代表整篇內容的標題（限15字以內）
        3. 撰寫約400字的內容摘要，強調重點與邏輯脈絡
        4. 提供五個與文章主題高度相關的社群標籤（格式為：#標籤 #標籤 #標籤 #標籤 #標籤）
        
        請直接輸出結果，不需任何額外說明、註解或格式符號。`
        ];

        const userPrompt = [
        `以下是一篇文章，請你以溫暖風格的社群小編角度撰寫貼文內容，語氣親切、有同理心。貼文需包含：
        
        - 溫柔貼心的開場，與讀者產生情感連結
        - 用簡單的話介紹文章的重點，強調對生活或人心的啟發
        - 鼓勵讀者分享感受或與他人討論
        
        請用繁體中文撰寫，篇幅約100~400字。
        
        文章內容如下：${article}`
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