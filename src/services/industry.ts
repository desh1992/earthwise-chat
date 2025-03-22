
// Mock industry data
const industries = [
  { id: 'tech', name: 'Technology' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'finance', name: 'Finance' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'education', name: 'Education' },
  { id: 'manufacturing', name: 'Manufacturing' }
];

// Sample questions by industry
const sampleQuestions: Record<string, string[]> = {
  tech: [
    'What are the key trends in AI for 2025?',
    'How will quantum computing impact cybersecurity?',
    'Explain the metaverse in simple terms'
  ],
  healthcare: [
    'What advancements in telemedicine are expected?',
    'How is AI being used in drug discovery?',
    'What are the ethical considerations in genomic medicine?'
  ],
  finance: [
    'Explain decentralized finance (DeFi) to a beginner',
    'How might CBDCs impact traditional banking?',
    'What are sustainable investing strategies?'
  ],
  fashion: [
    'What are key sustainability practices in fashion?',
    'How is technology changing fashion retail?',
    'What are the emerging materials in sustainable fashion?'
  ],
  education: [
    'How is AI transforming personalized learning?',
    'What's the future of online vs in-person education?',
    'How can educators incorporate VR/AR effectively?'
  ],
  manufacturing: [
    'Explain Industry 4.0 and its components',
    'What are smart factories and their benefits?',
    'How is 3D printing changing manufacturing?'
  ]
};

const industryService = {
  getIndustries: () => industries,
  getQuestionsByIndustry: (industryId: string) => sampleQuestions[industryId] || [],
};

export { industryService };
