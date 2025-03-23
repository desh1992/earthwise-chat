
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import TerminologyCard from './TerminologyCard';
import { storageService } from '@/services/storage';

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
    return null;
  }

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="mt-8 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Bookmark className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Terminology Guide</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(explanations).map(([key, description], index) => (
            <TerminologyCard
              key={key}
              title={formatKey(key)}
              description={description}
              delay={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TerminologySection;
