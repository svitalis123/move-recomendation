import { StateCreator } from 'zustand';

export interface UISlice {
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  };
}

export interface UIActions {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const createUISlice: StateCreator<
  UISlice & UIActions,
  [],
  []
> = (set) => ({
  toast: {
    message: '',
    type: 'info',
    visible: false,
  },

  showToast: (message, type) => 
    set({ toast: { message, type, visible: true } }),
  hideToast: () => 
    set({ toast: { message: '', type: 'info', visible: false } }),
});