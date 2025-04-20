import { LLMModelInterface } from "../interfaces";
import { ContentGeneratorService } from "../service";
import { TransformSocialMediaContent } from "../entities";

export const GenerateSocialMediaContentUseCase = async (llmModel: LLMModelInterface, article: string): Promise<string> => {
    const contentGeneratorService: ContentGeneratorService = new ContentGeneratorService(llmModel);
    const content: TransformSocialMediaContent = await contentGeneratorService.generateContent(article);
    const returnContent = `【${content.title}】\n\n${content.description}\n\n${content.tags.join(' ')}`;
    return returnContent;
}