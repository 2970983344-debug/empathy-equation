import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartPulse, 
  Eye, 
  Send, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  Stethoscope, 
  ExternalLink,
  MessageSquare,
  Clock,
  ShoppingBag,
  FileSpreadsheet,
  Scissors,
  MoreHorizontal,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export default function QianniuWorkstation({
  scenario,
  userProfile,
  messages,
  onSendMessage,
  onSendFollowup,
  onAdoptReply,
  onExecuteTool,
  toolExecuted,
  onOpenVisionModal,
  onSelectScenarioById
}) {
  const [inputText, setInputText] = useState('');
  const [activePluginTab, setActivePluginTab] = useState('equation'); // 'equation' | 'profile'

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const hasUserImage = messages.some(m => m.image);
  const primaryOrder = userProfile.orders[0];

  return (
    <div className="flex-1 flex overflow-hidden bg-[#F1F3F5] text-gray-800 font-sans h-[calc(100vh-61px)]">
      
      {/* 1. 最左侧：千牛深蓝导航栏 (简约实效) */}
      <aside className="w-13 bg-[#1875F0] flex flex-col items-center py-3 justify-between select-none shadow-sm flex-shrink-0">
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1875F0] font-bold text-xs shadow-sm">
            牛
          </div>

          <div className="flex flex-col items-center space-y-2 w-full text-white/90">
            <button className="w-10 h-10 rounded-lg bg-white/20 text-white flex flex-col items-center justify-center text-[10px] font-medium">
              <MessageSquare className="w-4 h-4 mb-0.5" />
              <span>工作台</span>
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex flex-col items-center justify-center text-[10px] transition-colors relative">
              <span className="w-1.5 h-1.5 rounded-full bg-red-300 absolute top-1.5 right-2.5"></span>
              <Clock className="w-4 h-4 mb-0.5" />
              <span>消息</span>
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex flex-col items-center justify-center text-[10px] transition-colors">
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              <span>进店</span>
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex flex-col items-center justify-center text-[10px] transition-colors">
              <FileSpreadsheet className="w-4 h-4 mb-0.5" />
              <span>工单</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="w-7 h-7 rounded-md bg-white/90 p-0.5 flex items-center justify-center">
            <span className="text-[7px] font-bold text-black tracking-tight">L'ORÉAL</span>
          </div>
          <span className="text-[9px] text-white/80">欧莱雅</span>
        </div>
      </aside>

      {/* 2. 左二：买家接待列表 (清爽白底) */}
      <section className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-gray-700">客服：薇薇</span>
            <span className="text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1">在线</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="p-2 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="搜索联系人、订单号" 
            className="w-full bg-gray-100 text-xs px-2.5 py-1.5 rounded-md border-none focus:bg-white focus:ring-1 focus:ring-blue-400 outline-none"
            readOnly
          />
        </div>

        <div className="px-3 py-1.5 bg-gray-50 flex justify-between text-[11px] text-gray-500 font-medium border-b border-gray-100">
          <span>当前接待 (3)</span>
          <span className="text-gray-400">时间排序</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 text-xs">
          {/* S00010 喵e** */}
          <div 
            onClick={() => onSelectScenarioById('official_allergy_s00010')}
            className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors ${
              scenario.id === 'official_allergy_s00010' ? 'bg-blue-50/70 border-l-3 border-[#1875F0]' : 'hover:bg-gray-50'
            }`}
          >
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80" alt="喵e**" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-gray-800 truncate">喵e** (S00010)</span>
                <span className="text-[10px] text-gray-400">14:25</span>
              </div>
              <p className="text-[11px] text-red-500 truncate">全脸发红，起了小疹子</p>
              <span className="text-[9px] bg-red-50 text-red-600 px-1 py-0.2 rounded mt-0.5 inline-block border border-red-100">不良反应工单</span>
            </div>
          </div>

          {/* S00001 邓e** */}
          <div 
            onClick={() => onSelectScenarioById('official_broken_s00001')}
            className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors ${
              scenario.id === 'official_broken_s00001' ? 'bg-blue-50/70 border-l-3 border-[#1875F0]' : 'hover:bg-gray-50'
            }`}
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="邓e**" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-gray-800 truncate">邓e** (S00001)</span>
                <span className="text-[10px] text-gray-400">10:18</span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">粉底液泵头损坏</p>
              <span className="text-[9px] bg-amber-50 text-amber-600 px-1 py-0.2 rounded mt-0.5 inline-block border border-amber-100">破损换货</span>
            </div>
          </div>

          {/* S00024 王** */}
          <div 
            onClick={() => onSelectScenarioById('official_risk_s00024')}
            className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors ${
              scenario.id === 'official_risk_s00024' ? 'bg-blue-50/70 border-l-3 border-[#1875F0]' : 'hover:bg-gray-50'
            }`}
          >
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="王**" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-gray-800 truncate">王** (S00024)</span>
                <span className="text-[10px] text-gray-400">昨天</span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">箱子打开是空的！</p>
              <span className="text-[9px] bg-purple-50 text-purple-600 px-1 py-0.2 rounded mt-0.5 inline-block border border-purple-100">风控核实</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 中部核心区：对话流与商品卡片 (清晰平铺) */}
      <section className="flex-1 bg-white flex flex-col overflow-hidden border-r border-gray-200">
        {/* Top Header */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-gray-800">{userProfile.name}</span>
            <span className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.2">
              天猫买家 · {userProfile.id}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span className="hover:text-gray-600 cursor-pointer">服务历史</span>
            <MoreHorizontal className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Product Summary Card (标准电商商品卡) */}
        {primaryOrder && (
          <div className="mx-3 mt-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2.5">
            <img 
              src={primaryOrder.image} 
              alt={primaryOrder.productName} 
              className="w-12 h-12 rounded object-cover border border-gray-200 flex-shrink-0"
            />
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-800 truncate">{primaryOrder.productName}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-0.5">
                <span className="text-red-600 font-bold">{primaryOrder.price}</span>
                <span>状态: <strong className="text-gray-700">{primaryOrder.status}</strong></span>
                <span className="text-gray-400 truncate">物流: {primaryOrder.logistics}</span>
              </div>
            </div>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFBFD]">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] text-gray-400">
                  {m.sender === 'user' ? userProfile.name.split(' ')[0] : '客服 薇薇'} · {m.time}
                </span>
              </div>

              <div 
                className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-white text-gray-800 rounded-tl-sm border border-gray-200 shadow-sm'
                    : 'bg-[#1875F0] text-white rounded-tr-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                {m.image && (
                  <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-200 cursor-pointer" onClick={onOpenVisionModal}>
                    <img 
                      src={m.image} 
                      alt="用户发送的照片" 
                      className="w-full max-h-40 object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-red-400" />
                      Qwen-VL 已完成视觉诊断 (点击查看)
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* User Followup Trigger (用于快捷演练) */}
        {!hasUserImage && scenario.userFollowup && (
          <div className="px-3 py-1.5 bg-blue-50/60 border-t border-blue-100 flex items-center justify-between text-xs">
            <span className="text-[11px] text-blue-700">演练操作：模拟买家发送实物凭证</span>
            <button
              onClick={onSendFollowup}
              className="text-[11px] bg-[#1875F0] hover:bg-blue-600 text-white px-2.5 py-1 rounded transition-colors flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3" />
              发送实物照片
            </button>
          </div>
        )}

        {/* Chat Input Area */}
        <div className="p-2.5 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3 text-gray-400 text-xs mb-1.5 px-1">
            <span className="hover:text-gray-600 cursor-pointer">常用短语</span>
            <Scissors className="w-3.5 h-3.5 hover:text-gray-600 cursor-pointer" />
            <ImageIcon className="w-3.5 h-3.5 hover:text-gray-600 cursor-pointer" />
          </div>

          <div className="flex gap-2">
            <textarea 
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="输入回复，或在右侧插件区一键采纳建议..."
              className="flex-1 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 p-2 rounded-lg border border-gray-200 focus:border-[#1875F0] focus:bg-white focus:outline-none resize-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#1875F0] hover:bg-blue-600 text-white px-3.5 rounded-lg text-xs font-medium transition-colors"
            >
              发送
            </button>
          </div>
        </div>
      </section>

      {/* 4. 右侧辅助区：【智能客服插件 · 简约扁平企业风】 */}
      <aside className="w-[380px] bg-white border-l border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
        {/* Plugin Tab Bar */}
        <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold text-gray-800">
              共感方程式 · 辅助插件
            </span>
          </div>

          <div className="flex bg-gray-200/80 p-0.5 rounded text-[10px]">
            <button
              onClick={() => setActivePluginTab('equation')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                activePluginTab === 'equation' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
              }`}
            >
              共感建议
            </button>
            <button
              onClick={() => setActivePluginTab('profile')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                activePluginTab === 'profile' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
              }`}
            >
              买家画像
            </button>
          </div>
        </div>

        {/* Plugin Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          {activePluginTab === 'equation' ? (
            <>
              {/* Metric Card */}
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">共感决策指数</span>
                  <span className="text-lg font-bold font-mono text-gray-800">94.2</span>
                  <span className="text-[10px] text-emerald-600 font-medium ml-1">/ 100</span>
                </div>
                <div className="text-right text-[10px] text-gray-500 space-y-0.5">
                  <div>情绪张力：<strong className="text-red-500">89% (焦躁)</strong></div>
                  <div>Token优化：<strong className="text-emerald-600">-61.8%</strong></div>
                </div>
              </div>

              {/* Multimodal Card */}
              {hasUserImage && scenario.visionAnalysis.hasImage && (
                <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-200 space-y-1.5">
                  <div className="flex items-center justify-between pb-1 border-b border-purple-100">
                    <span className="font-semibold text-purple-900 text-xs">Qwen2.5-VL 视觉定损</span>
                    <button 
                      onClick={onOpenVisionModal}
                      className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5"
                    >
                      检测图层 <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-gray-700 space-y-0.5 leading-relaxed">
                    <p><strong>诊断：</strong>{scenario.visionAnalysis.detection}</p>
                    <p><strong>等级：</strong><span className="text-purple-700 font-semibold">{scenario.visionAnalysis.severity}</span></p>
                    <p className="text-[10px] text-gray-500 mt-1"><strong>成分分析：</strong>{scenario.visionAnalysis.knowledgeRAG.cause}</p>
                  </div>
                </div>
              )}

              {/* 3-Tier Replies (Clean Minimal Cards) */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-700 block">
                  建议回复（点击直接采纳）
                </span>

                {scenario.empathyReplies.map((reply) => (
                  <div 
                    key={reply.id}
                    onClick={() => onAdoptReply(reply.content)}
                    className="p-2.5 rounded-lg bg-white hover:bg-blue-50/40 border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-gray-100 text-gray-600">
                        {reply.temp} · {reply.type}
                      </span>
                      <span className="text-[10px] text-blue-600 font-semibold group-hover:underline">
                        采纳
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 group-hover:text-gray-800 leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tool Execution Button */}
              <div className="pt-1">
                <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="text-[11px] text-gray-700">
                    <div className="font-semibold text-emerald-800">{scenario.toolUseAction.ticketTitle}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">处置方案：{scenario.toolUseAction.refundAmount}</div>
                  </div>

                  <button
                    onClick={onExecuteTool}
                    disabled={toolExecuted}
                    className={`w-full py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                      toolExecuted
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {toolExecuted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        已完成自动化工单流转
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-3.5 h-3.5" />
                        一键办结处置工单
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Buyer Profile (Clean Flat View) */
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="font-semibold text-gray-800">{userProfile.name}</div>
                <div className="text-gray-500 text-[11px]">{userProfile.tier}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-semibold text-gray-700 block text-[11px]">敏感肌档案</span>
                <div className="text-gray-600 text-[11px]">
                  <strong>类型：</strong> {userProfile.skinProfile.type}<br/>
                  <strong>状态：</strong> {userProfile.skinProfile.barrierStatus}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userProfile.skinProfile.taboos.map((taboo, idx) => (
                    <span key={idx} className="text-[9px] bg-red-50 text-red-600 border border-red-100 px-1 py-0.2 rounded">
                      {taboo}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
                <span className="font-semibold text-gray-700 block text-[11px]">关联官方售后工单</span>
                {userProfile.tickets.map((t, idx) => (
                  <div key={idx} className="p-2 rounded bg-white border border-gray-200 text-[10px]">
                    <div className="flex justify-between font-medium text-gray-800">
                      <span>{t.ticketId}</span>
                      <span className="text-amber-600">{t.status}</span>
                    </div>
                    <div className="text-gray-500 mt-0.5">{t.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}
