import React, { forwardRef } from 'react';

const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input type="password" ref={ref} {...props} />;
  }
);

export default PasswordInput;