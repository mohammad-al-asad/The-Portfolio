'use client';

import { Toaster as ReactHotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <ReactHotToaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-gray-800 text-white border border-gray-700',
        duration: 5000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
        success: {
          className: 'bg-green-500 text-white',
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },
        },
        error: {
          className: 'bg-red-500 text-white',
        },
      }}
    />
  );
}