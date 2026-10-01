import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QianniuWorkstation from './components/QianniuWorkstation';
import Workstation from './components/Workstation';
import RiskRadar from './components/RiskRadar';
import AlgorithmBenchmark from './components/AlgorithmBenchmark';
import MultimodalVisionModal from './components/MultimodalVisionModal';
import TicketModal from './components/TicketModal';
import { SCENARIOS, USER_PROFILES } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('qianniu'); // 'qianniu' | 'workstation' | 'risk_radar' | 'benchmark'
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [messages, setMessages] = useState(SCENARIOS[0].initialMessages);
  const [toolExecuted, setToolExecuted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Load user profile based on scenario
  const userProfile = USER_PROFILES[selectedScenario.userKey] || USER_PROFILES.miao;

  // Reset when changing scenario
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setMessages(scenario.initialMessages);
    setToolExecuted(false);
    setIsAutoPlaying(false);
  };

  const handleSelectScenarioById = (id) => {
    const found = SCENARIOS.find(s => s.id === id);
    if (found) handleSelectScenario(found);
  };

  // Reset current scenario
  const handleReset = () => {
    setMessages(selectedScenario.initialMessages);
    setToolExecuted(false);
    setIsAutoPlaying(false);
  };

  // User manually sends a message
  const handleSendMessage = (text) => {
    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'agent',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Customer sends followup (e.g. sending skin photo)
  const handleSendFollowup = () => {
    if (!selectedScenario.userFollowup) return;
    setMessages(prev => [...prev, selectedScenario.userFollowup]);
  };

  // Adopt AI empathy reply
  const handleAdoptReply = (content) => {
    handleSendMessage(content);
  };

  // Execute Agent Tool Action
  const handleExecuteTool = () => {
    setToolExecuted(true);
    setIsTicketModalOpen(true);
  };

  // Switch to customer from Risk Radar
  const handleSwitchToCustomer = (scenarioId) => {
    const found = SCENARIOS.find(s => s.id === scenarioId);
    if (found) {
      handleSelectScenario(found);
      setCurrentTab('qianniu');
    }
  };

  // 🎬 Auto-Play Showcase Runner (Killer feature for screen recording!)
  const handleAutoPlay = () => {
    if (isAutoPlaying) return;
    setIsAutoPlaying(true);
    if (currentTab !== 'qianniu' && currentTab !== 'workstation') {
      setCurrentTab('qianniu');
    }
    setMessages(selectedScenario.initialMessages);
    setToolExecuted(false);

    // Step 1: Wait 1.2s -> User sends the photo
    setTimeout(() => {
      if (selectedScenario.userFollowup) {
        setMessages(prev => [...prev, selectedScenario.userFollowup]);
      }

      // Step 2: Wait 2.0s -> Customer service adopts top empathy reply
      setTimeout(() => {
        const topReply = selectedScenario.empathyReplies[0].content;
        const agentMsg = {
          id: `m_auto_${Date.now()}`,
          sender: 'agent',
          text: topReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentMsg]);

        // Step 3: Wait 2.2s -> Auto-trigger tool execution (closing ticket)
        setTimeout(() => {
          setToolExecuted(true);
          setIsTicketModalOpen(true);
          setIsAutoPlaying(false);
        }, 2200);

      }, 2000);

    }, 1200);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0B0F19] text-gray-100 overflow-hidden">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        scenarios={SCENARIOS}
        selectedScenario={selectedScenario}
        onSelectScenario={handleSelectScenario}
        onAutoPlay={handleAutoPlay}
        isAutoPlaying={isAutoPlaying}
        onReset={handleReset}
      />

      {/* Main View Router */}
      <main className="flex-1 flex overflow-hidden">
        {/* Tab 1: Qianniu 1:1 Workbench with Right-side Plugin */}
        {currentTab === 'qianniu' && (
          <QianniuWorkstation
            scenario={selectedScenario}
            userProfile={userProfile}
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendFollowup={handleSendFollowup}
            onAdoptReply={handleAdoptReply}
            onExecuteTool={handleExecuteTool}
            toolExecuted={toolExecuted}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
            onSelectScenarioById={handleSelectScenarioById}
          />
        )}

        {/* Tab 2: Full Geek Workstation */}
        {currentTab === 'workstation' && (
          <Workstation
            scenario={selectedScenario}
            userProfile={userProfile}
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendFollowup={handleSendFollowup}
            onAdoptReply={handleAdoptReply}
            onExecuteTool={handleExecuteTool}
            toolExecuted={toolExecuted}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
          />
        )}

        {/* Tab 3: Risk Radar */}
        {currentTab === 'risk_radar' && (
          <RiskRadar 
            onSwitchToCustomer={handleSwitchToCustomer}
          />
        )}

        {/* Tab 4: Benchmark */}
        {currentTab === 'benchmark' && (
          <AlgorithmBenchmark />
        )}
      </main>

      {/* Modals */}
      <MultimodalVisionModal
        isOpen={isVisionModalOpen}
        onClose={() => setIsVisionModalOpen(false)}
        scenario={selectedScenario}
      />

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        toolAction={selectedScenario.toolUseAction}
        userProfile={userProfile}
      />
    </div>
  );
}
