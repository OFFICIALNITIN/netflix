// ErrorToast.js
import React, { useEffect } from 'react';
import './Toast.css';

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast error">
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default ErrorToast;
