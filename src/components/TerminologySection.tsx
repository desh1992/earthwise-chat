
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import TerminologyCard from './TerminologyCard';
import { storageService } from '@/services/storage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminologySectionProps {
  isVisible: boolean;
}

const TerminologySection = ({ isVisible }: TerminologySectionProps) => {
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const savedExplanations = storageService.getStatExplanations();
    if (savedExplanations && Object.keys(savedExplanations).length > 0) {
      setExplanations(savedExplanations);
    }
  }, []);
  
  if (!isVisible || Object.keys(explanations).length === 0) {
    return (
      <div className="w-64 h-full bg-background border-r p-4">
        <div className="flex items-center mb-4">
          <Bookmark className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Terminology Guide</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Ask a question in the chat to see terminology explanations.
        </p>
      </div>
    );
  }

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-64 h-full bg-background border-r"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Bookmark className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Terminology Guide</h3>
        </div>
        
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="space-y-4 pr-2">
            {Object.entries(explanations).map(([key, description], index) => (
              <TerminologyCard
                key={key}
                title={formatKey(key)}
                description={description}
                delay={index}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

export default TerminologySection;
