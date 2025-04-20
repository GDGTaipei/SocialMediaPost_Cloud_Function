import { LLMModelInterface } from "../interfaces";
import { ContentGeneratorService } from "../service";

export const GenerateSummaryUseCase = async (llmModel: LLMModelInterface, article: string): Promise<string> => {
    const contentGeneratorService: ContentGeneratorService = new ContentGeneratorService(llmModel);
    const summary: string = await contentGeneratorService.genSummary(article);
    return summary;
}