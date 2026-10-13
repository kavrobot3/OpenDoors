import React from 'react';
import { ActiveTab } from '../types';

interface MobileNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedCount: number;
  folioCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  folioCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#fff8f4]/95 backdrop-blur-xl border-t border-[#e7d8c7] shadow-[0_-1px_12px_rgba(74,50,41,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {/* Pathways Tab */}
        <button
          onClick={() => onTabChange('pathways')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            activeTab === 'pathways' ? 'text-[#72564c] font-bold' : 'text-[#7A6259] hover:text-[#4A3229]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">map</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Pathways</span>
        </button>

        {/* Universities / Search Tab */}
        <button
          onClick={() => onTabChange('universities')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            activeTab === 'universities' ? 'text-[#72564c] font-bold' : 'text-[#7A6259] hover:text-[#4A3229]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">search</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Search</span>
        </button>

        {/* Saved / Bookmarks Tab */}
        <button
          onClick={() => onTabChange('saved')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors relative ${
            activeTab === 'saved' ? 'text-[#72564c] font-bold' : 'text-[#7A6259] hover:text-[#4A3229]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">bookmark</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#b87f72] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Saved</span>
        </button>

        {/* Ask Us / Inquiries Tab */}
        <button
          onClick={() => onTabChange('ask-us')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            activeTab === 'ask-us' ? 'text-[#72564c] font-bold' : 'text-[#7A6259] hover:text-[#4A3229]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">edit_note</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Ask Us</span>
        </button>

        {/* Folio / Submissions Tab */}
        <button
          onClick={() => onTabChange('folio')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors relative ${
            activeTab === 'folio' ? 'text-[#72564c] font-bold' : 'text-[#7A6259] hover:text-[#4A3229]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">folder_shared</span>
            {folioCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#8d6e63] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {folioCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Folio</span>
        </button>
      </div>
    </nav>
  );
};
