
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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

const ELEMENT_LABELS: Record<string, string> = {
  chatgpt: 'Earth',
  claude: 'Water',
  gemini: 'Fire',
  llama: 'Wind'
};

const ELEMENT_COLORS: Record<string, string> = {
  chatgpt: 'bg-green-500',
  claude: 'bg-blue-500',
  gemini: 'bg-red-500',
  llama: 'bg-indigo-500'
};

const ResponseCard = ({
  model,
  isSelected,
  onSelect,
  revealed,
  autoFlip
}: ResponseCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoFlipped, setAutoFlipped] = useState(false);

  const element = ELEMENT_LABELS[model.modelId] || model.element;
  const elementColor = ELEMENT_COLORS[model.modelId] || model.color;

  useEffect(() => {
    if ((revealed || isSelected) && !isFlipped && !autoFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setAutoFlipped(true);
      }, isSelected ? 100 : 1000);
      return () => clearTimeout(timer);
    }

    if (autoFlip && !isFlipped && !autoFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setAutoFlipped(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSelected, revealed, autoFlip, isFlipped, autoFlipped]);

  const handleClick = () => {
    if (revealed || isSelected || autoFlipped) {
      setIsFlipped((prev) => !prev);
    } else {
      setIsFlipped(true);
      onSelect();
    }
  };

  return (
    <motion.div
      className="card-container h-[480px] w-full"
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${elementColor} text-white font-semibold text-sm flex items-center justify-center`}>
                {element.charAt(0)}
              </div>
              <h3 className="text-base font-semibold">{element} Element</h3>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Eye className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{element} Full Response</h2>
                <div className="prose max-w-none prose-sm">
                  <ReactMarkdown>{model.response}</ReactMarkdown>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-muted-foreground flex-grow overflow-y-auto text-sm prose prose-sm">
            <ReactMarkdown>{model.response}</ReactMarkdown>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              {revealed || autoFlipped ? 'Click to flip card' : 'Click to choose this response'}
            </p>
          </div>
        </div>

        {/* Back of card (Model details) */}
        <div className="card-back glass-card h-full w-full p-6 overflow-y-auto cursor-pointer" onClick={handleClick}>
          <h3 className="text-lg font-medium mb-2">{element} Element – Insights</h3>

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
