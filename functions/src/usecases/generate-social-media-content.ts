import { LLMModelInterface } from "../interfaces";
import { ContentGeneratorService } from "../service";
import { TransformSocialMediaContent } from "../entities";

export const GenerateSocialMediaContentRequest = async (llmModel: LLMModelInterface, article: string): Promise<TransformSocialMediaContent> => {
    const contentGeneratorService: ContentGeneratorService = new ContentGeneratorService(llmModel);
    const content: TransformSocialMediaContent = await contentGeneratorService.generateContent(article);
    return content;
}