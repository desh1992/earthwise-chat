// src/services/industry.ts
import questionsData from '@/data/merged_industry_questions.json';

// Build industry list from keys
const industries = Object.keys(questionsData).map((name) => ({
  id: name.toLowerCase().replace(/\s+/g, '_'),
  name,
}));

// Service methods
const industryService = {
  getIndustries: () => industries,

  getQuestionsByIndustryAndStage: (industryId: string, stage: string): string[] => {
    const matchedKey = Object.keys(questionsData).find(
      (k) => k.toLowerCase().replace(/\s+/g, '_') === industryId
    );
    if (!matchedKey) return [];
    return questionsData[matchedKey]?.[stage] || [];
  },
  
};

export { industryService };
