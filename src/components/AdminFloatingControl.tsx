import React from 'react';
import { ShieldCheck, Settings, LogOut } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminFloatingControl: React.FC = () => {
  const { isAdminLoggedIn, setIsAdminPanelOpen, logoutAdmin } = usePortfolio();

  if (!isAdminLoggedIn) return null;

  return (
    <div
      id="admin-floating-badge"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-md border border-slate-700/80 text-white shadow-xl animate-fadeIn no-print"
    >
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden sm:inline">Admin Mode</span>
      </div>

      <div className="h-4 w-px bg-slate-700 mx-1" />

      <button
        type="button"
        onClick={() => setIsAdminPanelOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-transform hover:scale-105"
      >
        <Settings className="w-3.5 h-3.5" />
        <span>Edit Portfolio</span>
      </button>

      <button
        type="button"
        onClick={logoutAdmin}
        title="Log out from admin"
        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};
