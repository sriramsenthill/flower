'use client';

import React from 'react';

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

interface ButtonProps extends ButtonLoadingProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { onClick, children, disabled = false, className = '', loading = false, loadingText },
  ref
) {
  const handleClick = () => {
    if (onClick && !disabled && !loading) onClick();
  };

  const baseClasses = "text-white bg-button-primary text-xs sm:text-xs md:text-sm lg:text-base h-9 sm:h-9 md:h-10 lg:h-12 px-6 min-w-32 font-satoshi font-bold transition-colors duration-500 focus:outline-none rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center";
  const disabledClasses = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90';
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading && !loadingText ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </>
      ) : loading && loadingText ? (
        <>{loadingText}</>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;