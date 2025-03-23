import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { authService } from '@/services/auth';
import { RotatingLines } from 'react-loader-spinner';
import PasswordInput from './PasswordInput';
import { formAnimations } from './form-animations';
import AccountPrompt from './AccountPrompt';

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(''); // Reset error state before login attempt
    try {
      const user = await authService.login(data.email, data.password);
      console.log('Login successful:', user); // Log the user object for debugging
      navigate('/home'); // Navigate to home on successful login
    } catch (err) {
      console.log('Login error:', err); // Log the error for debugging
      setError('Invalid email or password. Please try again.'); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formAnimations.container}
      className="w-full max-w-md space-y-6"
    >
      <div className="space-y-2 text-center">
        <motion.h2 
          className="text-3xl font-bold"
          variants={formAnimations.item}
        >
          Welcome Back
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          variants={formAnimations.item}
        >
          Enter your credentials to access your account
        </motion.p>
      </div>

      {error && (
        <motion.div variants={formAnimations.item}>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <motion.div variants={formAnimations.item}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      {...field} 
                      autoComplete="email"
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={formAnimations.item}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Enter your password" 
                      {...field} 
                      autoComplete="current-password"
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={formAnimations.item}>
            <Button 
              type="submit" 
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <RotatingLines width="20" strokeColor="white" strokeWidth="3" />
                  <span className="ml-2">Signing In...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div 
        variants={formAnimations.item}
      >
        <AccountPrompt type="login" />
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
