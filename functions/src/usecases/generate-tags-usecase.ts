import { LLMModelInterface } from "../interfaces";
import { ContentGeneratorService } from "../service";

export const GenerateTagsUseCase = async (llmModel: LLMModelInterface, article: string): Promise<string[]> => {
    const contentGeneratorService: ContentGeneratorService = new ContentGeneratorService(llmModel);
    const tags: string[] = await contentGeneratorService.generateTags(article);
    return tags;
}