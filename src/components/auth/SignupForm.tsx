
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import PasswordInput from './PasswordInput';
import AccountPrompt from './AccountPrompt';
import { formVariants } from './form-animations';

const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  company: z.string().min(1, { message: 'Company name is required' }),
  userType: z.enum(['audience', 'presenter'], { required_error: 'Please select a user type' }),
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
    defaultValues: { 
      name: '', 
      email: '', 
      company: '', 
      userType: 'audience', 
      password: '', 
      confirmPassword: '' 
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Call the backend API for signup
      const response = await fetch('https://llm-compare-backend-0b16218aa15f.herokuapp.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          company_name: values.company,
          password: values.password,
          name: values.name,
          user_type: values.userType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast({ title: 'Success', description: 'Account created successfully!' });
      navigate('/login');
    } catch (error) {
      let errorMessage = 'There was a problem creating your account';
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
              <FormItem className="relative">
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
              <FormItem className="relative">
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
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="audience" className="cursor-pointer">Audience</SelectItem>
                    <SelectItem value="presenter" className="cursor-pointer">Presenter</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="Create a password" 
                    autoComplete="new-password" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          custom={6}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={`absolute z-10 left-3 text-muted-foreground transition-all duration-200 ${
                  field.value ? '-top-6 left-0 text-sm text-foreground' : 'top-2.5'
                }`}>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput 
                    field={field} 
                    placeholder="Confirm your password" 
                    autoComplete="new-password" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          custom={7}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="pt-2"
        >
          <Button 
            type="submit" 
            className="w-full rounded-2xl py-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]" 
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
      
      <div className="mt-6">
        <AccountPrompt type="signup" />
      </div>
    </Form>
  );
};

export default SignupForm;
