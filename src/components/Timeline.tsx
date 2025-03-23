
import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  CircuitBoard, 
  Code,
  AlignJustify,
  ListChecks,
  Sparkles,
  BarChart,
  Scale
} from 'lucide-react';

interface TimelineProps {
  currentPhase: number;
  isPresenter: boolean;
  onPhaseSelect: (phase: number) => void;
}

const phases = [
  { id: 1, name: 'Behind the Scenes', color: 'bg-indigo-500', icon: Brain },
  { id: 2, name: 'Comprehension', color: 'bg-blue-500', icon: BookOpen },
  { id: 3, name: 'Reasoning', color: 'bg-cyan-500', icon: CircuitBoard },
  { id: 4, name: 'Technical', color: 'bg-teal-500', icon: Code },
  { id: 5, name: 'Language', color: 'bg-green-500', icon: AlignJustify },
  { id: 6, name: 'Instruction', color: 'bg-yellow-500', icon: ListChecks },
  { id: 7, name: 'Creativity', color: 'bg-orange-500', icon: Sparkles },
  { id: 8, name: 'Bias Awareness', color: 'bg-red-500', icon: Scale },
  { id: 9, name: 'Summary', color: 'bg-purple-500', icon: BarChart },
];

const Timeline = ({ currentPhase, isPresenter, onPhaseSelect }: TimelineProps) => {
  const variants = {
    inactive: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    active: { 
      scale: 1.1,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    },
    hover: { 
      scale: isPresenter ? 1.15 : 1.05, 
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    }
  };

  return (
    <div className="w-full py-6 overflow-x-auto glass-morphism top-10 sticky z-10">
      <div className="flex justify-start min-w-max px-4 max-w-7xl mx-auto">
        <div className="flex space-x-6 md:space-x-10">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.id}
                className={`timeline-item ${phase.id <= currentPhase ? '' : 'opacity-60'}`}
                onClick={() => isPresenter || phase.id <= currentPhase ? onPhaseSelect(phase.id) : null}
              >
                <motion.div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${isPresenter || phase.id <= currentPhase ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  style={{ backgroundColor: `var(--${phase.color}, ${phase.color})` }}
                  variants={variants}
                  animate={phase.id === currentPhase ? 'active' : 'inactive'}
                  whileHover={isPresenter || phase.id <= currentPhase ? 'hover' : undefined}
                >
                  <Icon className="h-5 w-5 text-white" />
                  {phase.id === currentPhase && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2"
                      style={{ borderColor: `var(--${phase.color}, ${phase.color})` }}
                      animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
                <motion.div 
                  className="absolute mt-14 whitespace-nowrap text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + phase.id * 0.1 }}
                >
                  {phase.name}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
