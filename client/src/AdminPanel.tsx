import { useState, useEffect } from 'react';
import type { SubscriberRecord } from '@shared/schema';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));
  const [authError, setAuthError] = useState('');
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [extendDays, setExtendDays] = useState<Record<string, string>>({});

  useEffect(() => {
    if (token) fetchSubscribers();
  }, [token]);

  const login = async () => {
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Login failed');
        return;
      }
      sessionStorage.setItem('admin_token', data.token);
      setToken(data.token);
    } catch {
      setAuthError('Network error. Is the server running?');
    }
  };

  const logout = async () => {
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'x-admin-token': token },
      });
    }
    sessionStorage.removeItem('admin_token');
    setToken(null);
    setSubscribers([]);
  };

  const fetchSubscribers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers', {
        headers: { 'x-admin-token': token },
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_token');
        setToken(null);
        return;
      }
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch {
      setMessage('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const extendTrial = async (uid: string) => {
    const days = parseInt(extendDays[uid] || '7', 10);
    if (isNaN(days) || days <= 0) { setMessage('Enter valid days'); return; }
    setActionLoading(uid + '-extend');
    try {
      const res = await fetch('/api/admin/extend-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token! },
        body: JSON.stringify({ uid, days }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Trial extended by ${days} days. New end: ${new Date(data.newTrialEnd).toLocaleDateString()}`);
        await fetchSubscribers();
      } else {
        setMessage(data.error || 'Failed to extend trial');
      }
    } catch {
      setMessage('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const grantFreeMonth = async (uid: string) => {
    setActionLoading(uid + '-grant');
    try {
      const res = await fetch('/api/admin/grant-free-month', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token! },
        body: JSON.stringify({ uid }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Free month granted. Access until: ${new Date(data.freeUntil).toLocaleDateString()}`);
        await fetchSubscribers();
      } else {
        setMessage(data.error || 'Failed to grant free month');
      }
    } catch {
      setMessage('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (ts: number | null) => {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (s: SubscriberRecord) => {
    if (s.isPremium) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (s.status === 'trialing') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    if (s.adminGrantedFreeUntil && s.adminGrantedFreeUntil > Date.now()) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (s.status === 'canceled') return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    if (s.status === 'past_due') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  };

  const getStatusLabel = (s: SubscriberRecord) => {
    if (s.isPremium) return 'Premium';
    if (s.adminGrantedFreeUntil && s.adminGrantedFreeUntil > Date.now()) return 'Admin Grant';
    if (s.status === 'trialing' && s.trialEndDate && s.trialEndDate > Date.now()) {
      const days = Math.ceil((s.trialEndDate - Date.now()) / (24 * 60 * 60 * 1000));
      return `Trial (${days}d left)`;
    }
    return s.status.charAt(0).toUpperCase() + s.status.slice(1);
  };

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-gray-400 text-sm mb-6">Vocabulary Builder</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Admin password"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            data-testid="input-admin-password"
          />
          {authError && <p className="text-red-400 text-sm mb-3">{authError}</p>}
          <button
            onClick={login}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl py-3 transition-colors"
            data-testid="button-admin-login"
          >
            Log In
          </button>
          <a href="/" className="block text-center text-gray-500 text-sm mt-4 hover:text-gray-300 transition-colors">
            Back to app
          </a>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm">Vocabulary Builder</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
            data-testid="button-admin-refresh"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
          >
            App
          </a>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-300 text-sm rounded-lg transition-colors"
            data-testid="button-admin-logout"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Message Banner */}
      {message && (
        <div className="bg-green-900/30 border-b border-green-800 px-6 py-3 flex items-center justify-between">
          <span className="text-green-300 text-sm">{message}</span>
          <button onClick={() => setMessage('')} className="text-green-400 hover:text-green-200 text-lg leading-none">&times;</button>
        </div>
      )}

      <main className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: subscribers.length },
            { label: 'Premium', value: subscribers.filter(s => s.isPremium).length },
            { label: 'On Trial', value: subscribers.filter(s => s.status === 'trialing' && s.trialEndDate && s.trialEndDate > Date.now()).length },
            { label: 'Admin Grant', value: subscribers.filter(s => s.adminGrantedFreeUntil && s.adminGrantedFreeUntil > Date.now()).length },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscribers Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Subscribers ({subscribers.length})</h2>
          </div>

          {subscribers.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              {loading ? 'Loading subscribers...' : 'No subscribers yet. Users appear here when they log in.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs">
                    <th className="text-left px-4 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Trial End</th>
                    <th className="text-left px-4 py-3 font-medium">Admin Grant</th>
                    <th className="text-left px-4 py-3 font-medium">Period End</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map(sub => (
                    <tr key={sub.uid} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-medium text-white truncate max-w-[180px]" title={sub.email || sub.uid}>
                          {sub.displayName || sub.email || 'Anonymous'}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{sub.uid.slice(0, 16)}...</div>
                        {sub.email && sub.displayName && (
                          <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[180px]">{sub.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub)}`}>
                          {getStatusLabel(sub)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-300 text-xs">
                        {formatDate(sub.trialEndDate)}
                      </td>
                      <td className="px-4 py-4 text-gray-300 text-xs">
                        {formatDate(sub.adminGrantedFreeUntil)}
                      </td>
                      <td className="px-4 py-4 text-gray-300 text-xs">
                        {formatDate(sub.currentPeriodEnd)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Extend Trial */}
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="1"
                              max="365"
                              value={extendDays[sub.uid] || '7'}
                              onChange={e => setExtendDays(prev => ({ ...prev, [sub.uid]: e.target.value }))}
                              className="w-14 bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                              data-testid={`input-extend-days-${sub.uid}`}
                            />
                            <button
                              onClick={() => extendTrial(sub.uid)}
                              disabled={actionLoading === sub.uid + '-extend'}
                              className="px-2 py-1 bg-amber-700 hover:bg-amber-600 text-white text-xs rounded transition-colors disabled:opacity-50 whitespace-nowrap"
                              data-testid={`button-extend-trial-${sub.uid}`}
                              title="Extend trial"
                            >
                              {actionLoading === sub.uid + '-extend' ? '...' : '+Trial'}
                            </button>
                          </div>
                          {/* Grant Free Month */}
                          <button
                            onClick={() => grantFreeMonth(sub.uid)}
                            disabled={actionLoading === sub.uid + '-grant'}
                            className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:opacity-50 whitespace-nowrap"
                            data-testid={`button-grant-month-${sub.uid}`}
                            title="Grant 30 days free access"
                          >
                            {actionLoading === sub.uid + '-grant' ? '...' : 'Grant 30d'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
