import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface QuestionSelectorProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const QuestionSelector = ({ questions, onSelectQuestion }: QuestionSelectorProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleSelect(question)}
          >
            <MessageSquare size={20} className="text-primary mr-3 flex-shrink-0" />
            <p>{question}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
