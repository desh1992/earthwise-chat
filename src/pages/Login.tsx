import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 right-0 w-1/3 h-1/3 rounded-full bg-blue-50 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-purple-50 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Left Side - Brand/Logo */}
        <motion.div 
          className="hidden sm:flex flex-col items-center justify-center w-full sm:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-purple-50"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">L</span>
                </div>
                <span className="ml-3 text-2xl font-medium">CoreEval</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Welcome Back
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sign in to continue your journey through the Earth's layers and explore the power of different AI models.
            </motion.p>
            
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-primary">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Explore</h3>
                  <p className="text-sm text-muted-foreground">Discover the capabilities of various LLMs</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-primary">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Compare</h3>
                  <p className="text-sm text-muted-foreground">See detailed stats and performance metrics</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-primary">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Decide</h3>
                  <p className="text-sm text-muted-foreground">Choose the right model for your needs</p>
                </div>
              </div>
              
              <motion.p
                className="text-center text-base font-medium text-muted-foreground mt-6 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <img 
                  src="/src/assets/cyquent-logo.png" 
                  alt="Cyquent Inc." 
                  className="h-12 mb-2"
                />
                Powered by Cyquent AI
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right Side - Login Form */}
        <motion.div 
          className="w-full sm:w-1/2 flex flex-col justify-center items-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-md">
            <motion.div
              className="mb-8 text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">Sign In</h2>
              <p className="text-muted-foreground">
                Enter your details to access your account
              </p>
            </motion.div>
            
            <AuthForm type="login" />
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
