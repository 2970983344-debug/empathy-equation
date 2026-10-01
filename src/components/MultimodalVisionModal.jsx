import React from 'react';
import { X, Eye, Stethoscope, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MultimodalVisionModal({ isOpen, onClose, scenario }) {
  if (!isOpen) return null;

  const { visionAnalysis } = scenario;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-purple-500/40 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Qwen2.5-VL 多模态视觉病损定位与定损层
                </h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                  Vision Bounding Box
                </span>
              </div>
              <p className="text-xs text-gray-400">
                阿里开源多模态大模型对用户上传照片进行像素级红斑目标检测与面积测算
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Image with visual bounding box overlay + Diagnosis details */}
        <div className="grid grid-cols-12 gap-6 p-6">
          {/* Left: Annotated Image */}
          <div className="col-span-6 relative bg-black rounded-xl overflow-hidden border border-purple-900/50 flex items-center justify-center min-h-[360px]">
            <img 
              src={scenario.userFollowup?.image || "https://images.unsplash.com/photo-1512290900672-1f55b9a897b6?w=600&auto=format&fit=crop&q=80"} 
              alt="面部红斑视觉检测" 
              className="w-full h-full object-cover"
            />

            {/* Neon Red/Purple Bounding Box Overlay for Erythema */}
            <div 
              className="absolute border-2 border-red-500 bg-red-500/20 rounded-lg animate-pulse pointer-events-none"
              style={{
                top: `${visionAnalysis?.bbox?.y || 35}%`,
                left: `${visionAnalysis?.bbox?.x || 28}%`,
                width: `${visionAnalysis?.bbox?.width || 44}%`,
                height: `${visionAnalysis?.bbox?.height || 35}%`
              }}
            >
              {/* Tag on top of bbox */}
              <div className="absolute -top-7 left-0 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                <span>[BBox #01] 红斑区域: 94.6%</span>
              </div>
              {/* Corner crosshairs */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white"></span>
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white"></span>
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></span>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-gray-300 border border-gray-700 font-mono">
              模型版本: Qwen2.5-VL-7B-Instruct · 坐标: (x:28%, y:35%)
            </div>
          </div>

          {/* Right: Detailed Medical & Ingredient RAG Report */}
          <div className="col-span-6 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
              <span className="text-gray-400 block text-[11px] font-semibold">视觉诊断推断：</span>
              <div className="text-base font-bold text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                {visionAnalysis?.detection}
              </div>
              <div className="flex gap-2 pt-1">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono font-bold border border-red-500/40">
                  严重等级：{visionAnalysis?.severity}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono border border-purple-500/40">
                  皮损面积占比：~38.2%
                </span>
              </div>
            </div>

            {/* Knowledge RAG Box */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-3">
              <h4 className="font-bold text-purple-200 flex items-center gap-1.5 text-xs">
                <Stethoscope className="w-4 h-4 text-purple-400" />
                美妆专业知识库关联 (Cosmetic RAG)
              </h4>
              <div className="space-y-1.5 leading-relaxed text-gray-300 text-[11px]">
                <p>
                  <strong className="text-pink-300">致敏诱因分析：</strong>
                  {visionAnalysis?.knowledgeRAG?.cause}
                </p>
                <p>
                  <strong className="text-amber-300">紧急避坑禁忌：</strong>
                  {visionAnalysis?.knowledgeRAG?.contraindication}
                </p>
                <p>
                  <strong className="text-emerald-300">急救镇静指南：</strong>
                  {visionAnalysis?.knowledgeRAG?.firstAid}
                </p>
              </div>
            </div>

            {/* Suggested Action */}
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-emerald-300 block text-xs mb-0.5">
                  智能体处置建议 (Agent Resolution):
                </span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  {visionAnalysis?.suggestedAction}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-110 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-pink-500/20"
          >
            确认并返回工作台
          </button>
        </div>
      </div>
    </div>
  );
}
