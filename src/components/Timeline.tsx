// Timeline.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TimelineProps {
  currentPhase: number;
  isPresenter: boolean;
  onPhaseSelect: (phase: number) => void;
  onNextPhase: () => void;
  canProceed: boolean;
}

const phases = [
  { id: 1, name: 'Crust', eval: 'Comprehension', icon: '🧠', color: 'crust' },
  { id: 2, name: 'Upper Mantle', eval: 'Reasoning', icon: '🧩', color: 'mantle1' },
  { id: 3, name: 'Lower Mantle', eval: 'Technical', icon: '💻', color: 'mantle2' },
  { id: 4, name: 'Outer Core', eval: 'Language', icon: '🔤', color: 'outer' },
  { id: 5, name: 'Inner Core', eval: 'Instruction', icon: '📋', color: 'inner' },
  { id: 6, name: 'Radiative Zone', eval: 'Creativity', icon: '🎨', color: 'radiative' },
  { id: 7, name: 'Core', eval: 'Bias Awareness', icon: '⚖️', color: 'core' },
];

const Timeline = ({ currentPhase, isPresenter, onPhaseSelect, onNextPhase, canProceed }: TimelineProps) => {
  const isArrowEnabled = currentPhase === 1 || canProceed;

  return (
    <div className="w-full py-8 overflow-x-auto glass-morphism">
      <div className="flex justify-center min-w-max">
        <div className="flex space-x-12 px-4">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              className={`timeline-item flex flex-col items-center ${phase.id === currentPhase ? '' : 'opacity-50'}`}
            >
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${phase.id === currentPhase ? 'cursor-default' : 'cursor-not-allowed'}`}
               // style={{ backgroundColor: `var(--${phase.color}, #ccc)` }}
              >
                {phase.icon}
                {phase.id === currentPhase && (
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2"
                    style={{ borderColor: `var(--${phase.color}, #ccc)` }}
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>
              <div className="mt-2 text-xs text-center">
                <div className="font-semibold text-gray-800 dark:text-gray-200">{phase.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{phase.eval}</div>
              </div>
            </motion.div>
          ))}

          {/* Final Phase Arrow */}
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center ml-6 ${isArrowEnabled ? 'bg-blue-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={() => {
              if (isArrowEnabled) {
                // Reset selected industry/question when moving to next phase
                localStorage.setItem('resetPhase', 'true');
                onNextPhase();
              } else {
                alert("Please complete the current stage to continue.");
              }
            }}
          >
            <ArrowRight className="h-6 w-6" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
