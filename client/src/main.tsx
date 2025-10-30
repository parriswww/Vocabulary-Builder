import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle Firebase permission errors gracefully
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  if (error && (error.code === 'permission-denied' || error.message?.includes('insufficient permissions'))) {
    console.warn('Firebase permission error - Security Rules not configured yet');
    console.info('Please configure Firebase Security Rules to enable data persistence.');
    console.info('See FIREBASE_SECURITY_RULES.md for instructions.');
    // Prevent the error from showing in the Vite error overlay
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
