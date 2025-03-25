import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  evaluation: any;
  stage: string;
  industry?: string;
}

const colors: Record<string, string> = {
  Clarity: '#f87171',
  Accuracy: '#facc15',
  Coherence: '#60a5fa',
  Correctness: '#10b981',
  Precision: '#6366f1',
  Fluency: '#06b6d4',
  Style: '#a78bfa',
  Alignment: '#ec4899',
  Completeness: '#eab308',
  Novelty: '#34d399',
  Surprise: '#f472b6',
  Sensitivity: '#f97316',
  Neutrality: '#818cf8',
};

const displayNames = {
  chatgpt: 'Water AI',
  gemini: 'Air AI',
  llama: 'Earth AI',
  claude: 'Fire AI',
};

const STAGE_CRITERIA: Record<string, [string, string]> = {
  Comprehension: ['Clarity', 'Accuracy'],
  Reasoning: ['Coherence', 'Correctness'],
  Technical: ['Precision', 'Correctness'],
  Language: ['Fluency', 'Style'],
  'Instruction Following': ['Alignment', 'Completeness'],
  Creativity: ['Novelty', 'Surprise'],
  'Bias Awareness': ['Sensitivity', 'Neutrality'],
};

const PerformanceHeatmap = ({ evaluation, stage, industry }: Props) => {
  const [metric1, metric2] = STAGE_CRITERIA[stage] || ['Metric A', 'Metric B'];

  const topModel = Object.entries(evaluation).reduce(
    (best, [key, val]: any) =>
      val.proprietaryScore > best.score ? { key, score: val.proprietaryScore } : best,
    { key: '', score: -1 }
  ).key;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Object.entries(evaluation).map(([model, data]: any) => {
        const isTop = model === topModel;

        return (
          <div
            key={model}
            className={`border-2 rounded-xl p-4 relative transition-all ${
              isTop ? 'border-green-500 bg-green-50/40' : 'border-gray-200'
            }`}
          >
            {isTop && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded font-medium shadow-sm">
                ✅ CoreEval Recommended
              </div>
            )}

            <h3 className="text-md font-semibold text-center mb-3">{displayNames[model]}</h3>

            <div className="space-y-4">
              {[metric1, metric2].map((metric) => (
                <div key={metric}>
                  <div className="text-sm mb-1 font-medium flex justify-between">
                    <span>{metric}</span>
                    <span className="text-xs text-muted-foreground">
                      {data[metric] ?? 0}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                    <div
                      className="h-4 rounded-full transition-all"
                      style={{
                        width: `${data[metric] ?? 0}%`,
                        background: `linear-gradient(90deg, ${colors[metric] ?? '#999'}66, ${
                          colors[metric] ?? '#999'
                        })`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-base text-gray-800 text-center font-bold">
              Proprietary Score: {data.proprietaryScore}%
            </div>

            {data.explanation && (
              <div className="mt-4 text-md text-darkgreen-500">
                <div className="flex items-start gap-2">
                  <Info className="w-8 h-8 mt-0.5" />
                  <p>{data.explanation}</p>
                </div>
              </div>
            )}

            {industry && (
              <div className="absolute top-2 right-2 text-[10px] text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                {industry}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceHeatmap;
