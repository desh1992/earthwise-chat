
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { industryService } from '@/services/industry';

interface IndustrySelectorProps {
  onSelectIndustry: (industryId: string) => void;
}

const IndustrySelector = ({ onSelectIndustry }: IndustrySelectorProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const industries = industryService.getIndustries();

  const handleSelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    onSelectIndustry(industryId);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-medium mb-4">Select an Industry</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.id}
            className={`glass-card cursor-pointer relative overflow-hidden ${
              selectedIndustry === industry.id ? 'ring-2 ring-primary' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleSelect(industry.id)}
          >
            <div className="p-4 text-center">
              <h4 className="font-medium">{industry.name}</h4>
            </div>
            
            {selectedIndustry === industry.id && (
              <motion.div
                className="absolute top-2 right-2 bg-primary rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Check size={16} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySelector;
