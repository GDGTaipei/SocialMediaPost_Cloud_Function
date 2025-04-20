import { LLMModelInterface } from "../interfaces";
import { ContentGeneratorService } from "../service";
import { TransformSocialMediaContent } from "../entities";

export const TranslateSocialMediaContentUseCase = async (llmModel: LLMModelInterface, title: string, description: string): Promise<string> => {
    const contentGeneratorService: ContentGeneratorService = new ContentGeneratorService(llmModel);
    const content: TransformSocialMediaContent = await contentGeneratorService.translateContent(title, description);
    const returnContent = `【${content.title}】\n\n${content.description}\n\n${content.tags.join(' ')}`;
    return returnContent;
}