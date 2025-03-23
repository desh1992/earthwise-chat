
import { motion } from 'framer-motion';

interface TimelineProps {
  currentPhase: number;
  isPresenter: boolean;
  onPhaseSelect: (phase: number) => void;
}

const phases = [
  { id: 1, name: 'Crust', color: 'crust' },
  { id: 2, name: 'Mantle', color: 'mantle' },
  { id: 3, name: 'Outer Core', color: 'outer' },
  { id: 4, name: 'Inner Core', color: 'inner' },
  { id: 5, name: 'Core', color: 'core' },
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
    <div className="w-full py-8 overflow-x-auto glass-morphism">
      <div className="flex justify-center min-w-max">
        <div className="flex space-x-12 px-4">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              className={`timeline-item ${phase.id <= currentPhase ? '' : 'opacity-50'}`}
              onClick={() => isPresenter || phase.id <= currentPhase ? onPhaseSelect(phase.id) : null}
            >
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${isPresenter || phase.id <= currentPhase ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                style={{ backgroundColor: `var(--${phase.color}, #ccc)` }}
                variants={variants}
                animate={phase.id === currentPhase ? 'active' : 'inactive'}
                whileHover={isPresenter || phase.id <= currentPhase ? 'hover' : undefined}
              >
                <span className="text-white font-bold">{phase.id}</span>
                {phase.id === currentPhase && (
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2"
                    style={{ borderColor: `var(--${phase.color}, #ccc)` }}
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
                className="absolute mt-16 whitespace-nowrap text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + phase.id * 0.1 }}
              >
                {phase.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
