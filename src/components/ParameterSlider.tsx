interface ParameterSlidersProps {
    values: {
      temperature: number;
      top_p: number;
      max_tokens: number;
      frequency_penalty: number;
      presence_penalty: number;
    };
    onChange: (values: ParameterSlidersProps['values']) => void;
  }
  
  const ParameterSliders = ({ values, onChange }: ParameterSlidersProps) => {
    return (
      <div className="space-y-4 glass-card p-4">
        <h3 className="text-md font-semibold mb-2">Adjust Parameters</h3>
  
        {Object.entries(values).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize">{key.replace('_', ' ')}</label>
            <input
              type="range"
              min={key === 'max_tokens' ? 64 : 0}
              max={key === 'max_tokens' ? 2048 : 1}
              step={key === 'max_tokens' ? 16 : 0.1}
              value={value}
              onChange={(e) =>
                onChange({
                  ...values,
                  [key]: key === 'max_tokens' ? parseInt(e.target.value) : parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">{value}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ParameterSliders;
  