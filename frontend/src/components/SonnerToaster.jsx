import { Toaster } from 'sonner';

export const SonnerToaster = () => (
  <Toaster 
    position="top-right" 
    richColors 
    theme="dark"
    toastOptions={{
      duration: 4000,
      style: {
        background: '#1A1A1A', // Darker background
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      },
      success: {
        icon: '🔥', // Fire icon for success
        style: {
          background: '#1A1A1A',
          color: '#FFFFFF',
        },
      },
      error: {
        icon: '❌', // X icon for error
        style: {
          background: '#1A1A1A',
          color: '#FFFFFF',
        },
      },
      action: {
        style: {
          background: '#E53E3E', // Red color for action button
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        },
      },
    }}
  />
);