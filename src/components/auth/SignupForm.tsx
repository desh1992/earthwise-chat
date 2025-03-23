
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

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      company: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.signup(data.email, data.company, data.password);
      navigate('/login', { state: { message: 'Account created successfully! Please log in.' } });
    } catch (err) {
      setError('Failed to create account. This email might already be registered.');
    } finally {
      setIsLoading(false);
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
          Create an Account
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          variants={formAnimations.item}
        >
          Enter your details to get started
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your company name" 
                      {...field} 
                      autoComplete="organization"
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
                      placeholder="Create a password" 
                      {...field} 
                      autoComplete="new-password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Confirm your password" 
                      {...field} 
                      autoComplete="new-password"
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
                  <span className="ml-2">Creating Account...</span>
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div 
        className="text-center text-sm"
        variants={formAnimations.item}
      >
        <span className="text-muted-foreground">Already have an account? </span>
        <Button 
          variant="link" 
          className="p-0 font-semibold transition-colors duration-300 hover:text-primary/80"
          onClick={() => navigate('/login')}
        >
          Sign In
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;
