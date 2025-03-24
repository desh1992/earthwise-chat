import { apiFetch } from "@/services/apiClient";

const COLORS = {
  chatgpt: 'bg-green-500',
  claude: 'bg-blue-500',
  gemini: 'bg-yellow-500',
  llama: 'bg-purple-500',
};

const ELEMENTS = {
  chatgpt: 'Earth',
  claude: 'Water',
  gemini: 'Fire',
  llama: 'Wind',
};

const DISPLAY_NAMES = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  llama: 'LLaMA',
};

const llmCompareService = {
  getResponsesForQuestion: async (
    prompt: string,
    temperature = 0.8,
    max_tokens = 300
  ) => {
    const payload = { prompt, temperature, max_tokens };

    // Use interceptor-based fetch
    const data = await apiFetch<any>("/compare/compare", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    // Map the model responses to a consistent format for the frontend
    return Object.entries(data).map(([modelId, modelData]: any) => ({
      modelId,
      modelName: DISPLAY_NAMES[modelId] || modelId,
      element: ELEMENTS[modelId] || modelId,
      color: COLORS[modelId] || 'bg-gray-200',
      response: modelData.response.response,
      metrics: {
        speed: modelData.time_seconds,
        ...modelData.response.metrics,
      },
      prosCons: {
        pros: [],
        cons: [],
      },
    }));
  },
};

export { llmCompareService };
