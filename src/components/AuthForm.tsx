import { useContext, useState } from 'react';
import { AuthContext } from '@/App'; // Ensure this is the correct import path
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { authService } from '@/services/auth'; // Ensure this import is correct

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  const onLoginSubmit = async (values: { email: string, password: string }) => {
    setIsLoading(true);
    try {
      const user = await authService.login(values.email, values.password);
      setUser(user); // Set user in context
      setIsAuthenticated(true); // Update authentication state
      localStorage.setItem('user', JSON.stringify(user)); // Store user info
      navigate('/home'); // Redirect to home
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const onSignupSubmit = async (values: { email: string, company: string, password: string, name: string }) => {
    setIsLoading(true);
    try {
      await authService.signup(values.email, values.company, values.password, values.name);
      toast({ title: 'Success', description: 'Account created successfully! Redirecting to login...' });
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.message || 'There was a problem creating your account',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full max-w-md">
      {type === 'login' ? (
        <LoginForm onSubmit={onLoginSubmit} loading={isLoading} /> // Pass props to LoginForm
      ) : (
        <SignupForm onSubmit={onSignupSubmit} loading={isLoading} /> // Pass props to SignupForm
      )}
    </div>
  );
};

export default AuthForm;
