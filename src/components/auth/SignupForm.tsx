
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { authService } from '@/services/auth';
import PasswordInput from './PasswordInput';
import { formVariants } from './form-animations';

const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  company: z.string().min(1, { message: 'Company name is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
    .regex(/.*\d.*/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', company: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      await authService.signup(values.email, values.company, values.password, values.name);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <motion.div 
          className="space-y-2"
          custom={1}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                    field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                  }`}>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
          className="space-y-2"
          custom={2}
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
          className="space-y-2"
          custom={3}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                    field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                  }`}>
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
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
          className="space-y-2"
          custom={4}
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
                    <PasswordInput field={field} placeholder="Create a password" autoComplete="new-password" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          custom={5}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                    field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                  }`}>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput field={field} placeholder="Confirm your password" autoComplete="new-password" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          custom={6}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="pt-2"
        >
          <Button 
            type="submit" 
            className="w-full rounded-2xl py-6" 
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : 'Create Account'}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default SignupForm;
