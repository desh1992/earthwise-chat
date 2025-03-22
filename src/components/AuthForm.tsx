
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { authService } from '@/services/auth';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Field required' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  company: z.string().min(1, { message: 'Field required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
    .regex(/.*\d.*/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string().min(1, { message: 'Field required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthForm = ({ type }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', company: '', password: '', confirmPassword: '' },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await authService.login(values.email, values.password);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      toast({ title: 'Success', description: 'Login successful!' });
      navigate('/home');
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Account does not exist',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      await authService.signup(values.email, values.company, values.password);
      toast({ title: 'Success', description: 'Account created successfully!' });
      navigate('/login');
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'There was a problem creating your account',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    }),
  };

  const renderLoginForm = () => (
    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
      <motion.div 
        className="space-y-2"
        custom={1}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...loginForm.register('email')}
          className={loginForm.formState.errors.email ? "border-red-500" : ""}
        />
        {loginForm.formState.errors.email && (
          <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={2}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Button 
            variant="link" 
            className="text-xs p-0 h-auto font-normal text-muted-foreground" 
            type="button"
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...loginForm.register('password')}
          className={loginForm.formState.errors.password ? "border-red-500" : ""}
        />
        {loginForm.formState.errors.password && (
          <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
        )}
      </motion.div>
      
      <motion.div
        custom={3}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </div>
          ) : 'Sign In'}
        </Button>
      </motion.div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
      <motion.div 
        className="space-y-2"
        custom={1}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...signupForm.register('email')}
          className={signupForm.formState.errors.email ? "border-red-500" : ""}
        />
        {signupForm.formState.errors.email && (
          <p className="text-red-500 text-sm">{signupForm.formState.errors.email.message}</p>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={2}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          placeholder="Acme Inc."
          {...signupForm.register('company')}
          className={signupForm.formState.errors.company ? "border-red-500" : ""}
        />
        {signupForm.formState.errors.company && (
          <p className="text-red-500 text-sm">{signupForm.formState.errors.company.message}</p>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={3}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...signupForm.register('password')}
          className={signupForm.formState.errors.password ? "border-red-500" : ""}
        />
        {signupForm.formState.errors.password && (
          <p className="text-red-500 text-sm">{signupForm.formState.errors.password.message}</p>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={4}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...signupForm.register('confirmPassword')}
          className={signupForm.formState.errors.confirmPassword ? "border-red-500" : ""}
        />
        {signupForm.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm">{signupForm.formState.errors.confirmPassword.message}</p>
        )}
      </motion.div>
      
      <motion.div
        custom={5}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating account...
            </div>
          ) : 'Create Account'}
        </Button>
      </motion.div>
    </form>
  );

  return type === 'login' ? renderLoginForm() : renderSignupForm();
};

export default AuthForm;
