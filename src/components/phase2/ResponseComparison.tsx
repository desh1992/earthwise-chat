import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResponseCard from './ResponseCard';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Loader2 } from 'lucide-react';
import { llmCompareService } from '@/services/llm-compare';
import PerformanceHeatmap from './PerformanceHeatmap';
import { apiFetch } from '@/services/apiClient';
import { industryService } from '@/services/industry'; // Make sure this is imported

interface ResponseComparisonProps {
  question: string;
  layerKey: string;
  onReset: () => void;
  onNext: () => void;
  industryId?: string; // <-- Accept industryId as prop
}

const ResponseComparison = ({
  question,
  layerKey,
  onReset,
  onNext,
  industryId,
}: ResponseComparisonProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [evaluationData, setEvaluationData] = useState<any>(null);

  const getStageFromLayerKey = (layerKey: string): string => {
    const phaseNumber = parseInt(layerKey.replace('phase-', ''), 10);
  
    switch (phaseNumber) {
      case 1:
        return 'Comprehension';
      case 2:
        return 'Reasoning';
      case 3:
        return 'Technical';
      case 4:
        return 'Language';
      case 5:
        return 'Instruction Following';
      case 6:
        return 'Creativity';
      case 7:
        return 'Bias Awareness';
      default:
        return 'Unknown';
    }
  };
  

  const handleEvaluateClick = async () => {
    const selectedIndustry = industryService.getSelectedIndustry(); // 💡 Get industry from service
  
    const payload = {
      stage: getStageFromLayerKey(layerKey), // ✅ dynamic stage
      industry: selectedIndustry || 'unknown',
      prompt: responses[0]?.prompt || 'Default prompt',
      responses: {},
      costs: {},
      times: {},
      tokens: {},
    };
  
    responses.forEach((res) => {
      payload.responses[res.modelId] = res.response;
      payload.costs[res.modelId] = res.metrics.estimated_cost_usd;
      payload.times[res.modelId] = res.metrics.time_seconds || res.time_seconds;
      payload.tokens[res.modelId] = {
        prompt_tokens: res.metrics.prompt_tokens,
        completion_tokens: res.metrics.completion_tokens,
      };
    });
  
    try {
      const result = await apiFetch<{ stage: string; evaluation: any }>(
        '/meta_eval/evaluate/meta',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      setEvaluationData(result.evaluation);
    } catch (error) {
      console.error('Evaluation API failed:', error);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
          className="mt-6 flex flex-col items-center gap-4"
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary" onClick={handleEvaluateClick}>
                📊 View Performance Heatmap
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Performance Evaluation</h4>
              {evaluationData ? (
                <PerformanceHeatmap
                evaluation={evaluationData}
                industry={industryId}
                stage={getStageFromLayerKey(layerKey)} // ✅ Pass stage explicitly
              />              
              ) : (
                <div className="text-muted-foreground text-sm">Evaluating model performance...</div>
              )}
            </DrawerContent>
          </Drawer>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={onReset} variant="outline">
              Try Another Question
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponseComparison;
