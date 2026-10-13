import React, { useState } from 'react';
import { University } from '../types';
import { MapPin, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { UniversityDetailModal } from '../components/UniversityDetailModal';

interface SavedViewProps {
  universities: University[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onExplore: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  universities,
  bookmarkedIds,
  onToggleBookmark,
  onExplore,
}) => {
  const [selectedUniForModal, setSelectedUniForModal] = useState<University | null>(null);
  const savedList = universities.filter((u) => bookmarkedIds.includes(u.id));

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-6 py-10 lg:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e7d8c7]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#b87f72] block">
            Personal Registry
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#4A3229]">
            Saved Universities & Benchmarks
          </h1>
          <p className="text-xs text-[#7A6259] mt-1">
            Audited records you have bookmarked for comparative evaluation. Click any university to inspect its detailed dossier.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-xs font-bold border border-[#e7d8c7] self-start sm:self-auto">
          {savedList.length} Bookmarked Profiles
        </span>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-[#fbf5ee] p-10 rounded-3xl border border-[#e7d8c7] text-center max-w-md mx-auto space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#B3A093]">bookmark_border</span>
          <h2 className="text-base font-bold text-[#4A3229]">No saved universities yet</h2>
          <p className="text-xs text-[#7A6259]">
            Tap the bookmark icon on any university card in the directory to save it to your confidential workspace.
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-2.5 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-all cursor-pointer"
          >
            Explore Directory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedList.map((uni) => (
            <article
              key={uni.id}
              onClick={() => setSelectedUniForModal(uni)}
              className="group relative flex flex-col justify-between bg-[#fbf5ee] hover:bg-[#fffdf9] rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-[#e7d8c7] cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#7A6259] min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-[#b87f72] shrink-0" />
                    <span className="text-[11px] uppercase font-bold tracking-wider truncate text-[#7A6259]">
                      {uni.location || 'Location Not found'}
                    </span>
                    {uni.alphaTwoCode && (
                      <span className="px-1.5 py-0.2 rounded bg-[#ede0d2] text-[#7A6259] text-[9px] font-bold uppercase tracking-widest shrink-0">
                        {uni.alphaTwoCode}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(uni.id);
                    }}
                    className="p-1.5 rounded-full text-[#b87f72] hover:text-[#ba1a1a] hover:bg-[#f8ece1] transition-colors cursor-pointer shrink-0"
                    title="Remove bookmark"
                    aria-label="Remove bookmark"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#4A3229] group-hover:text-[#8d6e63] transition-colors leading-snug line-clamp-2">
                  {uni.name}
                </h2>
              </div>

              <div className="pt-4 mt-3 border-t border-[#e7d8c7]/50 flex items-center justify-between text-xs font-semibold text-[#8d6e63] group-hover:text-[#4A3229] transition-colors">
                <span className="text-[11px]">View full profile & criteria</span>
                <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <UniversityDetailModal
        university={selectedUniForModal}
        isOpen={Boolean(selectedUniForModal)}
        onClose={() => setSelectedUniForModal(null)}
        isBookmarked={true}
        onToggleBookmark={onToggleBookmark}
        onOpenCorrectionForm={() => setSelectedUniForModal(null)}
      />
    </div>
  );
};
