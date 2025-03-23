
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
  const [isHovered, setIsHovered] = useState(false);

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className={`card-inner h-full w-full relative ${isFlipped ? 'flipped' : ''}`}
        animate={{ 
          scale: isHovered && !isFlipped ? 1.02 : 1,
          boxShadow: isHovered && !isFlipped ? "0 10px 25px rgba(0,0,0,0.1)" : "none"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Front of card (Response) */}
        <motion.div 
          className={`card-front glass-card h-full w-full flex flex-col p-6 cursor-pointer ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
          onClick={handleClick}
        >
          <div className={`w-16 h-16 rounded-full ${model.color} flex items-center justify-center text-white text-xl font-bold mb-4 transition-transform duration-300 ${isHovered && !isFlipped ? 'scale-110' : ''}`}>
            {model.element.charAt(0)}
          </div>
          <h3 className="text-lg font-medium mb-3">{model.element} Element</h3>
          <p className="text-muted-foreground flex-grow overflow-y-auto text-sm">
            {model.response}
          </p>
          <motion.div 
            className="mt-4 text-center"
            animate={{ 
              y: isHovered && !isFlipped ? 5 : 0,
              opacity: isHovered && !isFlipped ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground">Click to choose this response</p>
          </motion.div>
        </motion.div>
        
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
                  <motion.div
                    className="bg-primary h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Pros</h4>
            <ul className="text-xs space-y-1 mb-3">
              {model.prosCons.pros.map((pro, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <span className="text-green-500 mr-1">+</span> {pro}
                </motion.li>
              ))}
            </ul>
            
            <h4 className="text-sm font-medium mb-2">Cons</h4>
            <ul className="text-xs space-y-1">
              {model.prosCons.cons.map((con, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}
                >
                  <span className="text-red-500 mr-1">-</span> {con}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResponseCard;
