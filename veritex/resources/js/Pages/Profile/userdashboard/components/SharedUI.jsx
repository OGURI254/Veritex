import React from 'react';

export const StatusPill = ({ status }) => {
  const map = {
    active: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    concluded: 'bg-green-500/15 text-green-400 border-green-500/25',
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    urgent: 'bg-red-500/15 text-red-400 border-red-500/25',
  };
  const label = { active: 'Active', concluded: 'Concluded', pending: 'Pending', urgent: 'Urgent' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-blue-400 animate-pulse' : status === 'concluded' ? 'bg-green-400' : 'bg-amber-400'}`} />
      {label[status]}
    </span>
  );
};

export const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-white/8 bg-[#1a1d2e]/70 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

export const Avatar = ({ initials, color, size = 'md' }) => {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-black border flex-shrink-0`}
      style={{ background: color + '22', borderColor: color + '40', color }}>
      {initials}
    </div>
  );
};

export const ProgressRing = ({ pct, size = 56, stroke = 4, color = '#D4AF37' }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
};
