// components/phase2/QuestionSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface QuestionSelectorProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const QuestionSelector = ({ questions, onSelectQuestion }: QuestionSelectorProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Choose a Question</h2>
      <ScrollArea className="h-[400px] pr-2">
        <div className="grid gap-3">
          {questions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => onSelectQuestion(question)}
              className="text-left p-4 rounded-lg border bg-background hover:bg-muted transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestionSelector;
