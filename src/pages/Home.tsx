
import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import Chat from '@/components/Chat';
import StatPanel from '@/components/StatPanel';
import TerminologySection from '@/components/TerminologySection';
import MantlePhase from '@/components/phase2/MantePhase';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { user, isPresenter, setIsPresenter } = useContext(AuthContext);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [latestStats, setLatestStats] = useState<any>(null);
  const [showTerminology, setShowTerminology] = useState(false);

  // Toggle presenter mode (for testing)
  const togglePresenterMode = () => {
    setIsPresenter(!isPresenter);
  };

  // Handle phase selection
  const handlePhaseSelect = (phase: number) => {
    if (isPresenter || phase <= currentPhase) {
      setCurrentPhase(phase);
    }
  };

  // Handle new stats from chat
  const handleNewStats = (stats: any) => {
    setLatestStats(stats);
    setShowTerminology(true);
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 1: return "Behind the Scenes";
      case 2: return "Comprehension";
      case 3: return "Reasoning";
      case 4: return "Technical";
      case 5: return "Language";
      case 6: return "Instruction Following";
      case 7: return "Creativity";
      case 8: return "Bias Awareness";
      case 9: return "Performance Summary";
      default: return "Behind the Scenes";
    }
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 1: return "Explore how AI/LLMs work, tokenization, model logic, and prompt engineering basics.";
      case 2: return "Test how well LLMs understand and extract meaning from prompts.";
      case 3: return "Evaluate logical deduction, inference, and step-by-step explanation capability.";
      case 4: return "Assess responses related to technical and domain-specific questions.";
      case 5: return "Analyze grammar, fluency, tone, and readability of LLM outputs.";
      case 6: return "Evaluate the ability of LLMs to follow direct, multi-step, or nuanced instructions.";
      case 7: return "Explore how creative, original, or out-of-the-box the LLM responses can be.";
      case 8: return "Examine bias, neutrality, and fairness in LLM answers.";
      case 9: return "Review performance across all LLMs on Phases 2–8 using visualizations.";
      default: return "Explore how AI/LLMs work, tokenization, model logic, and prompt engineering basics.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Timeline 
            currentPhase={currentPhase} 
            isPresenter={isPresenter} 
            onPhaseSelect={handlePhaseSelect} 
          />
        </motion.div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Message and Mode Toggle (for testing) */}
          <motion.div
            className="mb-8 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.company || 'Explorer'}
              </h1>
              <p className="text-muted-foreground">
                You're in the {getPhaseTitle()} phase. {getPhaseDescription()}
              </p>
            </div>
            
            {/* Mode Toggle for Testing */}
            <Button 
              variant="outline" 
              onClick={togglePresenterMode}
              className="hidden sm:block"
            >
              Switch to {isPresenter ? 'Audience' : 'Presenter'} Mode
            </Button>
          </motion.div>
          
          {/* Phase 1: Behind the Scenes - Chat and Stats */}
          {currentPhase === 1 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Section */}
                <motion.div 
                  className="lg:col-span-2 glass-card h-[600px] flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-medium mb-4">Chat with AI</h2>
                  <div className="flex-1 border rounded-lg overflow-hidden">
                    <Chat onNewStats={handleNewStats} />
                  </div>
                </motion.div>
                
                {/* Stats Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {latestStats ? (
                    <StatPanel stats={latestStats} />
                  ) : (
                    <div className="glass-card h-[400px] flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 mb-4">
                        <motion.div 
                          className="w-full h-full rounded-full border-4 border-primary/30 border-t-primary"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Waiting for Input</h3>
                      <p className="text-muted-foreground max-w-xs">
                        Ask a question in the chat to see detailed stats about the AI's response.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
              
              {/* Terminology Cards Section */}
              <TerminologySection isVisible={showTerminology} />
            </>
          )}
          
          {/* Phase 2: Comprehension - LLM Comparison */}
          {currentPhase === 2 && (
            <>
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MantlePhase />
              </motion.div>
              
              {/* Terminology Cards Section */}
              <TerminologySection isVisible={showTerminology} />
            </>
          )}
          
          {/* Phase 3-9 (Coming Soon) */}
          {currentPhase > 2 && (
            <>
              <motion.div 
                className="glass-card h-[600px] flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Phase {currentPhase} Coming Soon</h2>
                <p className="text-muted-foreground max-w-lg mb-6">
                  {getPhaseDescription()} This phase is still being developed.
                </p>
                <Button onClick={() => setCurrentPhase(1)}>Return to Phase 1</Button>
              </motion.div>
              
              {/* Terminology Cards Section */}
              <TerminologySection isVisible={showTerminology} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
