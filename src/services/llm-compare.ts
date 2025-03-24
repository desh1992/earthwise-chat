// src/services/llm-compare.ts


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
  getResponsesForQuestion: async (prompt: string, temperature = 0.8, max_tokens = 300) => {
    const payload = { prompt, temperature, max_tokens };

    const response = await fetch('https://llm-compare-backend-0b16218aa15f.herokuapp.com/api/compare/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch responses: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the model responses to a consistent format for the frontend
    return Object.entries(data).map(([modelId, modelData]: any) => ({
      modelId,
      modelName: modelData.response.model,
      element: modelId, // or use a prettier name mapping if needed
      color: 'bg-gray-200', // placeholder color, you can assign based on modelId
      response: modelData.response.response,
      metrics: {
        speed: modelData.time_seconds,
        ...modelData.response.metrics,
      },
      prosCons: {
        pros: [], // optional: placeholder for now
        cons: [],
      },
    }));
  },
};
export { llmCompareService };
