
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { industryService } from '@/services/industry';

interface QuestionSelectorProps {
  industryId: string;
  onSelectQuestion: (question: string) => void;
}

const QuestionSelector = ({ industryId, onSelectQuestion }: QuestionSelectorProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const questions = industryService.getQuestionsByIndustry(industryId);

  const handleSelect = (question: string) => {
    setSelectedQuestion(question);
    onSelectQuestion(question);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-medium mb-4">Select a Question</h3>
      <div className="space-y-3">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            className={`glass-card cursor-pointer p-4 flex items-center ${
              selectedQuestion === question ? 'ring-2 ring-primary' : ''
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: hoveredIndex === index ? 1.02 : 1,
              boxShadow: hoveredIndex === index ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleSelect(question)}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              animate={{ 
                rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                scale: hoveredIndex === index ? 1.1 : 1
              }}
              transition={{ 
                duration: hoveredIndex === index ? 0.5 : 0.3,
                type: hoveredIndex === index ? "spring" : "tween"
              }}
            >
              <MessageSquare size={20} className="text-primary mr-3 flex-shrink-0" />
            </motion.div>
            <p>{question}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
