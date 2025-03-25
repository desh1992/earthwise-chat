// src/services/industry.ts
import questionsData from '@/data/merged_industry_questions.json';
let selectedIndustryId: string | null = localStorage.getItem('selectedIndustry');

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
  
    const industryData = questionsData[matchedKey];
  
    // Handle nested structure
    const innerKeys = Object.keys(industryData);
    if (innerKeys.length === 1 && typeof industryData[innerKeys[0]] === 'object') {
      return industryData[innerKeys[0]]?.[stage] || [];
    }
  
    // Handle flat structure
    return industryData?.[stage] || [];
  },

  setSelectedIndustry: (industryId: string) => {
    selectedIndustryId = industryId;
    localStorage.setItem('selectedIndustry', industryId);
  },

  getSelectedIndustry: () => selectedIndustryId,
};

export { industryService };


