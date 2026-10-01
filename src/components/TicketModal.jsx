import React from 'react';
import { CheckCircle2, X, Package, ShieldCheck, ArrowRight, Printer } from 'lucide-react';

export default function TicketModal({ isOpen, onClose, toolAction, userProfile }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-emerald-500/50 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-emerald-950/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              AI Agent 工具已成功自动执行并生成闭环单据
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Details */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-950 border border-emerald-500/30 space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-400">工单流水号：</span>
              <span className="font-mono text-emerald-400 font-bold">#TK20260930-EMPATHY-01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">服务对象：</span>
              <span className="font-semibold text-gray-200">{userProfile.name} ({userProfile.id})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">闭环动作：</span>
              <span className="font-semibold text-white">{toolAction.ticketTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">退款/赔偿金额：</span>
              <span className="font-mono font-bold text-emerald-400">{toolAction.refundAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">加赠修护权益：</span>
              <span className="font-semibold text-pink-300">{toolAction.giftSku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">顺丰加急单号：</span>
              <span className="font-mono text-blue-400">SF88901239841 (上门取件+补寄)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">承接跟进责任组：</span>
              <span className="text-gray-300">{toolAction.assignedTeam}</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 bg-gray-900/60 p-3 rounded-lg border border-gray-800 leading-relaxed">
            ✅ <strong>全链路闭环达成：</strong> 系统已自动同步财务中台极速原路打款，顺丰智慧物流系统已接收上门取退与特快补发指令，全流程无需用户二次找客服，服务风险已由“高危”降解为“闭环完成”。
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/40 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            完成并关闭
          </button>
        </div>
      </div>
    </div>
  );
}
