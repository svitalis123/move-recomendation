'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';
import { X } from 'lucide-react';

export function Toast() {
  // Moved the useStore hook inside the component function
  const { toast, hideToast } = useStore();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
        toast.type === 'success' ? 'bg-green-500' :
        toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      } text-white`}
    >
      <p>{toast.message}</p>
      <button
        onClick={hideToast}
        className="p-1 hover:bg-white/20 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}