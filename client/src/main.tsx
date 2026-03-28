import { createRoot } from "react-dom/client";
import App from "./App";
import AdminPanel from "./AdminPanel";
import "./index.css";

// Handle Firebase permission errors gracefully
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  if (error && (error.code === 'permission-denied' || error.message?.includes('insufficient permissions'))) {
    console.warn('Firebase permission error - Security Rules not configured yet');
    console.info('Please configure Firebase Security Rules to enable data persistence.');
    console.info('See FIREBASE_SECURITY_RULES.md for instructions.');
    event.preventDefault();
  }
});

// Support both /admin path AND ?admin=true query param
// The query param survives CDN/proxy redirects that may strip the path
const params = new URLSearchParams(window.location.search);
const isAdminRoute =
  window.location.pathname === '/admin' ||
  window.location.pathname === '/admin/' ||
  params.get('admin') === 'true';

createRoot(document.getElementById("root")!).render(isAdminRoute ? <AdminPanel /> : <App />);
