
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { storageService } from '@/services/storage';

const ExplanationSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const savedExplanations = storageService.getStatExplanations();
    if (savedExplanations && Object.keys(savedExplanations).length > 0) {
      setExplanations(savedExplanations);
      // Don't auto-show on mobile or smaller screens
      setIsVisible(window.innerWidth > 1024);
    }
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <>
      <motion.button
        className="fixed left-4 top-20 z-50 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isVisible ? <X size={20} /> : <Layers size={20} />}
      </motion.button>
    
      <AnimatePresence>
        {isVisible && Object.keys(explanations).length > 0 && (
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-72 glass-morphism z-40 shadow-xl overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            <div className="pt-20 pb-6 px-4 h-full flex flex-col">
              <h2 className="text-xl font-medium mb-4">Stats Explained</h2>
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {Object.entries(explanations).map(([key, description], index) => (
                    <motion.div 
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="pb-3 border-b border-border"
                    >
                      <h3 className="font-medium text-sm mb-1">{formatKey(key)}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExplanationSidebar;
