
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, X, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { storageService } from '@/services/storage';

const ExplanationSidebar = () => {
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const savedExplanations = storageService.getStatExplanations();
    if (savedExplanations && Object.keys(savedExplanations).length > 0) {
      setExplanations(savedExplanations);
      
      // Initialize all cards as not flipped
      const initialFlippedState: Record<string, boolean> = {};
      Object.keys(savedExplanations).forEach(key => {
        initialFlippedState[key] = false;
      });
      setFlippedCards(initialFlippedState);
    }
  }, []);

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const toggleCard = (key: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Only show if there are explanations
  if (Object.keys(explanations).length === 0) {
    return null;
  }

  return (
    <div className="mt-10 mb-10 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-xl font-medium mb-6">Terminology & Metrics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(explanations).map(([key, description], index) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="relative"
              style={{ perspective: '1000px', height: '180px' }}
            >
              <motion.div 
                className={`absolute w-full h-full rounded-xl transition-all duration-500 cursor-pointer glass-morphism shadow-md ${flippedCards[key] ? 'rotate-y-180 pointer-events-none' : ''}`}
                animate={{ rotateY: flippedCards[key] ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-4 h-full flex flex-col">
                  <h3 className="font-medium text-sm mb-2">{formatKey(key)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 w-full justify-between"
                    onClick={() => toggleCard(key)}
                  >
                    Read More <ChevronRight size={16} />
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className={`absolute w-full h-full rounded-xl transition-all duration-500 glass-morphism shadow-md bg-secondary/50 ${!flippedCards[key] ? 'rotate-y-180 pointer-events-none' : ''}`}
                animate={{ rotateY: flippedCards[key] ? 0 : -180 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-4 h-full flex flex-col">
                  <h3 className="font-medium text-sm mb-2">{formatKey(key)}</h3>
                  <ScrollArea className="flex-grow">
                    <p className="text-sm">{description}</p>
                  </ScrollArea>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 w-full justify-between"
                    onClick={() => toggleCard(key)}
                  >
                    <RotateCcw size={16} /> Back
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExplanationSidebar;
