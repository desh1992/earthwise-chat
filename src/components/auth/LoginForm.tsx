
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
      const user = await authService.login(values.email, values.password);
      setUser(user);
      setIsAuthenticated(true);
      
      if (values.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
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
              <FormItem>
                <div className="relative">
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
                </div>
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
              <FormItem>
                <div className="relative">
                  <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                    field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                  }`}>
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput field={field} />
                  </FormControl>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto font-normal text-muted-foreground" 
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
            className="w-full rounded-2xl py-6" 
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
    </Form>
  );
};

export default LoginForm;
