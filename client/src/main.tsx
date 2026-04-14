import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import App from "./App";
import AdminPanel from "./AdminPanel";
import EmployeesPage from "./pages/Employees";
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

function getRouteComponent(pathname: string, search: string) {
  const params = new URLSearchParams(search);
  const isAdminRoute =
    pathname === '/admin' ||
    pathname === '/admin/' ||
    params.get('admin') === 'true';
  const isEmployeesRoute =
    pathname === '/employees' ||
    pathname === '/employees/' ||
    params.get('employees') === 'true';

  if (isAdminRoute) return 'admin';
  if (isEmployeesRoute) return 'employees';
  return 'app';
}

// Root component that re-evaluates the route reactively
// This handles Replit canvas preview which may use pushState AFTER initial mount
function Root() {
  const [route, setRoute] = useState(() =>
    getRouteComponent(window.location.pathname, window.location.search)
  );

  useEffect(() => {
    const update = () => {
      setRoute(getRouteComponent(window.location.pathname, window.location.search));
    };

    // Re-check when history navigation occurs
    window.addEventListener('popstate', update);

    // Patch pushState and replaceState so canvas pushState navigation is caught
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);

    history.pushState = function (...args) {
      origPush(...args);
      update();
    };
    history.replaceState = function (...args) {
      origReplace(...args);
      update();
    };

    return () => {
      window.removeEventListener('popstate', update);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  if (route === 'admin') return <AdminPanel />;
  if (route === 'employees') return <EmployeesPage />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(<Root />);
