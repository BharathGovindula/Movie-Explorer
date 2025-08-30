import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md my-4 mx-auto max-w-lg">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p>{message || 'An error occurred. Please try again later.'}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;