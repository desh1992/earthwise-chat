import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { authService } from '@/services/auth';
import PasswordInput from './PasswordInput';
import AccountPrompt from './AccountPrompt';
import { formVariants } from './form-animations';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
    mode: 'onChange',
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Call the backend API for login
      const response = await fetch('https://llm-compare-backend-0b16218aa15f.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the access token in localStorage
      localStorage.setItem('access_token', data.access_token);
      
      // For backwards compatibility, also keep the existing user storing logic
      const user = {
        email: values.email,
        company: 'Company Name', // This will be updated from the API response
      };
      
      setUser(user);
      setIsAuthenticated(true);
      
      if (values.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      toast({ title: 'Success', description: 'Login successful!' });
      navigate('/home');
    } catch (error) {
      let errorMessage = 'Account does not exist';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({ 
        title: 'Error', 
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          className="space-y-4"
          custom={1}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                  field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                }`}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`pt-6 pb-2 rounded-2xl shadow-sm ${
                      field.value ? 'border-primary' : ''
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          custom={2}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                  field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                }`}>
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto font-normal text-muted-foreground cursor-pointer" 
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          custom={3}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          custom={4}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <Button 
            type="submit" 
            className="w-full rounded-2xl py-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]" 
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : 'Sign In'}
          </Button>
        </motion.div>
      </form>
      
      <div className="mt-6">
        <AccountPrompt type="login" />
      </div>
    </Form>
  );
};

export default LoginForm;
