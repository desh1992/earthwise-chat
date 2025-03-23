
import React from 'react';
import { Link } from 'react-router-dom';

interface AccountPromptProps {
  type: 'login' | 'signup';
}

const AccountPrompt = ({ type }: AccountPromptProps) => {
  if (type === 'login') {
    return (
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link to="/signup" className="text-primary font-medium hover:underline transition-colors">
          Sign Up
        </Link>
      </div>
    );
  }
  
  return (
    <div className="text-center text-sm">
      <span className="text-muted-foreground">Already have an account? </span>
      <Link to="/login" className="text-primary font-medium hover:underline transition-colors">
        Sign In
      </Link>
    </div>
  );
};

export default AccountPrompt;
