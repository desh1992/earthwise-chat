
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComparisonHeatmapProps {
  responses: any[];
}

const ComparisonHeatmap = ({ responses }: ComparisonHeatmapProps) => {
  const [metrics, setMetrics] = useState<string[]>([]);
  
  useEffect(() => {
    if (responses.length > 0) {
      // Get all metrics from the first response
      setMetrics(Object.keys(responses[0].metrics));
    }
  }, [responses]);
  
  // Calculate the color based on the value (0-100)
  const getColor = (value: number) => {
    // Blue to green to red gradient
    if (value < 70) return 'bg-blue-100 text-blue-800';
    if (value < 80) return 'bg-blue-200 text-blue-800';
    if (value < 85) return 'bg-green-100 text-green-800';
    if (value < 90) return 'bg-green-200 text-green-800';
    if (value < 95) return 'bg-green-300 text-green-800';
    return 'bg-green-400 text-green-800';
  };

  return (
    <div className="overflow-x-auto glass-card p-1">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-3 text-left font-medium text-sm">Metric</th>
            {responses.map((response) => (
              <th key={response.modelId} className="p-3 text-center font-medium text-sm">
                {response.modelName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, i) => (
            <tr key={metric} className="border-t border-gray-100">
              <td className="p-3 font-medium capitalize text-sm">{metric}</td>
              {responses.map((response, j) => (
                <motion.td 
                  key={`${response.modelId}-${metric}`}
                  className="p-2 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                >
                  <motion.div 
                    className={`rounded-md py-1 px-2 text-xs font-medium ${getColor(response.metrics[metric])}`}
                  >
                    {response.metrics[metric]}%
                  </motion.div>
                </motion.td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonHeatmap;
