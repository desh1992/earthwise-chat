import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResponseCard from './ResponseCard';
import ComparisonHeatmap from './ComparisonHeatmap';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Loader2 } from 'lucide-react';
import { llmCompareService } from '@/services/llm-compare';

interface ResponseComparisonProps {
  question: string;
  layerKey: string;
  onReset: () => void;
  onNext: () => void;
}

const ResponseComparison = ({
  question,
  layerKey,
  onReset,
  onNext,
}: ResponseComparisonProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const data = await llmCompareService.getResponsesForQuestion(question);
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [question]);

  const handleSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setTimeout(() => {
      setRevealed(true);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating responses from all models...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Compare Responses</h2>
        <p className="text-muted-foreground">
          {selectedModelId
            ? 'View and compare detailed model information below.'
            : 'Select your favorite response by clicking on a card.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {responses.map((model) => (
          <ResponseCard
            key={model.modelId}
            model={model}
            isSelected={selectedModelId === model.modelId}
            onSelect={() => handleSelect(model.modelId)}
            revealed={revealed}
            autoFlip={revealed}
          />
        ))}
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">📊 View Performance Heatmap</Button>
            </DrawerTrigger>
            <DrawerContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Performance Comparison</h4>
              <ComparisonHeatmap responses={responses} />
            </DrawerContent>
          </Drawer>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={onReset} variant="outline">
              Try Another Question
            </Button>
            {/* Future: You can show this if you want "Next Phase" visible */}
            {/* {selectedModelId && <Button onClick={onNext}>Next Phase →</Button>} */}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponseComparison;



// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ResponseCard from './ResponseCard';
// import ComparisonHeatmap from './ComparisonHeatmap';
// import { Button } from '@/components/ui/button';
// import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
// import { Loader2 } from 'lucide-react';
// import { llmCompareService } from '@/services/llm-compare';

// interface ResponseComparisonProps {
//   question: string;
//   layerKey: string;
//   onReset: () => void;
//   onNext: () => void;
// }

// const ResponseComparison = ({ question, layerKey, onReset, onNext }: ResponseComparisonProps) => {
//   const [responses, setResponses] = useState<any[]>([]);
//   const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
//   const [revealed, setRevealed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [openDrawer, setOpenDrawer] = useState(false);

//   useEffect(() => {
//     const fetchResponses = async () => {
//       setLoading(true);
//       try {
//         const data = await llmCompareService.getResponsesForQuestion(question);
//         setResponses(data);
//       } catch (error) {
//         console.error('Error fetching responses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResponses();
//   }, [question]);

//   const handleSelect = (modelId: string) => {
//     setSelectedModelId(modelId);
//     setTimeout(() => setRevealed(true), 2000);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center p-10 h-96">
//         <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
//         <p className="text-muted-foreground">Generating responses from all models...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <div className="mb-6">
//         <h2 className="text-xl font-medium mb-2">Compare Responses</h2>
//         <p className="text-muted-foreground">
//           {selectedModelId
//             ? 'View and compare detailed model information below.'
//             : 'Select your favorite response by clicking on a card.'}
//         </p>
//       </div>

//       {/* Full width, stacked layout for readability */}
//       <div className="flex flex-col space-y-6 mb-8">
//         {responses.map((model) => (
//           <ResponseCard
//             key={model.modelId}
//             model={model}
//             isSelected={selectedModelId === model.modelId}
//             onSelect={() => handleSelect(model.modelId)}
//             revealed={revealed}
//             autoFlip={revealed}
//           />
//         ))}
//       </div>

//       {revealed && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-10"
//         >
//           <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
//             <DrawerTrigger asChild>
//               <Button variant="secondary">View Heatmap</Button>
//             </DrawerTrigger>
//             <DrawerContent className="p-6 max-h-[80vh] overflow-y-auto">
//               <h3 className="text-lg font-medium mb-4">Heatmap Comparison</h3>
//               <ComparisonHeatmap responses={responses} />
//             </DrawerContent>
//           </Drawer>

//           <div className="mt-8 flex flex-col items-center gap-4">
//             <Button onClick={onReset} variant="outline">
//               Try Another Question
//             </Button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ResponseComparison;
