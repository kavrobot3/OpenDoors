import React from 'react';
import { StudentDilemma } from '../types';
import { purgeSubmission, purgeAllSubmissions } from '../services/supabaseService';

interface FolioViewProps {
  submissions: StudentDilemma[];
  onSubmissionsUpdated: () => void;
  onNewInquiry: () => void;
}

export const FolioView: React.FC<FolioViewProps> = ({
  submissions,
  onSubmissionsUpdated,
  onNewInquiry,
}) => {
  const handlePurgeSingle = (id: string) => {
    if (confirm('Under DPDP Act Section 6 & 11, permanently delete this inquiry record from your device right now?')) {
      purgeSubmission(id);
      onSubmissionsUpdated();
    }
  };

  const handlePurgeAll = () => {
    if (confirm('Permanently purge all submitted consultation logs from this device?')) {
      purgeAllSubmissions();
      onSubmissionsUpdated();
    }
  };

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-6 py-10 lg:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e7d8c7]">
        <div>
          <div className="flex items-center gap-2 text-[#72564c]">
            <span className="material-symbols-outlined text-base text-[#b87f72]">folder_shared</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#b87f72]">
              Encrypted Student Docket
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#4A3229] mt-1">
            Student Folio & Submissions
          </h1>
          <p className="text-xs text-[#7A6259] mt-0.5">
            Real-time receipt tracker for inquiries dispatched to Founders Ashwitha and Nakshitha.
          </p>
        </div>

        {submissions.length > 0 && (
          <button
            onClick={handlePurgeAll}
            className="px-3 py-1.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold hover:bg-[#ffdad6]/80 transition-colors flex items-center gap-1 self-start sm:self-auto"
            title="Exercise DPDP early deletion right"
          >
            <span className="material-symbols-outlined text-sm">auto_delete</span>
            <span>Purge All Records</span>
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="bg-[#fbf5ee] p-10 rounded-3xl border border-[#e7d8c7] text-center max-w-md mx-auto space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#B3A093]">inbox</span>
          <h2 className="text-base font-bold text-[#4A3229]">No active dilemmas in docket</h2>
          <p className="text-xs text-[#7A6259]">
            Have a question about family budget limits, tier-3 vs drop years, or unadvertised scholarship pathways? Dispatch a confidential note directly to the founders.
          </p>
          <button
            onClick={onNewInquiry}
            className="px-6 py-2.5 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-all cursor-pointer"
          >
            Send Academic Dilemma
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => {
            const dateStr = new Date(sub.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={sub.id}
                className="bg-[#fbf5ee] rounded-3xl p-5 lg:p-6 border border-[#e7d8c7] shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#fed7ca] text-[#795c52] text-xs font-mono font-bold">
                      {sub.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e4beb2]/50 text-[#4A3229] text-[10px] font-bold uppercase">
                      {sub.stream}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#7A6259]">Logged: {dateStr}</span>
                    <button
                      onClick={() => handlePurgeSingle(sub.id)}
                      className="text-[#B3A093] hover:text-[#ba1a1a] p-1 transition-colors"
                      title="Purge this inquiry under DPDP Act"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#f8ece1] p-4 rounded-2xl space-y-1.5 border border-[#e7d8c7]/50">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] block">
                    Your Submitted Query
                  </span>
                  <p className="text-xs text-[#4A3229] leading-relaxed whitespace-pre-wrap">
                    {sub.dilemma}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#7A6259] bg-[#fef2e6] p-3 rounded-xl border border-[#e7d8c7]/50">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#B3A093] block">Contact Target</span>
                    <span className="font-semibold text-[#4A3229]">{sub.email}</span>
                  </div>
                  {sub.phone && (
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#B3A093] block">WhatsApp</span>
                      <span className="font-semibold text-[#4A3229]">{sub.phone}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#B3A093] block">Status & SLA</span>
                    <span className="font-bold text-[#8d6e63]">Received · 48h Reply Active</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DPDP ACT 2023 STATUTORY COMPLIANCE ARCHITECTURE CARD */}
      <div className="bg-[#fbf5ee] rounded-3xl p-6 lg:p-8 border border-[#e7d8c7] space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#f8ece1] flex items-center justify-center text-[#72564c]">
            <span className="material-symbols-outlined text-lg">shield</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#4A3229]">
              How OpenDoors strictly complies with the India DPDP Act 2023
            </h2>
            <p className="text-[11px] text-[#7A6259]">
              Digital Personal Data Protection Act, 2023 Statutory Architecture & Student Privacy Charter
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#504441]">
          <div className="bg-[#fef2e6] p-4 rounded-2xl border border-[#e7d8c7]/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#4A3229]">
              <span className="material-symbols-outlined text-sm text-[#b87f72]">fact_check</span>
              <span>1. Notice & Informed Purpose (Section 5 & 6)</span>
            </div>
            <p className="text-[11.5px] text-[#7A6259] leading-relaxed">
              We never collect data passively or silently. Inquiries are only transmitted when you deliberately submit an academic question. The purpose is strictly limited to founder responses from Ashwitha & Nakshitha. No bundled consent or deceptive dark patterns.
            </p>
          </div>

          <div className="bg-[#fef2e6] p-4 rounded-2xl border border-[#e7d8c7]/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#4A3229]">
              <span className="material-symbols-outlined text-sm text-[#b87f72]">rule</span>
              <span>2. Absolute Data Minimization (Section 7)</span>
            </div>
            <p className="text-[11.5px] text-[#7A6259] leading-relaxed">
              OpenDoors requests only what is strictly necessary to answer your question (name/pseudonym, email, stream, board jurisdiction). Phone number is optional. We never ask for Aadhaar, marksheets, parents' PAN, or bank details.
            </p>
          </div>

          <div className="bg-[#fef2e6] p-4 rounded-2xl border border-[#e7d8c7]/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#4A3229]">
              <span className="material-symbols-outlined text-sm text-[#b87f72]">delete_forever</span>
              <span>3. Unconditional Right to Erasure (Section 12)</span>
            </div>
            <p className="text-[11.5px] text-[#7A6259] leading-relaxed">
              The DPDP Act gives you the right to be forgotten. With the "Purge All Records" button above, you can permanently wipe your inquiry dockets from this device at any time without asking anyone's permission.
            </p>
          </div>

          <div className="bg-[#fef2e6] p-4 rounded-2xl border border-[#e7d8c7]/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#4A3229]">
              <span className="material-symbols-outlined text-sm text-[#b87f72]">visibility_off</span>
              <span>4. Minor & Student Protection (Section 9)</span>
            </div>
            <p className="text-[11.5px] text-[#7A6259] leading-relaxed">
              Section 9 forbids behavioral tracking and targeted advertising directed at students. OpenDoors uses ZERO ad tracking pixels, ZERO third-party tracking cookies, and ZERO lead-resale broker networks. Directory browsing is 100% anonymous.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#e7d8c7]/70 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#7A6259]">
          <span>Data Fiduciary: OpenDoors Foundation · Public Interest Educational Trust</span>
          <span className="text-[#8d6e63] font-semibold">Zero Commercial Data Syndication Guaranteed</span>
        </div>
      </div>
    </div>
  );
};
