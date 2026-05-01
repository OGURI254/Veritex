import React, { useState } from 'react';
import { Wallet, CreditCard, ArrowUpRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { PAYMENTS } from './data/mockData';
import { Card } from './components/SharedUI';


export default function PaymentsView() {
  const [mpesaOpen, setMpesaOpen] = useState(false);
  const [mpesaStep, setMpesaStep] = useState(0);
  const [phone, setPhone] = useState('');

  const triggerMpesa = () => {
    setMpesaStep(1);
    setTimeout(() => setMpesaStep(2), 2000);
    setTimeout(() => setMpesaStep(3), 4500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Legal Fees', value: 'KES 130,000', icon: CreditCard, color: '#D4AF37' },
          { label: 'Total Paid', value: 'KES 64,500', icon: CheckCircle, color: '#10B981' },
          { label: 'Outstanding Balance', value: 'KES 65,500', icon: Clock, color: '#6366F1' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon style={{ width: 15, height: 15, color }} />
              <p className="text-white/35 text-xs">{label}</p>
            </div>
            <p className="text-white font-black text-xl" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
          </Card>
        ))}
      </div>

      {/* Cases payment plans */}
      {PAYMENTS.map((pay, pi) => {
        const pct = Math.round((pay.paid / pay.total) * 100);
        const nextDue = pay.milestones.find(m => m.active);
        return (
          <Card key={pi} className="overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/30 font-mono mb-0.5">{pay.caseId}</p>
                <p className="text-white font-semibold text-sm">{pay.label}</p>
              </div>
              <div className="text-right">
                <p className="text-[#D4AF37] font-black text-lg">KES {(pay.paid / 1000).toFixed(1)}K <span className="text-white/25 text-sm font-normal">/ {(pay.total / 1000).toFixed(1)}K</span></p>
                <div className="w-32 h-1.5 rounded-full bg-white/8 overflow-hidden mt-1">
                  <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Milestone visual */}
              <div className="flex items-center gap-0 mb-6 relative">
                <div className="absolute left-[12.5%] right-[12.5%] top-4 h-0.5 bg-white/8 z-0" />
                {pay.milestones.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${m.paid ? 'bg-green-500/20 border-green-500' : m.active ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : 'bg-white/5 border-white/15'}`}>
                      {m.paid ? <CheckCircle style={{ width: 14, height: 14 }} className="text-green-400" /> :
                        m.active ? <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" /> :
                          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />}
                    </div>
                    <p className={`text-[10px] font-semibold text-center ${m.paid ? 'text-green-400' : m.active ? 'text-[#D4AF37]' : 'text-white/25'}`}>{m.label}</p>
                    <p className={`text-[9px] text-center ${m.paid ? 'text-green-400/60' : m.active ? 'text-[#D4AF37]/60' : 'text-white/15'}`}>
                      {m.pct}% · KES {(m.amount / 1000).toFixed(1)}K
                    </p>
                    {(m.paid || m.active) && (
                      <p className="text-[9px] text-white/20">{m.paid ? m.date : m.due}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Escrow note + Pay button */}
              {nextDue && (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/4">
                  <div className="flex-1">
                    <p className="text-[#D4AF37] font-bold text-sm">Next Payment Due: {nextDue.due}</p>
                    <p className="text-white/40 text-xs mt-0.5">KES {nextDue.amount.toLocaleString()} · {nextDue.label} milestone · Held in escrow</p>
                  </div>
                  <button onClick={() => setMpesaOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black transition-all whitespace-nowrap shadow-lg shadow-[#D4AF37]/20">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/120px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-4 object-contain" onError={e => e.target.style.display = 'none'} />
                    Pay via M-Pesa
                  </button>
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {/* Transaction history */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h3 className="text-white font-semibold text-sm">Transaction History</h3>
        </div>
        <div className="divide-y divide-white/4">
          {[
            { desc: 'Filing Fee — KE-2026-3117', amount: '-KES 13,500', date: 'Feb 28, 2026', status: 'completed', ref: 'TXN928371' },
            { desc: 'Consultation — KE-2026-4902', amount: '-KES 25,500', date: 'Jan 14, 2026', status: 'completed', ref: 'TXN827634' },
            { desc: 'Consultation — KE-2026-4902', amount: '-KES 17,000', date: 'Jan 10, 2026', status: 'completed', ref: 'TXN819204' },
            { desc: 'Credit Top-up (500 credits)', amount: '-KES 1,000', date: 'Jan 5, 2026', status: 'completed', ref: 'TXN801193' },
          ].map(({ desc, amount, date, status, ref }, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle style={{ width: 14, height: 14 }} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white/75 text-xs font-medium">{desc}</p>
                  <p className="text-white/25 text-[10px] font-mono">{ref} · {date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-bold">{amount}</p>
                <p className="text-green-400 text-[10px] font-semibold">Confirmed</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* M-Pesa modal */}
      {mpesaOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#1a1d2e] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold">M-Pesa Payment</h3>
              <button onClick={() => { setMpesaOpen(false); setMpesaStep(0); setPhone(''); }} className="text-white/30 hover:text-white/60">
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            {mpesaStep === 0 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#D4AF37]/6 border border-[#D4AF37]/20">
                  <p className="text-white/50 text-xs mb-1">Amount</p>
                  <p className="text-[#D4AF37] text-2xl font-black">KES 25,500</p>
                  <p className="text-white/30 text-xs mt-1">Hearing milestone · KE-2026-4902</p>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">M-Pesa Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 0712 345 678"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-colors placeholder:text-white/20" />
                </div>
                <button onClick={triggerMpesa}
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] font-black transition-all">
                  Send M-Pesa Prompt
                </button>
                <p className="text-center text-[10px] text-white/20">Payments are held in escrow and released only on milestone confirmation</p>
              </div>
            )}
            {mpesaStep === 1 && (
              <div className="text-center py-6">
                <Loader style={{ width: 40, height: 40 }} className="text-[#D4AF37] animate-spin mx-auto mb-4" />
                <p className="text-white font-semibold">Sending STK Push...</p>
                <p className="text-white/40 text-xs mt-1">Check your phone for the M-Pesa prompt</p>
              </div>
            )}
            {mpesaStep === 2 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center mx-auto mb-4">
                  <Phone style={{ width: 28, height: 28 }} className="text-amber-400" />
                </div>
                <p className="text-white font-semibold">M-Pesa prompt sent</p>
                <p className="text-white/40 text-xs mt-1">Enter your M-Pesa PIN on your phone to confirm</p>
                <div className="flex gap-1.5 justify-center mt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            {mpesaStep === 3 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle style={{ width: 28, height: 28 }} className="text-green-400" />
                </div>
                <p className="text-white font-bold text-lg mb-1">Payment Confirmed!</p>
                <p className="text-green-400 text-sm font-semibold mb-1">KES 25,500 received</p>
                <p className="text-white/30 text-xs">Held in escrow · Released to advocate upon milestone confirmation</p>
                <button onClick={() => { setMpesaOpen(false); setMpesaStep(0); setPhone(''); }}
                  className="mt-5 px-6 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

