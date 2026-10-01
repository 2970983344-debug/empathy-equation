import React, { useState } from 'react';
import { 
  HeartPulse, 
  Eye, 
  Send, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Package, 
  FileText, 
  UserCheck, 
  Flame,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Workstation({
  scenario,
  userProfile,
  messages,
  onSendMessage,
  onSendFollowup,
  onAdoptReply,
  onExecuteTool,
  toolExecuted,
  onOpenVisionModal
}) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const latestMsg = messages[messages.length - 1];
  const hasUserImage = messages.some(m => m.image);

  return (
    <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden h-[calc(100vh-65px)]">
      {/* ======================================================== */}
      {/* COLUMN 1: 左侧仿真实时沟通视窗 (3.5 / 12) */}
      {/* ======================================================== */}
      <section className="col-span-4 bg-[#111827] rounded-2xl border border-gray-800 flex flex-col overflow-hidden shadow-xl">
        {/* Chat Header */}
        <div className="p-3.5 border-b border-gray-800 bg-gray-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500/50"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-gray-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-200">{userProfile.name}</span>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-1.5 py-0.5 rounded font-medium">
                  {userProfile.tier.split('·')[0]}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">进线通道：天猫官方自营客服工作台</p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            实时对话中
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center my-1">
            <span className="text-[10px] bg-gray-800/80 text-gray-400 px-3 py-1 rounded-full border border-gray-700/50">
              已自动跨系统载入该用户 360° 历史服务全轨迹
            </span>
          </div>

          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[11px] text-gray-400 font-medium">
                  {m.sender === 'user' ? userProfile.name : '人工客服 (您)'}
                </span>
                <span className="text-[10px] text-gray-500">{m.time}</span>
                {m.emotion && (
                  <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.2 rounded font-mono">
                    愤怒 {m.emotion.anger}% · 焦虑 {m.emotion.anxiety}%
                  </span>
                )}
              </div>

              <div 
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-md ${
                  m.sender === 'user'
                    ? 'bg-gray-800/90 text-gray-100 rounded-tl-sm border border-gray-700/60'
                    : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-tr-sm shadow-pink-500/10'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                {m.image && (
                  <div className="mt-2.5 relative group rounded-xl overflow-hidden border border-red-500/50 cursor-pointer" onClick={onOpenVisionModal}>
                    <img 
                      src={m.image} 
                      alt="用户发送的照片" 
                      className="w-full max-h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-[11px] font-bold text-white">查看 Qwen-VL 视觉诊断图层</span>
                    </div>
                    <span className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-sm flex items-center gap-1 shadow">
                      <Stethoscope className="w-3 h-3" />
                      Qwen-VL 已标定皮损红斑
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Follow-up Buttons (For testing/demo) */}
        {!hasUserImage && scenario.userFollowup && (
          <div className="p-2.5 bg-pink-950/20 border-t border-pink-900/30 flex items-center justify-between">
            <span className="text-[11px] text-pink-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
              模拟用户下一步动作：
            </span>
            <button
              onClick={onSendFollowup}
              className="text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              发送面部过敏照片
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t border-gray-800 bg-gray-900/40">
          <div className="flex gap-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入给用户的回复，或直接点击右侧推荐话术一键采纳..."
              className="flex-1 bg-gray-950 text-xs text-gray-200 placeholder-gray-500 px-3.5 py-2.5 rounded-xl border border-gray-700/60 focus:border-pink-500 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSend}
              className="bg-gray-800 hover:bg-pink-600 text-white px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-center"
              title="发送消息"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* COLUMN 2: 中间「共感方程式」动态计算与 Copilot 建议 (5 / 12) */}
      {/* ======================================================== */}
      <section className="col-span-5 bg-[#111827] rounded-2xl border border-gray-800 flex flex-col overflow-hidden shadow-xl">
        {/* Header: The Equation Bar */}
        <div className="p-3.5 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-[#161224] to-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wide">
                  共感方程式 · 动态解算流
                </h2>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/30">
                  E-Equation Engine
                </span>
              </div>
              <p className="text-[10px] text-gray-400">实时计算用户情绪张力、数据穿透因子与处置策略</p>
            </div>
          </div>

          {/* Equation Score Widget */}
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-xl border border-pink-500/30">
            <span className="text-[10px] text-gray-400">共感指数:</span>
            <span className="text-sm font-black font-mono bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              93.4 / 100
            </span>
          </div>
        </div>

        {/* Scrollable Copilot Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Equation Factor Matrix */}
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-gray-950/60 border border-gray-800">
            <div className="text-center p-1.5 rounded-lg bg-gray-900/50">
              <span className="text-[10px] text-gray-400 block">全域数据穿透度</span>
              <span className="text-xs font-bold font-mono text-emerald-400">98.5% (满格)</span>
            </div>
            <div className="text-center p-1.5 rounded-lg bg-gray-900/50">
              <span className="text-[10px] text-gray-400 block">情绪张力系数</span>
              <span className="text-xs font-bold font-mono text-red-400">89.2 (极危)</span>
            </div>
            <div className="text-center p-1.5 rounded-lg bg-gray-900/50">
              <span className="text-[10px] text-gray-400 block">多模态识别置信度</span>
              <span className="text-xs font-bold font-mono text-purple-400">
                {hasUserImage ? '94.6%' : '待输入图像'}
              </span>
            </div>
          </div>

          {/* Real-time Dynamic Emotion Heartbeat */}
          <div className="p-3 rounded-xl bg-gray-950/80 border border-red-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                <HeartPulse className="w-4 h-4 animate-pulse text-red-500" />
                <span>实时情绪心率感温仪 (Empathy Pulse)</span>
              </div>
              <span className="text-[10px] bg-red-500/20 text-red-300 font-mono px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                状态：高危焦躁 · 触发红色降温策略
              </span>
            </div>

            {/* Tension Bars */}
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                  <span>焦虑受损度 (皮肤刺痛/耽误重要行程)</span>
                  <span className="font-mono text-red-300 font-bold">89%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full w-[89%] transition-all duration-500"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                  <span>客诉舆情外溢风险 (小红书/12315倾向)</span>
                  <span className="font-mono text-amber-300 font-bold">82%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-rose-500 rounded-full w-[82%] transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Multimodal Vision & Ingredient RAG Card (Shown when image exists or scenario 1) */}
          {hasUserImage && scenario.visionAnalysis.hasImage && (
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-500/40 relative">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-purple-800/30">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-purple-500/20 rounded text-purple-300">
                    <Eye className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-purple-200">
                    Qwen2.5-VL 视觉病损定损报告
                  </span>
                </div>
                <button 
                  onClick={onOpenVisionModal}
                  className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-0.5"
                >
                  查看框选图层 <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 min-w-16">红斑诊断:</span>
                  <span className="text-gray-200 font-medium">{scenario.visionAnalysis.detection}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 min-w-16">严重等级:</span>
                  <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {scenario.visionAnalysis.severity}
                  </span>
                </div>
                <div className="bg-black/30 p-2.5 rounded-lg border border-purple-900/40 text-[11px] space-y-1">
                  <div className="text-pink-300 font-bold flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5" />
                    成分冲突排查 (Cosmetic RAG):
                  </div>
                  <p className="text-gray-300 leading-relaxed">{scenario.visionAnalysis.knowledgeRAG.cause}</p>
                  <p className="text-amber-300 leading-relaxed font-semibold">{scenario.visionAnalysis.knowledgeRAG.firstAid}</p>
                </div>
              </div>
            </div>
          )}

          {/* 3-Tier Empathy Reply Generation (核心亮点：三种温度话术，一键采纳) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-pink-500" />
                共感方程式 · 三级温度建议回复 (拒绝冰冷模板)
              </span>
              <span className="text-[10px] text-gray-500">点击卡片直接采纳并发送</span>
            </div>

            {scenario.empathyReplies.map((reply) => (
              <div 
                key={reply.id}
                className="group p-3 rounded-xl bg-gray-900/70 hover:bg-gray-800/90 border border-gray-800 hover:border-pink-500/60 transition-all cursor-pointer relative"
                onClick={() => onAdoptReply(reply.content)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {reply.temp} · {reply.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {reply.toneTag}
                    </span>
                  </div>
                  <button className="text-[11px] font-bold text-pink-400 group-hover:text-white group-hover:bg-pink-600 px-2.5 py-0.5 rounded-lg border border-pink-500/40 transition-all flex items-center gap-1">
                    一键采纳 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-gray-300 group-hover:text-gray-100 leading-relaxed">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>

          {/* Agent Tool-use 自动化动作流 (赛题核心考核：形成处置闭环) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-teal-950/30 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AI Agent 闭环处置求解器 (Tool-use Action)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                自动审批权限通过
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-gray-300 mb-3 bg-black/20 p-2.5 rounded-lg border border-emerald-900/30">
              <div className="flex justify-between">
                <span className="text-gray-400">求解方案:</span>
                <span className="font-semibold text-white">{scenario.toolUseAction.ticketTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">赔退处置:</span>
                <span className="font-mono text-emerald-400 font-bold">{scenario.toolUseAction.refundAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">安抚修护品:</span>
                <span className="font-medium text-pink-300">{scenario.toolUseAction.giftSku}</span>
              </div>
            </div>

            <button
              onClick={onExecuteTool}
              disabled={toolExecuted}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                toolExecuted
                  ? 'bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white shadow-emerald-500/20 active:scale-98'
              }`}
            >
              {toolExecuted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  已自动完成工单流转并下发顺丰寄样任务
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  一键执行【先行赔付 + 赠送舒缓修护样单】处置闭环
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* COLUMN 3: 右侧用户 360° 全轨迹穿透档案 (3.5 / 12) */}
      {/* ======================================================== */}
      <section className="col-span-3 bg-[#111827] rounded-2xl border border-gray-800 flex flex-col overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-3.5 border-b border-gray-800 bg-gray-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-pink-400" />
            <h2 className="text-xs font-bold text-gray-200">
              360° 用户全轨迹穿透档案
            </h2>
          </div>
          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">
            消除信息孤岛
          </span>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Member Card */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-950/40 via-purple-950/20 to-gray-900 border border-pink-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pink-200">{userProfile.name}</span>
              <span className="text-[10px] font-mono text-pink-400">{userProfile.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-pink-500/20">
              <div>
                <span className="text-gray-400 block text-[10px]">年累计消费</span>
                <span className="text-gray-100 font-bold font-mono">{userProfile.annualSpend}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">购买频次</span>
                <span className="text-gray-100 font-bold">{userProfile.purchaseFrequency}</span>
              </div>
            </div>
          </div>

          {/* Skin Profile (美妆核心关键：敏肌档案) */}
          <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800 space-y-2">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              敏肌/肤质数字档案
            </span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">肤质类型:</span>
                <span className="text-gray-200 font-medium">{userProfile.skinProfile.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">屏障状态:</span>
                <span className="text-rose-400 font-medium">{userProfile.skinProfile.barrierStatus}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">成分禁忌红名单:</span>
                <div className="flex flex-wrap gap-1">
                  {userProfile.skinProfile.taboos.map((taboo, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-red-500/10 text-red-300 border border-red-500/20 px-1.5 py-0.5 rounded"
                    >
                      {taboo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Timeline */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-blue-400" />
              关联电商订单履约时序
            </span>

            {userProfile.orders.map((ord, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <img src={ord.image} alt={ord.productName} className="w-10 h-10 rounded-lg object-cover border border-gray-700" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-200 truncate text-[11px]">{ord.productName}</p>
                    <div className="flex justify-between text-[10px] mt-0.5">
                      <span className="text-pink-400 font-mono font-bold">{ord.price}</span>
                      <span className="text-emerald-400 font-semibold">{ord.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 bg-black/30 px-2 py-1 rounded font-mono truncate">
                  {ord.logistics}
                </div>
              </div>
            ))}
          </div>

          {/* History Tickets (工单穿透) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              历史售后工单透视
            </span>

            {userProfile.tickets.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-gray-900/40 border border-gray-800/80 text-xs space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-gray-200">{t.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    t.status === '已结单' 
                      ? 'bg-gray-800 text-gray-400' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>{t.ticketId}</span>
                  <span>{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
