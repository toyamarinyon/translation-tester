import type { CreateCompletionRequest, CreateCompletionResponse } from "openai";

export class OpenAI {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async createCompletion(
    params: CreateCompletionRequest
  ): Promise<CreateCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(params),
    });
    return (await response.json()) as CreateCompletionResponse;
  }
}
