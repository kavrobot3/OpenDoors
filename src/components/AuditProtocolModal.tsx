import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Award, Lock, BookOpen } from 'lucide-react';

interface AuditProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditProtocolModal: React.FC<AuditProtocolModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fff8f4] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e7d8c7] space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-[#e7d8c7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f8ece1] flex items-center justify-center text-[#72564c] shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#8d6e63]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8d6e63]">OpenDoors Foundation</span>
              <h3 className="text-lg font-bold text-[#4A3229]">Public Research & Audit Protocol</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-[#ede0d2] text-[#7A6259] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#504441] leading-relaxed">
          <p className="bg-[#f8ece1] p-4 rounded-2xl border border-[#e7d8c7]/60 text-[#4A3229]">
            The OpenDoors Foundation operates on a strict statutory charter: <strong>zero university sponsorships, zero affiliate commissions, and zero ranking monetization</strong>. All data points are assembled to protect Class 11–12 students and families from predatory coaching pipelines and misleading institutional marketing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#e7d8c7] space-y-2">
              <div className="flex items-center gap-2 text-[#4A3229] font-bold">
                <FileText className="w-4 h-4 text-[#8d6e63]" />
                <span>1. Statutory Gazette Sourcing</span>
              </div>
              <p className="text-[11px] text-[#7A6259]">
                All base seats and accreditation statuses are audited against official central and state education gazettes, UGC notices, NIRF records, and verified university charters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#e7d8c7] space-y-2">
              <div className="flex items-center gap-2 text-[#4A3229] font-bold">
                <Lock className="w-4 h-4 text-[#8d6e63]" />
                <span>2. Anti-Commercial Insulation</span>
              </div>
              <p className="text-[11px] text-[#7A6259]">
                No college or study-abroad consultancy can purchase higher ranking spots, sponsored cards, or prioritized placement in our master database.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#e7d8c7] space-y-2">
              <div className="flex items-center gap-2 text-[#4A3229] font-bold">
                <Award className="w-4 h-4 text-[#8d6e63]" />
                <span>3. Real Cost & Hidden Overheads</span>
              </div>
              <p className="text-[11px] text-[#7A6259]">
                We document actual cost realities, including campus hostel shortages, off-campus living expenses, mess deposits, and statutory fee waiver eligibility.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#e7d8c7] space-y-2">
              <div className="flex items-center gap-2 text-[#4A3229] font-bold">
                <BookOpen className="w-4 h-4 text-[#8d6e63]" />
                <span>4. AI Estimation Disclosure</span>
              </div>
              <p className="text-[11px] text-[#7A6259]">
                Where official gazettes have gaps, secondary estimates are clearly documented as algorithmic approximations with a direct community correction channel.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fff] border border-[#e7d8c7] space-y-2">
            <h4 className="text-xs font-bold text-[#4A3229] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1b5e20]" />
              <span>Digital Personal Data Protection (DPDP) Act 2023 Compliance</span>
            </h4>
            <p className="text-[11px] text-[#7A6259]">
              Student guidance submissions submitted through OpenDoors are strictly encrypted and processed under the principles of data minimization and purposeful limitation. OpenDoors never monetizes student profiles, never passes phone numbers to coaching aggregators, and honors instant data deletion requests upon verification.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end border-t border-[#e7d8c7]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#72564c] text-white text-xs font-semibold hover:bg-[#5b4137] transition-all cursor-pointer shadow-xs"
          >
            Acknowledge Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
