import { useContext } from 'react';
import { AuthContext } from '@/App';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="relative pt-20">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute top-40 -right-28 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-60 -left-28 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft"></span>
            <span className="text-sm font-medium text-primary">Interactive LLM Comparison</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Compare AI Models <br className="hidden md:block" />
            With Precision
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl text-lg text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Experience the nuanced differences between leading language models through our interactive, 
            Earth-themed comparison tool. See real-time stats, responses, and performance metrics.
          </motion.p>
          
          <motion.div 
            className="mb-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <img 
              src="/cyquent-logo.png" 
              alt="Cyquent Inc." 
              className="h-24 mb-3"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              A product of Cyquent Inc.
            </h2>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="px-8 rounded-full"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 rounded-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Earth-Themed Journey",
                description: "Navigate through layers of the Earth as you explore different AI models and capabilities."
              },
              {
                title: "Real-time Analytics",
                description: "Compare response times, token usage, clarity scores, and more across multiple models."
              },
              {
                title: "Interactive Experience",
                description: "Ask your own questions or use our samples to see how different models respond to the same prompt."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="glass-card h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}
              >
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
