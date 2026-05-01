import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './Overview';
import CasesView from './MyCases';
import AIView from './AIAssistant';
import MessagesView from './Messages';
import PaymentsView from './Payments';
import DocumentsView from './Documents';
import EvidenceView from './Evidence';
import MapView from './Map';

const VIEW_META = {
  overview: { title: 'Good morning, John', subtitle: 'Here\'s what\'s happening with your cases today' },
  cases: { title: 'My Cases', subtitle: 'Manage and track all your active legal matters' },
  ai: { title: 'AI Legal Assistant', subtitle: 'Ask any question — Constitution, statutes, case law' },
  messages: { title: 'Messages', subtitle: 'Encrypted communication with your advocates' },
  payments: { title: 'Payments & Fees', subtitle: 'Milestone-protected escrow payments' },
  documents: { title: 'Documents', subtitle: 'AI-generated and uploaded legal documents' },
  evidence: { title: 'Evidence Vault', subtitle: 'Encrypted, blockchain-anchored evidence storage' },
  map: { title: 'Courts & Police Stations', subtitle: 'Nairobi legal infrastructure — locations & directions' },
};

export default function Dashboard({ auth }) {
  const [active, setActive] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const meta = VIEW_META[active];

  const renderView = () => {
    switch (active) {
      case 'overview': return <OverviewView setActive={setActive} />;
      case 'cases': return <CasesView />;
      case 'ai': return <AIView />;
      case 'messages': return <MessagesView />;
      case 'payments': return <PaymentsView />;
      case 'documents': return <DocumentsView />;
      case 'evidence': return <EvidenceView />;
      case 'map': return <MapView />;
      default: return <OverviewView setActive={setActive} />;
    }
  };

  const fullHeight = ['cases', 'ai', 'messages', 'map'].includes(active);

  return (
    <>
      <Head title="Veritex Dashboard" />
      <div className="flex h-screen bg-[#0d0f18] text-white overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={meta.title} subtitle={meta.subtitle} active={active} />
          <main className={`flex-1 ${fullHeight ? 'overflow-hidden' : 'overflow-y-auto'}`}>
            {renderView()}
          </main>
        </div>
      </div>
    </>
  );
}
