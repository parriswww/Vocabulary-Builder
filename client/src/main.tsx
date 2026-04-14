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
  // initialPath is set by the Replit canvas preview wrapper:
  // /__replco/workspace_iframe.html?initialPath=%2Femployees
  const initialPath = params.get('initialPath') || '';

  const isAdminRoute =
    pathname === '/admin' ||
    pathname === '/admin/' ||
    params.get('admin') === 'true' ||
    initialPath === '/admin' ||
    initialPath === '/admin/';

  const isEmployeesRoute =
    pathname === '/employees' ||
    pathname === '/employees/' ||
    params.get('employees') === 'true' ||
    initialPath === '/employees' ||
    initialPath === '/employees/';

  if (isAdminRoute) return 'admin';
  if (isEmployeesRoute) return 'employees';
  return 'app';
}

// Hide the HTML splash screen (only App.tsx normally does this, but
// EmployeesPage and AdminPanel don't go through Firebase init, so we must
// hide it here for those routes).
function hideSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.transition = 'opacity 0.3s ease';
    splash.style.opacity = '0';
    setTimeout(() => { splash.style.display = 'none'; }, 300);
  }
}

// Root component that re-evaluates the route reactively
// This handles Replit canvas preview which may use pushState AFTER initial mount
function Root() {
  const [route, setRoute] = useState(() =>
    getRouteComponent(window.location.pathname, window.location.search)
  );

  // If not the main App, immediately hide the splash screen since App.tsx
  // won't get a chance to do it.
  useEffect(() => {
    if (route !== 'app') hideSplash();
  }, [route]);

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
