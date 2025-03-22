
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <div className="w-full max-w-md">
      {type === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthForm;
