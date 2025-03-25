import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import Chat from '@/components/Chat';
import StatPanel from '@/components/StatPanel';
import TerminologySidebar from '@/components/TerminologySidebar';
import ParameterSliders from '@/components/ParameterSlider';
import LayerPhase from '@/components/LayerPhase';
import IndustrySelector from '@/components/phase2/IndustrySelector';
import { Button } from '@/components/ui/button';

const MAX_PHASE = 7;

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPhase, setCurrentPhase] = useState(1);
  const [latestStats, setLatestStats] = useState<any>(null);
  const [isPresenter, setIsPresenter] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [canProceedToNext, setCanProceedToNext] = useState(false);

  const [parameters, setParameters] = useState({
    temperature: 0.7,
    top_p: 1,
    max_tokens: 512,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  useEffect(() => {
    if (localStorage.getItem('resetPhase') === 'true') {
      setSelectedIndustry('');
      setCanProceedToNext(false);
      localStorage.removeItem('resetPhase');
    }
  }, [currentPhase]);

  const handlePhaseSelect = (phase: number) => {
    if (isPresenter && phase === currentPhase) {
      setCurrentPhase(phase);
    }
  };

  const handleNewStats = (stats: any) => {
    setLatestStats(stats);
  };

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 1:
        return "You're in the Crust phase. Ask questions to see how our AI responds and analyze the performance metrics.";
      case 2:
        return "You're in the Upper Mantle. Let’s test the model's reasoning ability through scenario-based prompts.";
      case 3:
        return "You're in the Lower Mantle. Time to evaluate technical accuracy under pressure.";
      case 4:
        return "You're in the Outer Core. Check how well the model uses and understands language.";
      case 5:
        return "You're in the Inner Core. Let’s see how it follows instructions clearly.";
      case 6:
        return "You're in the Radiative Zone. Watch the model show off some creativity.";
      case 7:
        return "You've reached the Core. Evaluating how aware the model is about bias and fairness.";
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Timeline
            currentPhase={currentPhase}
            isPresenter={isPresenter}
            onPhaseSelect={handlePhaseSelect}
            onNextPhase={() => {
              if (currentPhase < MAX_PHASE) {
                setCurrentPhase((prev) => prev + 1);
              } else {
                alert('Generating report...');
              }
            }}
            canProceed={currentPhase === 1 || canProceedToNext}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user?.company || 'Explorer'}
            </h1>
            <p className="text-muted-foreground">{getPhaseMessage()}</p>
          </motion.div>

          {currentPhase === 1 && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col gap-4 w-[320px]">
                <button
                  className="self-start text-sm mb-2 underline text-blue-600 dark:text-blue-400"
                  onClick={() => setSidebarOpen(prev => !prev)}
                >
                  {sidebarOpen ? "Hide Details ▲" : "Show Details ▼"}
                </button>
                {sidebarOpen && <TerminologySidebar />}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <motion.div
                  className="lg:col-span-2 glass-card h-[600px] flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-medium mb-4">Chat with AI</h2>
                  <div className="flex-1 border rounded-lg overflow-hidden">
                    <Chat onNewStats={handleNewStats} parameters={parameters} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col gap-4"
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
                  <ParameterSliders values={parameters} onChange={setParameters} />
                </motion.div>
              </div>
            </div>
          )}

          {currentPhase >= 2 && currentPhase <= MAX_PHASE && (
            <>
              {!selectedIndustry ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-6"
                >
                  <IndustrySelector onSelectIndustry={(id) => setSelectedIndustry(id)} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-6"
                >
                  <LayerPhase
                    layerKey={`phase-${currentPhase}`}
                    industryId={selectedIndustry}
                    onComplete={() => {}}
                    onProgress={setCanProceedToNext}
                  />
                </motion.div>
              )}

              <div className="mt-12 flex justify-center">
                <Button onClick={() => navigate('/report')}>
                  📊 Generate Report
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
