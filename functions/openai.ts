import type {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "openai";

export class OpenAI {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async createCompletion(
    params: CreateChatCompletionRequest
  ): Promise<CreateChatCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(params),
    });
    return (await response.json()) as CreateChatCompletionResponse;
  }
}
