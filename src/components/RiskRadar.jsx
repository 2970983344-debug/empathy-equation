import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Clock, 
  Users, 
  ArrowUpRight, 
  ShieldCheck,
  Flame,
  Filter,
  Check,
  RotateCw
} from 'lucide-react';
import { RISK_MONITOR_STATS } from '../data/mockData';

export default function RiskRadar({ onSwitchToCustomer }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [risks, setRisks] = useState(RISK_MONITOR_STATS.recentRisks);
  const [actionDoneId, setActionDoneId] = useState(null);

  const handleResolve = (id) => {
    setActionDoneId(id);
    setTimeout(() => {
      setRisks(prev => prev.map(r => r.id === id ? { ...r, status: '主管已介入并闭环', level: 'GREEN' } : r));
      setActionDoneId(null);
    }, 800);
  };

  const filteredRisks = filterLevel === 'ALL' 
    ? risks 
    : risks.filter(r => r.level === filterLevel);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6 h-[calc(100vh-65px)]">
      {/* Top Banner: Real-time Cockpit Metrics */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-[#111827] border border-gray-800 p-4 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>全量并发会话</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {RISK_MONITOR_STATS.activeSessions}
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> 峰值负载平稳
          </span>
        </div>

        <div className="bg-red-950/20 border border-red-500/40 p-4 rounded-2xl relative overflow-hidden shadow-lg shadow-red-900/10">
          <div className="flex justify-between items-center text-xs text-red-300 mb-1">
            <span>红色高危 (舆情/过敏)</span>
            <Flame className="w-4 h-4 text-red-400 animate-bounce" />
          </div>
          <div className="text-2xl font-black font-mono text-red-400">
            {RISK_MONITOR_STATS.highRiskCount} 起
          </div>
          <span className="text-[10px] text-red-300/80 mt-1 block">毫秒级事中拦截</span>
        </div>

        <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-xs text-amber-300 mb-1">
            <span>黄色中危 (反复催进线)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-300">
            {RISK_MONITOR_STATS.mediumRiskCount} 起
          </div>
          <span className="text-[10px] text-amber-300/80 mt-1 block">排查物流延误</span>
        </div>

        <div className="bg-blue-950/20 border border-blue-500/30 p-4 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-xs text-blue-300 mb-1">
            <span>蓝色潜在 (退款异常)</span>
            <ShieldAlert className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-300">
            {RISK_MONITOR_STATS.lowRiskCount} 起
          </div>
          <span className="text-[10px] text-blue-300/80 mt-1 block">羊毛党防刷拦截</span>
        </div>

        <div className="bg-[#111827] border border-pink-500/30 p-4 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-xs text-pink-300 mb-1">
            <span>全域平均共感指数</span>
            <Zap className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black font-mono bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {RISK_MONITOR_STATS.empathyScoreAvg}
          </div>
          <span className="text-[10px] text-pink-300/80 mt-1 block">高于行业均值 26%</span>
        </div>

        <div className="bg-[#111827] border border-emerald-500/30 p-4 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-xs text-emerald-300 mb-1">
            <span>工单自动化闭环率</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {RISK_MONITOR_STATS.autoResolvingRate}
          </div>
          <span className="text-[10px] text-emerald-300/80 mt-1 block">人机协同高效处置</span>
        </div>
      </div>

      {/* Middle Section: Risk Distribution & Visual Comparison */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Exception Distribution Chart */}
        <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-200 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-pink-400" />
              美妆异常风险类型分布 (Risk Types)
            </h3>
            <p className="text-xs text-gray-400 mb-4">基于多源工单与 NLP 聚类深度统计</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">敏肌致敏与接触性红斑 (视觉优先)</span>
                  <span className="font-mono text-red-400 font-bold">42% (首位)</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full w-[42%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">大促物流超48h滞留与催单</span>
                  <span className="font-mono text-amber-400 font-bold">28%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full w-[28%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">快递包装挤压与粉饼碎裂破损</span>
                  <span className="font-mono text-purple-400 font-bold">18%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[18%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">黑灰产高频仅退款异常行为</span>
                  <span className="font-mono text-blue-400 font-bold">12%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[12%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-gray-950/60 border border-gray-800/80 text-[11px] text-gray-400 flex items-center justify-between">
            <span>事中处置闭环平均耗时：</span>
            <span className="text-emerald-400 font-bold font-mono">从 8.5分钟 缩减至 32秒</span>
          </div>
        </div>

        {/* Right 2 cols: Real-time Risk Stream & Supervisor Dispatch Table */}
        <div className="col-span-2 bg-[#111827] border border-gray-800 p-5 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                实时高危风险处置队列 (Real-time Mitigation Queue)
              </h3>
              <p className="text-xs text-gray-400">支持风险态势下钻、督导直接接管与一键特批</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800">
              {['ALL', 'RED', 'YELLOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all ${
                    filterLevel === lvl
                      ? 'bg-gray-800 text-white shadow'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {lvl === 'ALL' ? '全部' : lvl === 'RED' ? '🔴 红色高危' : '🟡 黄色中危'}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-[11px]">
                  <th className="pb-2.5 font-medium">风险级别</th>
                  <th className="pb-2.5 font-medium">进线客户</th>
                  <th className="pb-2.5 font-medium">异常类型与AI触发归因</th>
                  <th className="pb-2.5 font-medium">处置状态</th>
                  <th className="pb-2.5 font-medium text-right">处置动作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredRisks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.level === 'RED'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                          : item.level === 'YELLOW'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {item.level === 'RED' ? '高危 RED' : item.level === 'YELLOW' ? '中危 YELLOW' : '已解决'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-gray-200">{item.user}</div>
                      <div className="text-[10px] text-gray-500">{item.channel}</div>
                    </td>
                    <td className="py-3 max-w-xs">
                      <div className="font-medium text-pink-300">{item.type}</div>
                      <div className="text-[10px] text-gray-400 truncate">{item.trigger}</div>
                    </td>
                    <td className="py-3">
                      <span className="text-[11px] text-gray-300">{item.status}</span>
                      <div className="text-[10px] text-gray-500">{item.time}</div>
                    </td>
                    <td className="py-3 text-right">
                      {item.level !== 'GREEN' ? (
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => onSwitchToCustomer(item.user.includes('喵') ? 'official_allergy_s00010' : item.user.includes('邓') ? 'official_broken_s00001' : 'official_risk_s00024')}
                            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-2 py-1 rounded text-[11px] font-medium transition-colors"
                          >
                            穿透视窗
                          </button>
                          <button
                            onClick={() => handleResolve(item.id)}
                            disabled={actionDoneId === item.id}
                            className="bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-all shadow shadow-red-500/20"
                          >
                            {actionDoneId === item.id ? '审批中...' : '主管特批闭环'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5" /> 已处置完成
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
