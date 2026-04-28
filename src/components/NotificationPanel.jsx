import React from 'react';
import { createPortal } from 'react-dom';
import { X, Bell, MessageSquare, CheckCircle, Clock, Inbox } from 'lucide-react';

const NotificationPanel = ({ notifications, onClose, onMarkRead, onMarkAllRead }) => {
  const unread = notifications.filter(n => n.status === 'pending');

  const panelContent = (
    <div className="fixed inset-0 z-[9998] flex justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#010816]/60 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-slate-900 border-l border-emerald-500/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="px-8 py-7 border-b border-emerald-500/10 flex items-center justify-between shrink-0 bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Bell size={22} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Notifications</h2>
              <p className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-widest">
                {unread.length > 0 ? `${unread.length} unread` : 'All caught up'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unread.length > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors border border-emerald-500/20 px-3 py-1.5 rounded-xl"
              >
                Mark All Read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all hover:rotate-90"
            >
              <X size={18} className="text-emerald-500/60" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-24 space-y-4">
              <div className="p-6 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                <Inbox size={40} className="text-emerald-500/30" />
              </div>
              <p className="text-emerald-500/30 font-bold uppercase tracking-widest text-xs">
                No notifications yet
              </p>
              <p className="text-emerald-500/20 text-xs max-w-[200px] leading-relaxed">
                Help requests and soul signals will appear here
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-5 rounded-3xl border transition-all group relative overflow-hidden cursor-pointer
                  ${notif.status === 'pending'
                    ? 'bg-emerald-500/5 border-emerald-500/20 shadow-lg shadow-emerald-900/20'
                    : 'bg-slate-800/30 border-white/5 opacity-60'
                  }`}
                onClick={() => notif.status === 'pending' && onMarkRead(notif.id)}
              >
                {/* Unread dot */}
                {notif.status === 'pending' && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                )}

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 ${
                    notif.type === 'help_request'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm truncate">{notif.fromName}</span>
                      <span className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-widest shrink-0">
                        {notif.type === 'help_request' ? 'Needs Help' : 'Signal'}
                      </span>
                    </div>
                    <p className="text-emerald-100/60 text-xs leading-relaxed line-clamp-3">
                      "{notif.message}"
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock size={11} className="text-emerald-500/30" />
                      <span className="text-[10px] text-emerald-500/30 font-medium">
                        {notif.createdAt?.toDate
                          ? notif.createdAt.toDate().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
                          : 'Just now'
                        }
                      </span>
                      {notif.status === 'read' && (
                        <CheckCircle size={11} className="text-emerald-500/40 ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-emerald-500/10 shrink-0 bg-slate-900/80 backdrop-blur">
          <p className="text-center text-[10px] font-bold text-emerald-500/20 uppercase tracking-widest">
            Soul Network · Real-time Sync Active
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(panelContent, document.body);
};

export default NotificationPanel;
