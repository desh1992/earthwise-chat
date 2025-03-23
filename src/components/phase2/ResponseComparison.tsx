
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResponseCard from './ResponseCard';
import ComparisonHeatmap from './ComparisonHeatmap';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { llmCompareService } from '@/services/llm-compare';

interface ResponseComparisonProps {
  question: string;
  onReset: () => void;
}

const ResponseComparison = ({ question, onReset }: ResponseComparisonProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const data = await llmCompareService.getResponsesForQuestion(question);
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [question]);

  const handleSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    
    // Reveal all cards after 2 seconds of selection
    setTimeout(() => {
      setRevealed(true);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating responses from all models...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Compare Responses</h2>
        <p className="text-muted-foreground">
          {selectedModelId 
            ? 'View and compare detailed model information below.' 
            : 'Select your favorite response by clicking on a card.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {responses.map((model) => (
          <ResponseCard
            key={model.modelId}
            model={model}
            isSelected={selectedModelId === model.modelId}
            onSelect={() => handleSelect(model.modelId)}
            revealed={revealed}
            autoFlip={revealed}
          />
        ))}
      </div>
      
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <h3 className="text-xl font-medium mb-4">Performance Comparison</h3>
          <ComparisonHeatmap responses={responses} />
          
          <div className="mt-8 flex justify-center">
            <Button onClick={onReset}>Try Another Question</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponseComparison;
