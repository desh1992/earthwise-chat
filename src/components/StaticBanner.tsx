
import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

const StaticBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 z-40 bg-blue-50 border-b border-blue-200 shadow-sm py-2 px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-700 text-sm">
          <Info size={16} className="flex-shrink-0" />
          <p>This is a learning space — try not to share private or company data. We want to keep things simple, safe, and stress-free for everyone!</p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default StaticBanner;
