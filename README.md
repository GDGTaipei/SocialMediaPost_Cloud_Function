# SocialMediaPost_Cloud_Function
an API to transform blog posts into soclal media format 

## Application Overview

The `index.ts` file located in the `functions/src/application/` path is responsible for setting up the Express application and defining several API endpoints to handle different requests. Below is a summary of its main functionalities:

1. **Initialization and Setup**:
   - Utilizes `express` to create a new application instance.
   - Initializes Firebase application and Vertex AI service using `firebase/app` and `firebase/vertexai`.
   - Retrieves environment configuration from `../config`.

2. **API Endpoints**:
   - `GET /`: Responds with a simple message "Hello from GDG Taipei".
   - `POST /generateSocialMediaContent`: Accepts an article and uses `GenerateSocialMediaContentUseCase` to generate social media content.
   - `POST /translateSocialMediaContent`: Accepts a title and description, using `TranslateSocialMediaContentUseCase` to translate social media content.
   - `POST /generateTags`: Accepts an article and uses `GenerateTagsUseCase` to generate tags.
   - `POST /generateSummary`: Accepts an article and uses `GenerateSummaryUseCase` to generate a summary.

3. **Model Usage**:
   - Implements `LLMModelImplement` as the language model, which operates based on the Vertex AI service.
   - Reference here for model support: https://firebase.google.com/docs/vertex-ai/models?hl=zh&authuser=0

These functionalities collectively form an API capable of transforming blog posts into social media formats, providing translation, tag generation, and summary generation features.

