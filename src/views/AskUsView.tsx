import React, { useState } from 'react';
import { submitStudentDilemmaToSupabase } from '../services/supabaseService';
import { StudentDilemma } from '../types';
import { ashwithaImg, nakshithaImg } from '../assets/images';

interface AskUsViewProps {
  isMobile: boolean;
  onSubmissionComplete: (dilemma: StudentDilemma) => void;
}

export const AskUsView: React.FC<AskUsViewProps> = ({
  isMobile,
  onSubmissionComplete,
}) => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState('Science PCM/B');
  const [boardState, setBoardState] = useState('');
  const [dilemma, setDilemma] = useState('');
  const [strictFeeConstraints, setStrictFeeConstraints] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<StudentDilemma | null>(null);

  const streamOptions = [
    'Science PCM/B',
    'Commerce',
    'Humanities / Arts',
    'Undergrad Drop / Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await submitStudentDilemmaToSupabase({
        studentName,
        email,
        phone,
        stream,
        boardState,
        dilemma,
        strictFeeConstraints,
      });

      setSuccessReceipt(res.dilemma);
      onSubmissionComplete(res.dilemma);
      // Reset form
      setStudentName('');
      setEmail('');
      setPhone('');
      setBoardState('');
      setDilemma('');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit dilemma. Please verify details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className={`relative w-full max-w-[1160px] mx-auto ${isMobile ? 'px-4 py-6' : 'px-6 lg:px-8 py-10 lg:py-16'}`}>
        {/* Subtle Ambient Accents */}
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-[#f5c8d0]/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#fed7ca]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* 1. HERO HEADER & DIRECT DISPATCH GRID */}
        <section className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start'} mb-20`}>
          {/* LEFT COLUMN: Founder Access & Editorial Trust */}
          <div className={`${isMobile ? 'space-y-6' : 'lg:col-span-6 space-y-8'}`}>
            {/* Overline Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbf5ee] shadow-xs text-[#7A6259] border border-[#e7d8c7]">
              <span className="w-2 h-2 rounded-full bg-[#b87f72] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A3229]">
                The Request Line · Direct Founder Access
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className={`${isMobile ? 'text-[2.2rem] leading-tight' : 'text-[2.8rem] leading-[1.15]'} font-bold text-[#4A3229] tracking-tight`}>
                Tell us your situation.{' '}
                <span className="text-[#8d6e63] italic font-editorial font-normal">
                  A founder writes back.
                </span>
              </h1>
              <p className="text-sm text-[#7A6259] leading-relaxed">
                Not an AI chatbot, not a ticket lost in a support queue. Founders Ashwitha and Nakshitha personally read and answer every question within 48 hours.
              </p>
            </div>

            {/* Founders Profile Card */}
            <div className="bg-[#fbf5ee] p-6 lg:p-7 rounded-3xl shadow-sm border border-[#e7d8c7] space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fed7ca]/40 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center gap-4 relative">
                <div className="flex -space-x-3 items-center">
                  <img
                    alt="Ashwitha - Co-Founder"
                    className="w-14 h-14 rounded-full object-cover shadow-sm bg-[#f8ece1] border-2 border-white"
                    src={ashwithaImg}
                  />
                  <img
                    alt="Nakshitha - Co-Founder"
                    className="w-14 h-14 rounded-full object-cover shadow-sm bg-[#f8ece1] border-2 border-white"
                    src={nakshithaImg}
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#4A3229]">Ashwitha & Nakshitha</h2>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                    Co-Founders & Student Advocates
                  </p>
                </div>
              </div>

              {/* Editorial Quote */}
              <div className="relative pl-4 py-1 bg-[#f3e2db]/50 rounded-r-xl border-l-3 border-[#b87f72]">
                <p className="font-editorial italic text-xs text-[#4A3229] leading-relaxed">
                  “We started OpenDoors because we were given biased, paid counseling when we were 17. You get the unvarnished reality: genuine fee ROI, honest drop-out rates, and zero sales pitches.”
                </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-4 pt-1 bg-[#f8ece1]/60 p-3.5 rounded-2xl border border-[#e7d8c7]/50">
                <div>
                  <span className="text-xl font-bold text-[#8d6e63] block">1,840+</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">Queries Solved</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#864a57] block">₹0.00</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">Charged to Students</span>
                </div>
              </div>
            </div>

            {/* What Happens After You Press Send */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b87f72] text-sm">schedule</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                  What Happens After You Press Send
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8ece1]/70 border border-[#e7d8c7]/50">
                  <span className="text-[10px] font-bold text-white bg-[#72564c] px-2 py-0.5 rounded-full mt-0.5">
                    01
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#4A3229]">Describe where you actually are</h3>
                    <p className="text-[11px] text-[#7A6259]">Share your stream, state board, family budget limits, and anxieties without sugarcoating.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8ece1]/70 border border-[#e7d8c7]/50">
                  <span className="text-[10px] font-bold text-white bg-[#72564c] px-2 py-0.5 rounded-full mt-0.5">
                    02
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#4A3229]">Written, researched reply within 48h</h3>
                    <p className="text-[11px] text-[#7A6259]">Cross-referencing verified real fee schedules, faculty attrition stats, and state scholarship dockets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8ece1]/70 border border-[#e7d8c7]/50">
                  <span className="text-[10px] font-bold text-white bg-[#72564c] px-2 py-0.5 rounded-full mt-0.5">
                    03
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#4A3229]">Shapes future public roadmaps</h3>
                    <p className="text-[11px] text-[#7A6259]">Anonymized takeaways feed our free OpenDoors guides, permanently helping thousands of other aspiring scholars.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DIRECT DISPATCH FORM */}
          <div className={`${isMobile ? 'w-full' : 'lg:col-span-6'}`}>
            <div className="bg-[#fbf5ee] rounded-3xl p-6 lg:p-8 shadow-md border border-[#e7d8c7] relative">
              {/* Form Header */}
              <div className="pb-5 mb-5 border-b border-[#e7d8c7]/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#b87f72] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                    Direct Dispatch
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fed7ca] text-[#795c52] text-[10px] uppercase font-bold">
                    48h SLA Active
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#4A3229]">
                  Send Your Academic Dilemma
                </h2>
                <p className="text-xs text-[#7A6259]">
                  Directly received on founders' secure workstations. Zero marketing intermediaries.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                    Your First Name / Pseudonym <span className="text-[#b87f72]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Priyanshu or Anonymous"
                    className="w-full bg-[#fff8f4] px-3.5 py-2.5 rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-[#f8ece1] transition-all"
                  />
                </div>

                {/* Email (Required) & Phone (Optional) Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                      Email Address <span className="text-[#b87f72]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Where founders send the reply"
                      className="w-full bg-[#fff8f4] px-3.5 py-2.5 rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-[#f8ece1] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                      Phone / WhatsApp No. <span className="text-[#B3A093] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Optional WhatsApp contact"
                      className="w-full bg-[#fff8f4] px-3.5 py-2.5 rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-[#f8ece1] transition-all"
                    />
                  </div>
                </div>

                {/* Academic Stream Chips */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                    Current Academic Stream
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {streamOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setStream(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          stream === opt
                            ? 'bg-[#8d6e63] text-white border-[#8d6e63] shadow-xs'
                            : 'bg-[#fff8f4] text-[#4A3229] border-[#e7d8c7] hover:bg-[#f8ece1]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Board & Home State */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                    Board & Home State / Domicile
                  </label>
                  <input
                    type="text"
                    value={boardState}
                    onChange={(e) => setBoardState(e.target.value)}
                    placeholder="e.g. CBSE · Maharashtra State Quota"
                    className="w-full bg-[#fff8f4] px-3.5 py-2.5 rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-[#f8ece1] transition-all"
                  />
                </div>

                {/* Honest Dilemma Textarea */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                      Your Honest Dilemma <span className="text-[#b87f72]">*</span>
                    </label>
                    <span className="text-[10px] text-[#B3A093]">Take your time</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={dilemma}
                    onChange={(e) => setDilemma(e.target.value)}
                    placeholder="Tell us everything: family budget limits, College A vs College B, Tier-3 vs drop year, parent expectations, lack of math confidence..."
                    className="w-full bg-[#fff8f4] p-3 rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-[#f8ece1] transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Zero-Loan Constraints Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-[#f3e2db]/70 rounded-2xl border border-[#e7d8c7]">
                  <div className="flex items-center gap-2.5 pr-2">
                    <span className="material-symbols-outlined text-[#b87f72] text-lg">savings</span>
                    <div>
                      <span className="text-xs font-bold text-[#4A3229] block">
                        Strict Fee / Scholarship Constraints?
                      </span>
                      <p className="text-[10px] text-[#7A6259]">
                        We will filter solely for zero-loan, debt-free trajectories.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStrictFeeConstraints(!strictFeeConstraints)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                      strictFeeConstraints ? 'bg-[#8d6e63]' : 'bg-[#e4d8cd]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform ${
                        strictFeeConstraints ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#8d6e63] hover:bg-[#72564c] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                        <span>Transmitting to Founders...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit to Founders</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security Guarantee */}
                <div className="flex items-center justify-center gap-1.5 text-center pt-1 text-[#7A6259]">
                  <span className="material-symbols-outlined text-xs text-[#8d6e63]">shield_locked</span>
                  <p className="text-[10px] uppercase font-bold tracking-wider">
                    Guaranteed human response · 100% Free · DPDP Act 2023 Compliant
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SUCCESS FLYOUT MODAL */}
        {successReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#362f28]/50 backdrop-blur-sm p-4">
            <div className="bg-[#fbf5ee] p-7 rounded-3xl max-w-md w-full shadow-2xl space-y-4 text-center border border-[#e7d8c7]">
              <div className="w-14 h-14 bg-[#fed7ca] rounded-full flex items-center justify-center mx-auto text-[#795c52]">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-lg font-bold text-[#4A3229]">
                Dilemma Received Directly
              </h3>
              <div className="bg-[#f8ece1] p-3 rounded-xl text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#7A6259]">Receipt Docket:</span>
                  <span className="font-mono font-bold text-[#4A3229]">{successReceipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6259]">Reply Target:</span>
                  <span className="font-semibold text-[#4A3229]">{successReceipt.email}</span>
                </div>
                {successReceipt.phone && (
                  <div className="flex justify-between">
                    <span className="text-[#7A6259]">WhatsApp Target:</span>
                    <span className="text-[#4A3229]">{successReceipt.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#7A6259]">SLA Window:</span>
                  <span className="font-bold text-[#b87f72]">Under 48 Hours</span>
                </div>
              </div>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                Ashwitha and Nakshitha have logged your submission. A researched, unvarnished reply will reach your provided contact coordinates.
              </p>
              <button
                type="button"
                onClick={() => setSuccessReceipt(null)}
                className="w-full py-3 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-all cursor-pointer"
              >
                Return to Portal
              </button>
            </div>
          </div>
        )}

        {/* 2. INDIA DPDP ACT 2023 COMPLIANCE PANEL */}
        <section className="mb-20">
          <div className="bg-[#f8ece1] rounded-3xl p-6 lg:p-10 shadow-xs border border-[#e7d8c7] space-y-8 relative overflow-hidden">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2e6db] text-[#4A3229] text-[10px] uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-xs text-[#b87f72]">verified_user</span>
                <span>India DPDP Act 2023 Compliant</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#4A3229] tracking-tight">
                Your Data Is Never For Sale.{' '}
                <span className="font-editorial italic font-normal text-[#864a57]">Period.</span>
              </h2>
              <p className="text-xs lg:text-sm text-[#7A6259] leading-relaxed">
                We built OpenDoors because higher-education lead-generation portals treat high schoolers as commodities to sell to expensive private universities. We operate on the polar opposite principle as a non-commercial Data Fiduciary under Indian Law.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {/* Pillar 1 */}
              <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72]">
                    <span className="material-symbols-outlined text-lg">block</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#4A3229]">Zero Selling or Sharing</h3>
                  <p className="text-xs text-[#7A6259] leading-relaxed">
                    Your contact info will never reach coaching institutes, agent consultants, or commission colleges. No marketing lists exist.
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B3A093]">DPDP Section 6</span>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72]">
                    <span className="material-symbols-outlined text-lg">visibility_off</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#4A3229]">No Tracking or Profiling</h3>
                  <p className="text-xs text-[#7A6259] leading-relaxed">
                    We load zero commercial ad pixels, tracking beacons, or cross-site behavioral scoring scripts. We do not build profiling dossiers.
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B3A093]">Zero Behavioral Ads</span>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72]">
                    <span className="material-symbols-outlined text-lg">auto_delete</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#4A3229]">90-Day Auto-Purge</h3>
                  <p className="text-xs text-[#7A6259] leading-relaxed">
                    All personally identifiable consultation logs and contact coordinates are systematically expunged from our secure system after 90 days.
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B3A093]">Data Minimization</span>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72]">
                    <span className="material-symbols-outlined text-lg">child_care</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#4A3229]">Under-18 Safeguards</h3>
                  <p className="text-xs text-[#7A6259] leading-relaxed">
                    Strict adherence to Section 9 of the DPDP Act. Explicit minor protections with zero targeted commercial outreach.
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B3A093]">Minor Protection Strict</span>
              </div>
            </div>

            {/* Exercise Data Rights Note */}
            <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#e7d8c7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#8d6e63]">mail</span>
                <p className="text-xs text-[#4A3229]">
                  <strong className="font-semibold">Exercising your data rights:</strong> Want your submitted query expunged early before 90 days?
                </p>
              </div>
              <a
                href="mailto:privacy@opendoorsfoundation.org"
                className="text-xs font-bold text-[#72564c] hover:text-[#4A3229] underline underline-offset-4 shrink-0 transition-colors"
              >
                privacy@opendoorsfoundation.org
              </a>
            </div>
          </div>
        </section>

        {/* 3. AUTHENTIC FOUNDER CONSULTATION SCOPE & METHODOLOGY (No Fake Stories) */}
        <section className="mb-16 space-y-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#b87f72]">
              What We Help You Solve
            </span>
            <h2 className="text-2xl font-bold text-[#4A3229]">
              How Founders Review Your Dilemma
            </h2>
            <p className="text-xs text-[#7A6259] max-w-xl mt-0.5 leading-relaxed">
              We evaluate queries against hard data: statutory fee gazettes, genuine dropout and placement statistics, and transparent debt-to-income models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-[#fbf5ee] rounded-3xl p-6 shadow-xs border border-[#e7d8c7] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#fed7ca] flex items-center justify-center text-[#72564c]">
                <span className="material-symbols-outlined text-lg">calculate</span>
              </div>
              <h3 className="text-sm font-bold text-[#4A3229]">
                Loan & True ROI Math
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                We calculate your actual 10-year debt burden under prevailing education loan interest rates to ensure your degree won't demand unsustainable monthly EMI servicing.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#fbf5ee] rounded-3xl p-6 shadow-xs border border-[#e7d8c7] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e4beb2]/50 flex items-center justify-center text-[#72564c]">
                <span className="material-symbols-outlined text-lg">alt_route</span>
              </div>
              <h3 className="text-sm font-bold text-[#4A3229]">
                Unadvertised Pathways
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                From national science fellowships (IAT, NEST, ISI) to state merit quotas and off-campus research internships, we share routes coaching centers never mention.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#fbf5ee] rounded-3xl p-6 shadow-xs border border-[#e7d8c7] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f8ece1] flex items-center justify-center text-[#72564c]">
                <span className="material-symbols-outlined text-lg">verified_user</span>
              </div>
              <h3 className="text-sm font-bold text-[#4A3229]">
                Zero Commercial Agenda
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                OpenDoors accepts ₹0 from colleges and ₹0 from students. Our recommendations are never influenced by admission referral fees or seat sales.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FOUNDER EMPATHY NOTE WITH REAL PHOTOS */}
        <section className="mb-10">
          <div className="bg-[#5c4438] text-white rounded-3xl p-6 lg:p-10 shadow-xl flex flex-col md:flex-row items-center gap-6 lg:gap-8 border border-[#7c5d4e]">
            <div className="flex -space-x-4 items-center shrink-0">
              <img
                alt="Ashwitha - Co-Founder"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-lg border-2 border-white"
                src={ashwithaImg}
              />
              <img
                alt="Nakshitha - Co-Founder"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-lg border-2 border-white"
                src={nakshithaImg}
              />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5c8d0] block">
                A Personal Note to Every Student
              </span>
              <p className="font-editorial italic text-base lg:text-lg leading-relaxed text-[#fbf5ee]">
                “You are never a burden, and no question is silly. We started this platform to be the mentors we wish we had during our own entrance exam transitions.”
              </p>
              <p className="text-xs font-semibold text-[#f5c8d0]">
                — Ashwitha & Nakshitha, <span className="font-normal opacity-80">Co-Founders of OpenDoors Foundation</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
