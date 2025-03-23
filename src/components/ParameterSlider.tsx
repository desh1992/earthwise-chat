import React, { useState } from "react";

const ParameterSliders = () => {
  const [params, setParams] = useState({
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 256,
    frequencyPenalty: 0,
    presencePenalty: 0
  });

  const handleChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">LLM Parameters</h2>

      {[
        { label: "Temperature", key: "temperature", min: 0, max: 1, step: 0.01 },
        { label: "Top-p", key: "topP", min: 0, max: 1, step: 0.01 },
        { label: "Max Tokens", key: "maxTokens", min: 1, max: 4096, step: 1 },
        { label: "Frequency Penalty", key: "frequencyPenalty", min: 0, max: 2, step: 0.1 },
        { label: "Presence Penalty", key: "presencePenalty", min: 0, max: 2, step: 0.1 }
      ].map(param => (
        <div key={param.key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
            {param.label}: {params[param.key]}
          </label>
          <input
            type="range"
            min={param.min}
            max={param.max}
            step={param.step}
            value={params[param.key]}
            onChange={(e) => handleChange(param.key, e.target.value)}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default ParameterSliders;
