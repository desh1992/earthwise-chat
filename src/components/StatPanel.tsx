
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StatPanelProps {
  stats: any;
}

const StatPanel = ({ stats }: StatPanelProps) => {
  const entries = Object.entries(stats);

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatValue = (key: string, value: any) => {
    if (key === 'estimatedCost') {
      return typeof value === 'string' ? value : `$${value.toFixed(3)}`;
    }
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card"
    >
      <h3 className="font-medium text-lg mb-3">Response Stats</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {entries.map(([key, value], index) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group"
            >
              <div className="flex justify-between items-start space-x-4">
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {formatKey(key)}:
                </span>
                <span className="text-sm font-medium text-right">
                  {formatValue(key, value)}
                </span>
              </div>
              <div className="mt-1 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default StatPanel;
