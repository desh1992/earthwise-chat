
import { useState } from 'react';
import { motion } from 'framer-motion';
import IndustrySelector from './IndustrySelector';
import QuestionSelector from './QuestionSelector';
import ResponseComparison from './ResponseComparison';

enum Stage {
  INDUSTRY_SELECT = 'industry',
  QUESTION_SELECT = 'question',
  RESPONSE_COMPARE = 'response'
}

const MantlePhase = () => {
  const [stage, setStage] = useState<Stage>(Stage.INDUSTRY_SELECT);
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustryId(industryId);
    setStage(Stage.QUESTION_SELECT);
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setStage(Stage.RESPONSE_COMPARE);
  };

  const handleReset = () => {
    setStage(Stage.INDUSTRY_SELECT);
    setSelectedIndustryId('');
    setSelectedQuestion('');
  };

  return (
    <div className="w-full">
      {stage === Stage.INDUSTRY_SELECT && (
        <motion.div
          key="industry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <IndustrySelector onSelectIndustry={handleIndustrySelect} />
        </motion.div>
      )}
      
      {stage === Stage.QUESTION_SELECT && (
        <motion.div
          key="question"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <QuestionSelector 
            industryId={selectedIndustryId} 
            onSelectQuestion={handleQuestionSelect}
          />
        </motion.div>
      )}
      
      {stage === Stage.RESPONSE_COMPARE && (
        <motion.div
          key="response"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ResponseComparison 
            question={selectedQuestion}
            onReset={handleReset}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MantlePhase;
