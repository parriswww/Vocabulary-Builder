import { useState, useEffect } from 'react';
import type { SubscriberRecord } from '@shared/schema';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));
  const [authError, setAuthError] = useState('');
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' });
  const [extendDays, setExtendDays] = useState<Record<string, string>>({});
  const [activateMonths, setActivateMonths] = useState<Record<string, string>>({});

  useEffect(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => splash.remove(), 300);
    }
  }, []);

  useEffect(() => {
    if (token) fetchSubscribers();
  }, [token]);

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 6000);
  };

  const login = async () => {
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.error || 'Login failed'); return; }
      sessionStorage.setItem('admin_token', data.token);
      setToken(data.token);
    } catch {
      setAuthError('Network error. Is the server running?');
    }
  };

  const logout = async () => {
    if (token) await fetch('/api/admin/logout', { method: 'POST', headers: { 'x-admin-token': token } });
    sessionStorage.removeItem('admin_token');
    setToken(null);
    setSubscribers([]);
  };

  const fetchSubscribers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers', { headers: { 'x-admin-token': token } });
      if (res.status === 401) { sessionStorage.removeItem('admin_token'); setToken(null); return; }
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch {
      showMessage('Failed to fetch subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const extendTrial = async (uid: string) => {
    const days = parseInt(extendDays[uid] || '7', 10);
    if (isNaN(days) || days <= 0) { showMessage('Enter valid days', 'error'); return; }
    setActionLoading(uid + '-extend');
    try {
      const res = await fetch('/api/admin/extend-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token! },
        body: JSON.stringify({ uid, days }),
      });
      const data = await res.json();
      if (res.ok) { showMessage(`Trial extended by ${days} days. New end: ${new Date(data.newTrialEnd).toLocaleDateString()}`); await fetchSubscribers(); }
      else showMessage(data.error || 'Failed to extend trial', 'error');
    } catch { showMessage('Network error', 'error'); }
    finally { setActionLoading(null); }
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
      if (res.ok) { showMessage(`Free month granted. Access until: ${new Date(data.freeUntil).toLocaleDateString()}`); await fetchSubscribers(); }
      else showMessage(data.error || 'Failed to grant free month', 'error');
    } catch { showMessage('Network error', 'error'); }
    finally { setActionLoading(null); }
  };

  const activatePaid = async (uid: string) => {
    const months = parseInt(activateMonths[uid] || '6', 10);
    if (isNaN(months) || months <= 0) { showMessage('Enter valid months', 'error'); return; }
    setActionLoading(uid + '-activate');
    try {
      const res = await fetch('/api/admin/activate-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token! },
        body: JSON.stringify({ uid, months }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(`Paid subscription activated for ${months} month(s). Expires: ${new Date(data.currentPeriodEnd).toLocaleDateString()}`);
        await fetchSubscribers();
      } else showMessage(data.error || 'Failed to activate subscription', 'error');
    } catch { showMessage('Network error', 'error'); }
    finally { setActionLoading(null); }
  };

  const formatDate = (ts: number | null) => {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (s: SubscriberRecord) => {
    const now = Date.now();
    if (s.isPremium && s.status === 'active') return { label: 'Paid / Active', cls: 'bg-green-500/20 text-green-400 border border-green-500/30' };
    if (s.adminGrantedFreeUntil && s.adminGrantedFreeUntil > now) {
      if (s.adminGrantedFreeUntil > new Date('2090-01-01').getTime()) return { label: 'Forever Free', cls: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' };
      return { label: 'Admin Grant', cls: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' };
    }
    if (s.status === 'trialing' && s.trialEndDate && s.trialEndDate > now) {
      const days = Math.ceil((s.trialEndDate - now) / (24 * 60 * 60 * 1000));
      return { label: `Trial · ${days}d left`, cls: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' };
    }
    if (s.status === 'trialing' && s.trialEndDate && s.trialEndDate <= now) return { label: 'Trial Expired', cls: 'bg-red-500/20 text-red-400 border border-red-500/30' };
    if (s.status === 'canceled') return { label: 'Canceled', cls: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' };
    if (s.status === 'past_due') return { label: 'Past Due', cls: 'bg-red-500/20 text-red-400 border border-red-500/30' };
    if (s.status === 'none' || !s.status) return { label: 'No Access', cls: 'bg-gray-500/20 text-gray-500 border border-gray-600/30' };
    return { label: s.status.charAt(0).toUpperCase() + s.status.slice(1), cls: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' };
  };

  const stats = {
    total: subscribers.length,
    paid: subscribers.filter(s => s.isPremium && s.status === 'active').length,
    trial: subscribers.filter(s => s.status === 'trialing' && s.trialEndDate && s.trialEndDate > Date.now()).length,
    trialExpired: subscribers.filter(s => s.status === 'trialing' && s.trialEndDate && s.trialEndDate <= Date.now()).length,
    adminGrant: subscribers.filter(s => s.adminGrantedFreeUntil && s.adminGrantedFreeUntil > Date.now()).length,
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
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
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
          <a href="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
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
      {message.text && (
        <div className={`border-b px-6 py-3 flex items-center justify-between ${message.type === 'error' ? 'bg-red-900/30 border-red-800' : 'bg-green-900/30 border-green-800'}`}>
          <span className={`text-sm ${message.type === 'error' ? 'text-red-300' : 'text-green-300'}`}>{message.text}</span>
          <button onClick={() => setMessage({ text: '', type: 'success' })} className="text-gray-400 hover:text-gray-200 text-lg leading-none ml-4">&times;</button>
        </div>
      )}

      <main className="p-6">
        {/* QR Payment Notice */}
        <div className="bg-orange-900/20 border border-orange-700/40 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-orange-400 text-lg mt-0.5">&#9432;</span>
          <div>
            <p className="text-orange-300 text-sm font-semibold mb-1">QR / Manual Payment Activation</p>
            <p className="text-orange-200/80 text-xs leading-relaxed">
              When a user pays via VietQR bank transfer, use the <strong className="text-orange-200">Activate Paid</strong> button on their row to grant them a paid subscription.
              Set the number of months to match what they paid for (default 6 months = 500,000 ₫).
              This immediately sets their account to <strong className="text-orange-200">Active / Premium</strong> in Firestore.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total Users', value: stats.total, color: 'text-white' },
            { label: 'Paid / Active', value: stats.paid, color: 'text-green-400' },
            { label: 'On Trial', value: stats.trial, color: 'text-amber-400' },
            { label: 'Trial Expired', value: stats.trialExpired, color: 'text-red-400' },
            { label: 'Admin Grant', value: stats.adminGrant, color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscribers Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Users ({subscribers.length})</h2>
            <span className="text-xs text-gray-500">Persists across server restarts · updates on each user login</span>
          </div>

          {subscribers.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              {loading ? 'Loading users from Firebase…' : 'No users yet. They appear here when they first log in.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs">
                    <th className="text-left px-4 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Trial End</th>
                    <th className="text-left px-4 py-3 font-medium">Paid Until</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map(sub => {
                    const badge = getStatusBadge(sub);
                    return (
                      <tr key={sub.uid} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        {/* User */}
                        <td className="px-4 py-4">
                          <div className="font-medium text-white truncate max-w-[200px]" title={sub.email || sub.uid}>
                            {sub.displayName || sub.email || 'Anonymous'}
                          </div>
                          {sub.email && sub.displayName && (
                            <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{sub.email}</div>
                          )}
                          <div className="text-xs text-gray-600 mt-0.5 font-mono">{sub.uid.slice(0, 14)}…</div>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Trial End */}
                        <td className="px-4 py-4 text-gray-300 text-xs">{formatDate(sub.trialEndDate)}</td>

                        {/* Paid Until (currentPeriodEnd or adminGrantedFreeUntil) */}
                        <td className="px-4 py-4 text-gray-300 text-xs">
                          {formatDate(sub.currentPeriodEnd || sub.adminGrantedFreeUntil)}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            {/* Activate Paid — primary action for QR payments */}
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="1"
                                max="24"
                                value={activateMonths[sub.uid] || '6'}
                                onChange={e => setActivateMonths(prev => ({ ...prev, [sub.uid]: e.target.value }))}
                                className="w-12 bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                                data-testid={`input-activate-months-${sub.uid}`}
                                title="Months"
                              />
                              <span className="text-gray-500 text-xs">mo</span>
                              <button
                                onClick={() => activatePaid(sub.uid)}
                                disabled={actionLoading === sub.uid + '-activate'}
                                className="px-2 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded transition-colors disabled:opacity-50 whitespace-nowrap font-semibold"
                                data-testid={`button-activate-paid-${sub.uid}`}
                                title="Activate paid subscription (for QR / bank transfer payments)"
                              >
                                {actionLoading === sub.uid + '-activate' ? '…' : 'Activate Paid'}
                              </button>
                            </div>

                            {/* Extend Trial */}
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="1"
                                max="365"
                                value={extendDays[sub.uid] || '7'}
                                onChange={e => setExtendDays(prev => ({ ...prev, [sub.uid]: e.target.value }))}
                                className="w-12 bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                data-testid={`input-extend-days-${sub.uid}`}
                                title="Days"
                              />
                              <span className="text-gray-500 text-xs">d</span>
                              <button
                                onClick={() => extendTrial(sub.uid)}
                                disabled={actionLoading === sub.uid + '-extend'}
                                className="px-2 py-1 bg-amber-700 hover:bg-amber-600 text-white text-xs rounded transition-colors disabled:opacity-50 whitespace-nowrap"
                                data-testid={`button-extend-trial-${sub.uid}`}
                                title="Extend trial"
                              >
                                {actionLoading === sub.uid + '-extend' ? '…' : '+Trial'}
                              </button>
                              <button
                                onClick={() => grantFreeMonth(sub.uid)}
                                disabled={actionLoading === sub.uid + '-grant'}
                                className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:opacity-50 whitespace-nowrap"
                                data-testid={`button-grant-month-${sub.uid}`}
                                title="Grant 30 days free access"
                              >
                                {actionLoading === sub.uid + '-grant' ? '…' : 'Grant 30d'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
