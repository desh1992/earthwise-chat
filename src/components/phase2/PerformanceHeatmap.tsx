import React from 'react';

interface Props {
  evaluation: any;
}

const colors = {
  Coherence: '#60a5fa',     // blue
  Correctness: '#10b981',   // green
};

const displayNames = {
  chatgpt: 'Water AI',
  gemini: 'Air AI',
  llama: 'Earth AI',
  claude: 'Fire AI',
};

const PerformanceHeatmap = ({ evaluation }: Props) => {
  const topModel = Object.entries(evaluation).reduce((best, [key, val]: any) =>
    val.proprietaryScore > best.score ? { key, score: val.proprietaryScore } : best,
    { key: '', score: -1 }
  ).key;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Object.entries(evaluation).map(([model, data]: any) => (
        <div
          key={model}
          className={`border-2 rounded-xl p-4 relative transition-all ${
            model === topModel ? 'border-green-500 bg-green-50/40' : 'border-gray-200'
          }`}
        >
          <h3 className="text-md font-semibold text-center mb-3">{displayNames[model]}</h3>

          <div className="space-y-4">
            {['Coherence', 'Correctness'].map((metric) => (
              <div key={metric}>
                <div className="text-sm mb-1 font-medium">{metric}</div>
                <div className="relative w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-4 rounded-full transition-all"
                    style={{
                      width: `${data[metric]}%`,
                      background: `linear-gradient(90deg, ${colors[metric]}66, ${colors[metric]})`,
                    }}
                  />
                  <span className="absolute right-2 top-[-20px] text-xs text-muted-foreground">
                    {data[metric]}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center italic">
            Proprietary Score: {data.proprietaryScore}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceHeatmap;
