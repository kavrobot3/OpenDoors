import React, { useEffect } from 'react';
import { University } from '../types';
import { 
  X, 
  ExternalLink, 
  Mail, 
  Bookmark, 
  BookmarkCheck, 
  Globe, 
  Award, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  Share2, 
  Building2,
  MapPin,
  HelpCircle
} from 'lucide-react';

interface UniversityDetailModalProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenCorrectionForm: (prefillUniName?: string) => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenCorrectionForm,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !university) return null;

  const handleShare = async () => {
    const shareText = `Check out the academic benchmarks for ${university.name} (${university.location}) on OpenDoors Foundation.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: university.name,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('University details link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#fffaf5] rounded-3xl shadow-2xl border border-[#e7d8c7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Quick Actions */}
        <div className="sticky top-0 z-20 bg-[#fffaf5]/95 backdrop-blur-md px-6 py-5 border-b border-[#e7d8c7] flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f3e2db] text-[#4A3229] text-[11px] font-bold uppercase tracking-wider border border-[#e7d8c7]">
                <MapPin className="w-3 h-3 text-[#b87f72]" />
                <span>{university.location || 'Location Not found'}</span>
              </span>
              {university.alphaTwoCode && (
                <span className="px-2.5 py-1 rounded-full bg-[#ede0d2] text-[#7A6259] text-[10px] font-bold tracking-widest uppercase">
                  {university.alphaTwoCode}
                </span>
              )}
              {university.sourceRow && (
                <span className="text-[10px] text-[#B3A093] font-mono">
                  Ref: #{university.sourceRow}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#4A3229] leading-tight tracking-tight">
              {university.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(university.id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isBookmarked 
                  ? 'bg-[#8d6e63] text-white border-[#8d6e63] shadow-sm' 
                  : 'bg-[#fbf5ee] text-[#7A6259] border-[#e7d8c7] hover:bg-[#f3e2db]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark university'}
              aria-label="Bookmark"
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-[#fbf5ee] hover:bg-[#f3e2db] text-[#7A6259] border border-[#e7d8c7] transition-all cursor-pointer"
              title="Share this university"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#ede0d2] hover:bg-[#e4d3c9] text-[#4A3229] transition-all cursor-pointer"
              aria-label="Close modal"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Spacious Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-[#e7d8c7]/60">
          
          {/* Quick Action Link Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {university.officialPortal && university.officialPortal !== 'Not found' ? (
              <a
                href={university.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8d6e63] hover:bg-[#72564c] text-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Institution Portal</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            ) : null}

            {university.admissionsEmail && university.admissionsEmail !== 'Not found' && university.admissionsEmail.includes('@') ? (
              <a
                href={`mailto:${university.admissionsEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f8ece1] hover:bg-[#ede0d2] text-[#4A3229] text-xs font-semibold border border-[#e7d8c7] transition-all"
              >
                <Mail className="w-4 h-4 text-[#8d6e63]" />
                <span>Contact Admissions: {university.admissionsEmail}</span>
              </a>
            ) : null}
          </div>

          {/* SECTION 1: DETAILED RANKINGS & ACCREDITATIONS */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#f3e2db] flex items-center justify-center text-[#8d6e63] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#4A3229]">
                  Institutional Standing & Rankings
                </h3>
                <p className="text-xs text-[#7A6259]">
                  National, global, and verified registry classifications
                </p>
              </div>
            </div>

            <div className="bg-[#fbf5ee] rounded-2xl p-6 border border-[#e7d8c7]/80 shadow-2xs">
              <div className="text-sm sm:text-base leading-relaxed text-[#4A3229] font-medium whitespace-pre-line">
                {university.rankBadge && university.rankBadge !== 'Not found' ? (
                  university.rankBadge
                ) : (
                  <span className="text-[#998075] italic">
                    Not found in official rankings table. This institution may operate under specialized state charters, vocational accords, or non-ranked registries.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: ADMISSIONS BENCHMARKS & ENTRY CRITERIA */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#f3e2db] flex items-center justify-center text-[#8d6e63] shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#4A3229]">
                  Admissions Benchmark & Eligibility
                </h3>
                <p className="text-xs text-[#7A6259]">
                  Required qualifications, entrance exams, GPA/percentiles, and prerequisite standards
                </p>
              </div>
            </div>

            <div className="bg-[#fbf5ee] rounded-2xl p-6 border border-[#e7d8c7]/80 shadow-2xs">
              <div className="text-sm sm:text-base leading-relaxed text-[#4A3229] font-medium whitespace-pre-line">
                {university.entryBenchmark && university.entryBenchmark !== 'Not found' ? (
                  university.entryBenchmark
                ) : (
                  <span className="text-[#998075] italic">
                    Not found. Specific admissions cutoffs must be obtained directly from the university's academic faculty gazette.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: TUITION & ECONOMIC COST REALITY */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#f3e2db] flex items-center justify-center text-[#8d6e63] shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#4A3229]">
                  Tuition, Cost Reality & Financial Structure
                </h3>
                <p className="text-xs text-[#7A6259]">
                  Tuition brackets, hidden levies, living expense shape, and subsidy coverage
                </p>
              </div>
            </div>

            <div className="bg-[#fbf5ee] rounded-2xl p-6 border border-[#e7d8c7]/80 shadow-2xs space-y-4">
              <div className="text-sm sm:text-base leading-relaxed text-[#4A3229] font-medium whitespace-pre-line">
                {university.costReality && university.costReality !== 'Not found' ? (
                  university.costReality
                ) : (
                  <span className="text-[#998075] italic">
                    Not found. Verified tuition breakdown is pending public statutory audit for this institution.
                  </span>
                )}
              </div>

              {/* Extra notes if present in legacy benchmarks */}
              {university.livingExpenseAlert && (
                <div className="p-4 rounded-xl bg-[#f9e9e5] border border-[#e6b9ad] text-xs text-[#6e2920] space-y-1">
                  <div className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b87f72]" />
                    <span>Cost of Living Observation</span>
                  </div>
                  <p>{university.livingExpenseAlert}</p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: DOMAINS, WEB PAGES & REGISTRY DIRECTORY */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#f3e2db] flex items-center justify-center text-[#8d6e63] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#4A3229]">
                  Digital Footprint & Institutional Registry
                </h3>
                <p className="text-xs text-[#7A6259]">
                  Registered DNS domains, campus locations, and public communications channels
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Domains & Web Pages */}
              <div className="bg-[#fbf5ee] rounded-2xl p-5 border border-[#e7d8c7]/80 space-y-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                  Official Web Portals & Domains
                </span>
                
                <div className="space-y-2">
                  {university.officialPortal && university.officialPortal !== 'Not found' ? (
                    <a
                      href={university.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#fffaf5] border border-[#e7d8c7] text-xs font-semibold text-[#8d6e63] hover:text-[#4A3229] hover:border-[#8d6e63] transition-colors group"
                    >
                      <span className="truncate">{university.officialPortal}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <p className="text-xs text-[#998075] italic">Portal URL: Not found</p>
                  )}

                  {university.domains && university.domains.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#B3A093] block mb-1.5">
                        Registered Academic Domains:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {university.domains.map((dom, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#f3e2db] text-[#4A3229] text-[11px] font-mono border border-[#e7d8c7]"
                          >
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Communications & Contact */}
              <div className="bg-[#fbf5ee] rounded-2xl p-5 border border-[#e7d8c7]/80 space-y-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259]">
                  Direct Admissions & Department Contact
                </span>

                <div className="p-3 rounded-xl bg-[#fffaf5] border border-[#e7d8c7] space-y-1">
                  <p className="text-xs text-[#4A3229] font-medium break-all">
                    {university.admissionsEmail && university.admissionsEmail !== 'Not found' ? (
                      university.admissionsEmail
                    ) : (
                      <span className="text-[#998075] italic">
                        Not found in public gazette.
                      </span>
                    )}
                  </p>
                  {university.admissionsEmail && university.admissionsEmail.includes('@') && (
                    <a
                      href={`mailto:${university.admissionsEmail}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8d6e63] hover:underline pt-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Compose direct inquiry</span>
                    </a>
                  )}
                </div>

                <div className="text-[11px] text-[#7A6259] pt-1">
                  <span className="font-semibold text-[#4A3229]">Jurisdiction: </span>
                  {university.stateProvince ? `${university.stateProvince}, ` : ''}{university.country}
                </div>
              </div>
            </div>
          </div>

          {/* SNEAKY CONTACT & CORRECTION LINK AT BOTTOM */}
          <div className="pt-8 pb-4">
            <div className="bg-[#f5ede4] rounded-2xl p-5 border border-[#e7d8c7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#7A6259]">
              <div className="space-y-0.5">
                <p className="font-semibold text-[#4A3229] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8d6e63]" />
                  <span>OpenDoors Public Academic Gazette Record</span>
                </p>
                <p className="text-[11px] text-[#7A6259]">
                  All directory entries are maintained for independent student research without promotional remuneration.
                </p>
              </div>

              {/* Sneakily added source of contact in credits */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCorrectionForm(university.name);
                }}
                className="text-[11px] text-[#8d6e63] hover:text-[#4A3229] underline hover:no-underline font-medium text-left sm:text-right transition-colors cursor-pointer shrink-0"
              >
                We made a mistake? Let us know more about it
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
