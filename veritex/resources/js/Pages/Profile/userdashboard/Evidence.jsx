import React, { useState, useEffect } from 'react';
import { Shield, Lock, UploadCloud, CheckCircle, Eye, Link, FileText, Image, Video, Mic, Upload, Camera, StopCircle, BadgeCheck, Clock, Download, Trash2, File } from 'lucide-react';
import { CASES } from './data/mockData';
import { Card } from './components/SharedUI';


export default function EvidenceView() {
  const [recording, setRecording] = useState(false);
  const [recType, setRecType] = useState(null);
  const [recTime, setRecTime] = useState(0);
  const [uploads, setUploads] = useState([
    { name: 'title_deed_scan.pdf', type: 'document', size: '2.1 MB', date: 'Jan 15', case: 'KE-2026-4902', hash: '8d969eef...adc6c92', verified: true },
    { name: 'site_photo_boundary.jpg', type: 'photo', size: '3.4 MB', date: 'Jan 15', case: 'KE-2026-4902', hash: '4e07408b...a37d3', verified: true },
    { name: 'witness_statement.mp4', type: 'video', size: '48.2 MB', date: 'Mar 3', case: 'KE-2026-4902', hash: 'e10adc39...5fb5', verified: true },
    { name: 'payslip_march.jpg', type: 'photo', size: '512 KB', date: 'Feb 20', case: 'KE-2026-3117', hash: '5f4dcc3b...d6e8', verified: true },
    { name: 'email_thread.pdf', type: 'document', size: '1.8 MB', date: 'Feb 20', case: 'KE-2026-3117', hash: '098f6bcd...4621d', verified: false },
    { name: 'audio_recording.mp3', type: 'audio', size: '8.7 MB', date: 'May 1', case: 'KE-2026-3117', hash: null, verified: false },
  ]);

  const typeIcon = { document: FileText, photo: Image, video: Video, audio: Mic };
  const typeColor = { document: 'text-blue-400 bg-blue-500/10 border-blue-500/20', photo: 'text-green-400 bg-green-500/10 border-green-500/20', video: 'text-red-400 bg-red-500/10 border-red-500/20', audio: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };

  useEffect(() => {
    let t;
    if (recording) { t = setInterval(() => setRecTime(s => s + 1), 1000); }
    else { setRecTime(0); }
    return () => clearInterval(t);
  }, [recording]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const stopRec = () => {
    setRecording(false);
    if (recType) {
      const newFile = { name: `${recType}_recording_${Date.now()}.${recType === 'video' ? 'mp4' : 'mp3'}`, type: recType, size: '~' + Math.round(recTime * 0.5) + ' KB', date: 'Just now', case: 'KE-2026-4902', hash: null, verified: false };
      setUploads(u => [newFile, ...u]);
      setRecType(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      {/* Upload row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* File upload */}
        <label className="cursor-pointer group">
          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#D4AF37]/40 bg-white/2 hover:bg-[#D4AF37]/4 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
              <Upload style={{ width: 18, height: 18 }} className="text-[#D4AF37]" />
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold">Upload File</p>
              <p className="text-white/30 text-[10px]">PDF, DOCX, images</p>
            </div>
          </div>
          <input type="file" className="hidden" />
        </label>

        {/* Photo capture */}
        <button className="group" onClick={() => { alert('Camera access would open here'); }}>
          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-green-500/40 bg-white/2 hover:bg-green-500/4 transition-all h-full">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Camera style={{ width: 18, height: 18 }} className="text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold">Take Photo</p>
              <p className="text-white/30 text-[10px]">Capture evidence</p>
            </div>
          </div>
        </button>

        {/* Audio record */}
        <button onClick={() => { if (recording && recType === 'audio') { stopRec(); } else { setRecType('audio'); setRecording(true); } }}
          className={`group transition-all`}>
          <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed h-full transition-all ${recording && recType === 'audio' ? 'border-red-500/60 bg-red-500/8 animate-pulse' : 'border-white/10 hover:border-purple-500/40 bg-white/2 hover:bg-purple-500/4'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${recording && recType === 'audio' ? 'bg-red-500/30 border-red-500' : 'bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20'}`}>
              {recording && recType === 'audio' ? <StopCircle style={{ width: 18, height: 18 }} className="text-red-400" /> : <Mic style={{ width: 18, height: 18 }} className="text-purple-400" />}
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold">{recording && recType === 'audio' ? 'Stop Recording' : 'Record Audio'}</p>
              <p className={`text-[10px] ${recording && recType === 'audio' ? 'text-red-400 font-bold' : 'text-white/30'}`}>
                {recording && recType === 'audio' ? `🔴 ${fmt(recTime)}` : 'Voice statement'}
              </p>
            </div>
          </div>
        </button>

        {/* Video record */}
        <button onClick={() => { if (recording && recType === 'video') { stopRec(); } else { setRecType('video'); setRecording(true); } }}
          className="group">
          <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed h-full transition-all ${recording && recType === 'video' ? 'border-red-500/60 bg-red-500/8 animate-pulse' : 'border-white/10 hover:border-red-500/40 bg-white/2 hover:bg-red-500/4'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${recording && recType === 'video' ? 'bg-red-500/30 border-red-500' : 'bg-red-500/10 border-red-500/20 group-hover:bg-red-500/20'}`}>
              {recording && recType === 'video' ? <StopCircle style={{ width: 18, height: 18 }} className="text-red-400" /> : <Video style={{ width: 18, height: 18 }} className="text-red-400" />}
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold">{recording && recType === 'video' ? 'Stop Recording' : 'Record Video'}</p>
              <p className={`text-[10px] ${recording && recType === 'video' ? 'text-red-400 font-bold' : 'text-white/30'}`}>
                {recording && recType === 'video' ? `🔴 ${fmt(recTime)}` : 'Video evidence'}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Hash info */}
      <Card className="flex items-center gap-4 px-5 py-4">
        <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
          <Lock style={{ width: 16, height: 16 }} className="text-[#D4AF37]" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">Blockchain-Anchored Evidence Chain</p>
          <p className="text-white/35 text-xs">Every uploaded file is SHA-256 hashed and anchored to an immutable ledger — making evidence tamper-evident for court submission.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
          <CheckCircle style={{ width: 12, height: 12 }} className="text-green-400" />
          <span className="text-green-400 text-[10px] font-bold">Court-admissible</span>
        </div>
      </Card>

      {/* Evidence list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">Evidence Vault <span className="text-white/25 font-normal">({uploads.length} items)</span></h2>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-white/40 text-xs outline-none">
              <option>All Cases</option>
              {CASES.map(c => <option key={c.id}>{c.id}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          {uploads.map((ev, i) => {
            const Icon = typeIcon[ev.type] || File;
            const colors = typeColor[ev.type] || 'text-white/40 bg-white/5 border-white/10';
            return (
              <Card key={i} className="flex items-center gap-4 px-5 py-4 hover:border-white/14 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${colors}`}>
                  <Icon style={{ width: 16, height: 16 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{ev.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-white/25 text-[10px] font-mono">{ev.case}</span>
                    <span className="text-white/20 text-[10px]">{ev.size}</span>
                    <span className="text-white/20 text-[10px]">{ev.date}</span>
                  </div>
                  {ev.hash && (
                    <p className="text-[10px] text-white/15 font-mono mt-0.5">SHA-256: {ev.hash}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {ev.verified ? (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                      <BadgeCheck style={{ width: 11, height: 11 }} className="text-green-400" />
                      <span className="text-green-400 text-[10px] font-bold">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Clock style={{ width: 11, height: 11 }} className="text-amber-400" />
                      <span className="text-amber-400 text-[10px] font-bold">Processing</span>
                    </div>
                  )}
                  <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Download style={{ width: 14, height: 14 }} className="text-white/40" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 flex items-center justify-center transition-colors">
                    <Trash2 style={{ width: 14, height: 14 }} className="text-white/20 hover:text-red-400" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

