
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TerminologyCardProps {
  title: string;
  description: string;
  delay?: number;
}

const TerminologyCard = ({ title, description, delay = 0 }: TerminologyCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const truncatedDescription = description.length > 70 
    ? description.substring(0, 70) + '...' 
    : description;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: delay * 0.1, 
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      } 
    },
  };

  return (
    <motion.div
      className="relative w-full perspective"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className={`card-inner duration-500 ${isFlipped ? 'flipped' : ''}`}>
        {/* Card Front */}
        <div className="card-front glass-card p-3 absolute w-full h-full backface-hidden">
          <h4 className="font-medium text-sm mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground mb-2">{truncatedDescription}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center group p-0 h-auto"
            onClick={() => setIsFlipped(true)}
          >
            Read more
            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Card Back */}
        <div className="card-back glass-card p-3 absolute w-full h-full backface-hidden rotateY-180">
          <h4 className="font-medium text-sm mb-2">{title}</h4>
          <p className="text-xs text-muted-foreground mb-2 overflow-y-auto max-h-[120px]">{description}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center group p-0 h-auto"
            onClick={() => setIsFlipped(false)}
          >
            <ChevronLeft className="h-3 w-3 mr-1 group-hover:-translate-x-1 transition-transform" />
            Go back
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminologyCard;
