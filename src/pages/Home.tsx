
import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import Chat from '@/components/Chat';
import StatPanel from '@/components/StatPanel';
import ExplanationSidebar from '@/components/ExplanationSidebar';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [latestStats, setLatestStats] = useState<any>(null);
  const [isPresenter, setIsPresenter] = useState(true);

  // Handle phase selection
  const handlePhaseSelect = (phase: number) => {
    if (isPresenter || phase <= currentPhase) {
      setCurrentPhase(phase);
    }
  };

  // Handle new stats from chat
  const handleNewStats = (stats: any) => {
    setLatestStats(stats);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
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
          {/* Welcome Message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user?.company || 'Explorer'}
            </h1>
            <p className="text-muted-foreground">
              You're in the Earth's Crust phase. Ask questions to see how our AI responds and analyze the performance metrics.
            </p>
          </motion.div>
          
          {/* Phase 1: Crust - Chat and Stats */}
          {currentPhase === 1 && (
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
          )}
          
          {/* Phase 2-5 (Placeholder) */}
          {currentPhase > 1 && (
            <motion.div 
              className="glass-card h-[600px] flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Phase {currentPhase} Coming Soon</h2>
              <p className="text-muted-foreground max-w-lg mb-6">
                This phase of the Earth journey is still being excavated. Check back soon or return to the Crust phase.
              </p>
              <Button onClick={() => setCurrentPhase(1)}>Return to Crust</Button>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Explanation Sidebar */}
      <ExplanationSidebar />
    </div>
  );
};

// Import only used in the Phase placeholder
import { Button } from '@/components/ui/button';

export default Home;
