import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QuestionSelector from './phase2/QuestionSelector';
import ResponseComparison from './phase2/ResponseComparison';
import { industryService } from '@/services/industry';

interface LayerPhaseProps {
  layerKey: string;
  industryId: string;
  onComplete: () => void;
  onProgress: (canProceed: boolean) => void;
}

const stageMap: Record<string, string> = {
  'phase-1': 'Comprehension',
  'phase-2': 'Reasoning',
  'phase-3': 'Technical',
  'phase-4': 'Language',
  'phase-5': 'Instruction Following',
  'phase-6': 'Creativity',
  'phase-7': 'Bias Awareness',
};

const LayerPhase = ({ layerKey, industryId, onComplete, onProgress }: LayerPhaseProps) => {
  const [step, setStep] = useState<'question' | 'comparison'>('question');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const stageName = stageMap[layerKey];
    const questionSet = industryService.getQuestionsByIndustryAndStage(industryId, stageName);
    setQuestions(questionSet);
  }, [layerKey, industryId]);

  useEffect(() => {
    const shouldReset = localStorage.getItem('resetPhase') === 'true';
    if (shouldReset) {
      setStep('question');
      setSelectedQuestion('');
      localStorage.removeItem('resetPhase');
    }
  }, [layerKey]);

  useEffect(() => {
    onProgress(step === 'comparison');
  }, [step, onProgress]);

  return (
    <div className="w-full">
      {step === 'question' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <QuestionSelector
            questions={questions}
            onSelectQuestion={(q) => {
              setSelectedQuestion(q);
              setStep('comparison');
            }}
          />
        </motion.div>
      )}

      {step === 'comparison' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ResponseComparison
            question={selectedQuestion}
            layerKey={layerKey}
            onReset={() => {
              setStep('question');
              setSelectedQuestion('');
            }}
            onNext={onComplete}
          />
        </motion.div>
      )}
    </div>
  );
};

export default LayerPhase;
