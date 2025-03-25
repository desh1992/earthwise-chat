// // src/pages/ReportPage.tsx
// import ReportView from '@/components/ReportView';
// import dummyReport from '@/data/dummyReport';

// const ReportPage = () => {
//   return (
//     <div className="min-h-screen bg-background px-6 py-8">
//       <ReportView data={dummyReport} />
//     </div>
//   );
// };

// export default ReportPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const industries = ['finance', 'healthcare', 'education', 'legal'];
const metrics = ['Reasoning', 'Technical', 'Language', 'Instruction', 'Creativity', 'Bias Awareness'];
const models = ['chatgpt', 'gemini', 'llama', 'claude'];

const modelLabels = {
  chatgpt: 'Water AI',
  gemini: 'Air AI',
  llama: 'Earth AI',
  claude: 'Fire AI',
};

const generateDummyData = () => {
  return models.reduce((acc, model) => {
    acc[model] = {};
    metrics.forEach(metric => {
      acc[model][metric] = parseFloat((Math.random() * 5 + 5).toFixed(2));
    });
    return acc;
  }, {});
};

const industryDataMap = {
  finance: generateDummyData(),
  healthcare: generateDummyData(),
  education: generateDummyData(),
  legal: generateDummyData(),
};

const metricColors = {
  Reasoning: 'url(#reasoningGradient)',
  Technical: 'url(#technicalGradient)',
  Language: 'url(#languageGradient)',
  Instruction: 'url(#instructionGradient)',
  Creativity: 'url(#creativityGradient)',
  'Bias Awareness': 'url(#biasGradient)',
};

const ReportPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('finance');
  const currentData = industryDataMap[selectedIndustry];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 px-6 pb-10 max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/home')} className="mb-6">
          ← Back to Home
        </Button>

        <h2 className="text-3xl font-semibold mb-6 text-center">LLM Comparison Report</h2>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="reasoningGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id="technicalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#fff7ed" />
            </linearGradient>
            <linearGradient id="languageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>
            <linearGradient id="instructionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#ede9fe" />
            </linearGradient>
            <linearGradient id="creativityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fefce8" />
            </linearGradient>
            <linearGradient id="biasGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fef2f2" />
            </linearGradient>
          </defs>
        </svg>

        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <TabsList className="flex justify-center mb-6 flex-wrap">
            {industries.map(industry => (
              <TabsTrigger key={industry} value={industry} className="capitalize mx-2">
                {industry}
              </TabsTrigger>
            ))}
          </TabsList>

          {industries.map(industry => (
            <TabsContent key={industry} value={industry}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {models.map(model => (
                  <div key={model} className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 text-center capitalize">{modelLabels[model]}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={metrics.map(metric => ({
                          name: metric,
                          value: currentData[model][metric],
                          fill: metricColors[metric],
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          <LabelList dataKey="value" position="top" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ReportPage;
