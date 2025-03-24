import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 h-16 glass-morphism z-50 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-white font-bold">L</span>
          </motion.div>
          <span className="font-medium text-lg">CoreEval</span>
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/5 text-primary">
                    {user?.email.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
