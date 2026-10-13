import React, { useState } from 'react';
import { submitCorrectionReport } from '../services/supabaseService';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Send } from 'lucide-react';

interface CorrectionReportViewProps {
  onBack: () => void;
  initialUniversityName?: string;
}

export const CorrectionReportView: React.FC<CorrectionReportViewProps> = ({ 
  onBack, 
  initialUniversityName = '' 
}) => {
  const [universityName, setUniversityName] = useState(initialUniversityName);
  const [incorrectField, setIncorrectField] = useState('Entry benchmark / cutoffs');
  const [suggestedCorrection, setSuggestedCorrection] = useState('');
  const [sourceOrProofUrl, setSourceOrProofUrl] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!universityName.trim()) {
      setErrorMessage('Please specify the university name.');
      return;
    }
    if (!suggestedCorrection.trim() || suggestedCorrection.trim().length < 10) {
      setErrorMessage('Please describe the error and the accurate data in at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitCorrectionReport({
        universityName,
        incorrectField,
        suggestedCorrection,
        sourceOrProofUrl,
        reporterEmail,
      });

      setSubmittedMessage(res.message);
      setUniversityName('');
      setSuggestedCorrection('');
      setSourceOrProofUrl('');
      setReporterEmail('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit correction report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 lg:px-6 py-10 lg:py-16 space-y-8 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8ece1] hover:bg-[#ede0d2] text-[#4A3229] text-xs font-semibold transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to OpenDoors</span>
      </button>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fed7ca]/70 text-[#795c52] text-[10px] uppercase font-bold tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5 text-[#b87f72]" />
          <span>Independent Registry Integrity Desk</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#4A3229] tracking-tight">
          We made a mistake? Let us know more about it.
        </h1>
        <p className="text-xs lg:text-sm text-[#7A6259] leading-relaxed max-w-2xl">
          OpenDoors is committed to unvarnished, 100% accurate data for students. Because higher education registries and AI model benchmarks can occasionally contain outdated gazettes or misaligned estimates, your reports help us keep the directory pristine. Ashwitha and Nakshitha personally verify each citation.
        </p>
      </div>

      {submittedMessage ? (
        <div className="bg-[#fbf5ee] p-8 lg:p-10 rounded-3xl border border-[#c5e1a5] space-y-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#e8f5e9] text-[#2e7d32] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#4A3229]">Correction Logged Successfully</h2>
          <p className="text-xs text-[#7A6259] max-w-md mx-auto leading-relaxed">
            {submittedMessage}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setSubmittedMessage(null)}
              className="px-5 py-2 rounded-full bg-[#f8ece1] hover:bg-[#ede0d2] text-[#4A3229] text-xs font-semibold transition-colors"
            >
              Report Another Discrepancy
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-colors"
            >
              Back to Directory
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#fbf5ee] p-6 lg:p-8 rounded-3xl border border-[#e7d8c7] space-y-5 shadow-xs">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6259] mb-1.5">
                University Name <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="text"
                required
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                placeholder="e.g. Indian Institute of Technology, Madras or University of Edinburgh"
                className="w-full bg-[#f8ece1] px-4 py-3 rounded-2xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-white focus:border-[#b87f72] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6259] mb-1.5">
                  Which field is incorrect?
                </label>
                <select
                  value={incorrectField}
                  onChange={(e) => setIncorrectField(e.target.value)}
                  className="w-full bg-[#f8ece1] px-4 py-3 rounded-2xl text-xs text-[#4A3229] border border-[#e7d8c7] focus:outline-none focus:bg-white"
                >
                  <option value="Entry benchmark / cutoffs">Admissions / Entry Benchmark</option>
                  <option value="Cost reality / fees">Tuition / Living Cost Reality</option>
                  <option value="Rank / NIRF / QS">Rank / Accreditation Status</option>
                  <option value="Official portal or email">Official Website or Admissions Email</option>
                  <option value="AI Estimate discrepancy">AI Model Estimate Discrepancy</option>
                  <option value="Other discrepancy">Other Data Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6259] mb-1.5">
                  Your Email (Optional, for attribution/questions)
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="auditor@example.com"
                  className="w-full bg-[#f8ece1] px-4 py-3 rounded-2xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6259] mb-1.5">
                Exact Discrepancy & Accurate Correction <span className="text-[#ba1a1a]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={suggestedCorrection}
                onChange={(e) => setSuggestedCorrection(e.target.value)}
                placeholder="State what the listing currently says and what the verified ground truth is. E.g.: 'The tuition fee listed for out-of-state is ₹1.8L, but the 2025 fee committee gazette updated it to ₹2.4L...'"
                className="w-full bg-[#f8ece1] p-4 rounded-2xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6259] mb-1.5">
                Verification Source or Gazetted URL (Optional)
              </label>
              <input
                type="url"
                value={sourceOrProofUrl}
                onChange={(e) => setSourceOrProofUrl(e.target.value)}
                placeholder="https://official.portal.edu/admissions/fees-gazette.pdf"
                className="w-full bg-[#f8ece1] px-4 py-3 rounded-2xl text-xs text-[#4A3229] placeholder-[#B3A093] border border-[#e7d8c7] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-[#7A6259]">
              <ShieldCheck className="w-4 h-4 text-[#8d6e63]" />
              <span>Dispatches directly to Supabase audit registry</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8d6e63] hover:bg-[#72564c] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Dispatching...' : 'Submit Audit Report'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
