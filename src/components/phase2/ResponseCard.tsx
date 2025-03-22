
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResponseCardProps {
  model: {
    modelId: string;
    modelName: string;
    element: string;
    color: string;
    response: string;
    metrics: Record<string, number>;
    prosCons: {
      pros: string[];
      cons: string[];
    };
  };
  isSelected: boolean;
  onSelect: () => void;
  revealed: boolean;
  autoFlip: boolean;
}

const ResponseCard = ({ model, isSelected, onSelect, revealed, autoFlip }: ResponseCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (revealed || (isSelected && !isFlipped)) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, isSelected ? 100 : 1000);
      return () => clearTimeout(timer);
    }
    
    if (autoFlip && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSelected, revealed, autoFlip, isFlipped]);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onSelect();
    }
  };

  return (
    <motion.div
      className="card-container h-[400px] w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`card-inner h-full w-full relative ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card (Response) */}
        <div 
          className={`card-front glass-card h-full w-full flex flex-col p-6 cursor-pointer ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
          onClick={handleClick}
        >
          <div className={`w-16 h-16 rounded-full ${model.color} flex items-center justify-center text-white text-xl font-bold mb-4`}>
            {model.element.charAt(0)}
          </div>
          <h3 className="text-lg font-medium mb-3">{model.element} Element</h3>
          <p className="text-muted-foreground flex-grow overflow-y-auto text-sm">
            {model.response}
          </p>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">Click to choose this response</p>
          </div>
        </div>
        
        {/* Back of card (Model details) */}
        <div className="card-back glass-card h-full w-full p-6 overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">{model.modelName}</h3>
          <p className="text-sm text-muted-foreground mb-4">Element: {model.element}</p>
          
          <div className="space-y-3 mb-4">
            {Object.entries(model.metrics).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="capitalize">{key}</span>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Pros</h4>
            <ul className="text-xs space-y-1 mb-3">
              {model.prosCons.pros.map((pro, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-1">+</span> {pro}
                </li>
              ))}
            </ul>
            
            <h4 className="text-sm font-medium mb-2">Cons</h4>
            <ul className="text-xs space-y-1">
              {model.prosCons.cons.map((con, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-1">-</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResponseCard;
