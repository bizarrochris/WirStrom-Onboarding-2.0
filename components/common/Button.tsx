
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-raiffeisen-yellow text-black hover:bg-yellow-300 focus:ring-raiffeisen-yellow',
    secondary: 'bg-raiffeisen-yellow text-black hover:bg-yellow-300 focus:ring-raiffeisen-yellow',
    dark: 'bg-raiffeisen-yellow text-black hover:bg-yellow-300 focus:ring-raiffeisen-yellow',
  };

  const sizeStyles = {
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
