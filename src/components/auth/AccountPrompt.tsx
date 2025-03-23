
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formVariants } from './form-animations';

interface AccountPromptProps {
  type: 'login' | 'signup';
}

const AccountPrompt = ({ type }: AccountPromptProps) => {
  const navigate = useNavigate();
  
  const isLogin = type === 'login';
  const promptText = isLogin ? "Don't have an account?" : "Already have an account?";
  const buttonText = isLogin ? "Sign Up" : "Sign In";
  const destination = isLogin ? '/signup' : '/login';

  return (
    <motion.div 
      className="text-center text-sm"
      variants={formVariants}
      custom={6}
      initial="hidden"
      animate="visible"
    >
      <span className="text-muted-foreground">{promptText} </span>
      <Button 
        variant="link" 
        className="p-0 font-semibold transition-colors duration-300 hover:text-primary/80 cursor-pointer"
        onClick={() => navigate(destination)}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default AccountPrompt;
