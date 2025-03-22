
// Mock LLM data for comparison
const models = [
  { id: 'earth', name: 'EarthGPT', element: 'Earth', color: 'bg-green-500' },
  { id: 'water', name: 'AquaLLM', element: 'Water', color: 'bg-blue-500' },
  { id: 'fire', name: 'FireMind', element: 'Fire', color: 'bg-red-500' },
  { id: 'wind', name: 'WindAI', element: 'Wind', color: 'bg-indigo-500' }
];

// Generate a mock response for a given question
const generateResponse = (question: string, modelId: string) => {
  const responses: Record<string, Record<string, string>> = {
    'earth': {
      'What are key sustainability practices in fashion?': 
        'The fashion industry is adopting several key sustainability practices: 1) Circular economy models that recycle materials, 2) Water conservation techniques in dyeing and finishing, 3) Low-impact or natural dyes, 4) Ethical labor practices with transparent supply chains, 5) Durable design philosophies that extend garment lifespan.',
      'default': 'As an earth-focused AI, I analyze this question with practical grounding in reality. My analysis considers environmental impact, sustainability, and long-term practical implications. I emphasize stability and concrete solutions based on established knowledge.'
    },
    'water': {
      'What are key sustainability practices in fashion?': 
        'Fashion sustainability is flowing in new directions through: 1) Water-efficient production using closed-loop systems, 2) Biodegradable and ocean-safe materials, 3) Fluid supply chains with adaptable manufacturing, 4) "Blue economy" principles that protect water resources, 5) Washing and care innovations that reduce microplastic pollution.',
      'default': 'Approaching this question with adaptability and flow, I consider multiple perspectives and emotional contexts. My response emphasizes intuitive connections between concepts, highlighting the interconnected nature of this topic.'
    },
    'fire': {
      'What are key sustainability practices in fashion?': 
        'Fashion sustainability is being revolutionized through: 1) Radical transparency initiatives that expose wasteful practices, 2) Disruptive recycling technologies breaking down complex fabrics, 3) Bold upcycling movements transforming waste, 4) Direct-to-consumer models eliminating middlemen waste, 5) Passionate advocacy campaigns igniting consumer awareness.',
      'default': 'I tackle this question with energy and transformative thinking. My analysis emphasizes innovation, disruption of outdated paradigms, and creative solutions. I focus on the potential for rapid change and inspiring action.'
    },
    'wind': {
      'What are key sustainability practices in fashion?': 
        'Fashion sustainability is evolving through: 1) Lightweight design philosophies minimizing material use, 2) Agile, on-demand production reducing inventory waste, 3) Cloud-based supply chain coordination optimizing resources, 4) Conceptual shifts toward immaterial fashion (digital/AR), 5) Ideas-focused initiatives that challenge consumption itself.',
      'default': 'Taking an abstract, conceptual approach to this question, I explore theoretical frameworks and philosophical implications. My analysis emphasizes innovative thinking, ideation, and the exploration of possibilities beyond conventional boundaries.'
    }
  };

  // Return specific response if available, otherwise return default
  return responses[modelId][question] || responses[modelId]['default'];
};

// Generate mock metrics for LLM comparison
const generateMetrics = (modelId: string) => {
  const baseMetrics = {
    earth: { speed: 85, reasoning: 90, factual: 95, creativity: 75 },
    water: { speed: 80, reasoning: 85, factual: 80, creativity: 90 },
    fire: { speed: 95, reasoning: 75, factual: 70, creativity: 95 },
    wind: { speed: 90, reasoning: 95, factual: 85, creativity: 85 }
  };

  // Add some randomization to make it more realistic
  const randomize = (value: number) => {
    const variance = Math.floor(Math.random() * 10) - 5; // -5 to +5
    return Math.max(60, Math.min(100, value + variance));
  };

  const metrics = { ...baseMetrics[modelId as keyof typeof baseMetrics] };
  return {
    speed: randomize(metrics.speed),
    reasoning: randomize(metrics.reasoning),
    factual: randomize(metrics.factual),
    creativity: randomize(metrics.creativity),
    // Add a few more metrics
    clarity: randomize(85),
    conciseness: randomize(80),
    relevance: randomize(90)
  };
};

// Generate pros and cons for each model
const getProsCons = (modelId: string) => {
  const prosCons = {
    earth: {
      pros: ['Highly factual', 'Well-sourced information', 'Reliable answers', 'Practical advice'],
      cons: ['Sometimes too cautious', 'May lack creative flair', 'Can be overly detailed']
    },
    water: {
      pros: ['Emotionally intelligent', 'Adaptive thinking', 'Nuanced responses', 'Connects concepts well'],
      cons: ['Occasionally imprecise', 'Can be overly elaborate', 'May drift from core facts']
    },
    fire: {
      pros: ['Innovative thinking', 'Inspirational responses', 'Quick generation', 'Bold ideas'],
      cons: ['May overstate certainty', 'Sometimes factually imprecise', 'Can be too provocative']
    },
    wind: {
      pros: ['Abstract reasoning', 'Philosophical depth', 'Novel perspectives', 'Conceptual clarity'],
      cons: ['Sometimes too theoretical', 'May miss practical details', 'Can be hard to follow']
    }
  };

  return prosCons[modelId as keyof typeof prosCons];
};

// Simulate an API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const llmCompareService = {
  getModels: async () => {
    await delay(500);
    return models;
  },
  
  getResponsesForQuestion: async (question: string) => {
    // Simulate API delay
    await delay(1500);
    
    return models.map(model => ({
      modelId: model.id,
      modelName: model.name,
      element: model.element,
      color: model.color,
      response: generateResponse(question, model.id),
      metrics: generateMetrics(model.id),
      prosCons: getProsCons(model.id)
    }));
  }
};

export { llmCompareService };
