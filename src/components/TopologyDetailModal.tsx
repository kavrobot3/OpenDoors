import React from 'react';
import { TopologyNode } from '../types';

interface TopologyDetailModalProps {
  node: TopologyNode | null;
  onClose: () => void;
  onAskFounders: () => void;
}

export const TopologyDetailModal: React.FC<TopologyDetailModalProps> = ({
  node,
  onClose,
  onAskFounders,
}) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#362f28]/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#fbf5ee] p-6 lg:p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-5 border border-[#e7d8c7] my-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${node.tagClass}`}>
              {node.tag} · Vector #{node.id}
            </span>
            <h3 className="text-xl font-bold text-[#4A3229] leading-tight pt-1">
              {node.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f8ece1] hover:bg-[#ede0d2] text-[#4A3229] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <p className="text-sm text-[#7A6259] leading-relaxed">
          {node.fullDesc}
        </p>

        {/* Exit metric block */}
        <div className="bg-[#f8ece1] p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-[#b87f72]">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#4A3229]">
              Historical Exit Benchmark
            </span>
          </div>
          <p className="text-sm font-semibold text-[#8d6e63]">
            {node.exitMetric}
          </p>
        </div>

        {/* Prerequisites */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#7A6259] block">
            Verified Prerequisites & Eligibility
          </span>
          <ul className="space-y-2">
            {node.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4A3229]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8d6e63] mt-1.5 shrink-0"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Audit Alert */}
        <div className="bg-[#f3e2db] p-3.5 rounded-xl flex items-start gap-2.5 text-[#b87f72]">
          <span className="material-symbols-outlined text-base mt-0.5 shrink-0">warning</span>
          <div className="text-xs text-[#504441] leading-snug">
            <strong className="text-[#b87f72] font-semibold">Unfiltered Warning: </strong>
            {node.risks}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              onClose();
              onAskFounders();
            }}
            className="w-full py-3 px-5 rounded-full bg-[#8d6e63] hover:bg-[#72564c] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>Ask Ashwitha & Nakshitha About This Path</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#f8ece1] hover:bg-[#ede0d2] text-[#4A3229] text-xs font-semibold transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
