import React from 'react';
import { ShieldAlert, Cpu, Play, RotateCcw, Monitor, ShoppingBag } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  scenarios, 
  selectedScenario, 
  onSelectScenario, 
  onAutoPlay, 
  isAutoPlaying,
  onReset
}) {
  return (
    <header className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-[#1875F0] flex items-center justify-center text-white font-bold text-xs shadow-sm">
          共
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-gray-800">
              共感方程式 · 智能客服系统
            </h1>
            <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-100">
              Qwen2.5 驱动
            </span>
          </div>
          <p className="text-[10px] text-gray-400">
            2026 欧莱雅美妆科技黑客松 · 赛题一：数据共情者
          </p>
        </div>
      </div>

      {/* Primary Tab Navigation (Clean Minimalist Pills) */}
      <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
        {/* Qianniu 1:1 Plugin Mode */}
        <button
          onClick={() => setCurrentTab('qianniu')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            currentTab === 'qianniu'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
          千牛工作台插件
        </button>

        {/* Full Geek Workstation Mode */}
        <button
          onClick={() => setCurrentTab('workstation')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            currentTab === 'workstation'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 text-gray-600" />
          全景科技工作台
        </button>

        {/* Risk Radar */}
        <button
          onClick={() => setCurrentTab('risk_radar')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            currentTab === 'risk_radar'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          全域风险预警雷达
        </button>

        {/* Algorithm & Benchmark */}
        <button
          onClick={() => setCurrentTab('benchmark')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            currentTab === 'benchmark'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-purple-600" />
          算法与成本优化
        </button>
      </div>

      {/* Scenario Controller & Demo Bar */}
      <div className="flex items-center gap-2">
        {/* Scenario Selector */}
        <select
          value={selectedScenario.id}
          onChange={(e) => {
            const found = scenarios.find(s => s.id === e.target.value);
            if (found) onSelectScenario(found);
          }}
          className="bg-gray-50 text-xs text-gray-700 border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-blue-500 cursor-pointer"
        >
          {scenarios.map(s => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        {/* Auto-play Showcase Button */}
        <button
          onClick={onAutoPlay}
          disabled={isAutoPlaying}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
            isAutoPlaying
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : 'bg-[#1875F0] hover:bg-blue-600 text-white'
          }`}
          title="点击后系统将自动模拟打字、发图与工单流转，方便录屏"
        >
          <Play className="w-3 h-3 fill-current" />
          {isAutoPlaying ? '演练中...' : '录屏演练'}
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="重置当前场景"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
