import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { X } from 'lucide-react';

interface DesktopHeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(() => {
    try {
      return localStorage.getItem('opendoors_top_banner_closed') !== 'true';
    } catch {
      return true;
    }
  });

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
    try {
      localStorage.setItem('opendoors_top_banner_closed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#fbf5ee]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(74,50,41,0.06)] border-b border-[#e7d8c7]/50">
      {/* Top Ethical Commitment Strip with close button on rightmost side */}
      {isBannerVisible && (
        <div className="bg-[#f2e6db] py-1.5 px-4 border-b border-[#e7d8c7]/40 relative transition-all duration-300">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between">
            <div className="w-6" /> {/* spacer to balance the close button */}
            
            <div className="flex items-center justify-center gap-2 text-[#7A6259]">
              <span className="material-symbols-outlined text-sm text-[#b87f72]">verified_user</span>
              <p className="text-[11px] tracking-wider uppercase font-semibold text-[#7A6259]">
                No sponsors. No commissions. No tuition-funded rankings. Free for students — always.
              </p>
            </div>

            {/* X button on right-most side */}
            <button
              onClick={handleCloseBanner}
              aria-label="Dismiss banner"
              title="Close announcement"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#e4d3c9] text-[#7A6259] hover:text-[#4A3229] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="h-20 max-w-[1240px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <button
            onClick={() => onTabChange('pathways')}
            className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          >
            <img
              alt="OpenDoors Foundation"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9sA3LaUrobJ8ls6gcnNXyojkPSW0qqBsS3_dJWdNUb37ElxhguOhY_z_u2ZI0hwx_Gx8oMNUgqXxeLBp5E_MrHdx0uAsavyfvs_H5oWc7LMDgFuAKzxyuo1MPgdg6lqWJp5qwGhOfVPknlS3yxbBIKPifCQ7_zGiEhrxOadTTB_Wp_-sPQTN-BdMIvFaCq94BCo4wxBODlluIo438GrszigAKKYZMO5qY8t2BhXIjJTXwfmroImPKCWQIjsm463mcjg"
            />
            <span className="text-[1.3rem] text-[#4A3229] tracking-tight font-normal">
              open<span className="font-bold text-[#8d6e63]">doors</span>
            </span>
            <span className="hidden xl:inline-block text-[11px] uppercase tracking-widest text-[#B3A093] px-2.5 py-0.5 rounded-full bg-[#f8ece1] font-semibold">
              Foundation
            </span>
          </button>

          {/* Navigation Pill Container */}
          <nav className="flex items-center gap-1 p-1 bg-[#f8ece1]/70 rounded-full border border-[#e7d8c7]/60">
            <button
              onClick={() => onTabChange('pathways')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'pathways'
                  ? 'bg-[#8d6e63] text-white shadow-sm'
                  : 'text-[#504441] hover:text-[#4A3229] hover:bg-[#fbf5ee]'
              }`}
            >
              Pathways
            </button>
            <button
              onClick={() => onTabChange('universities')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'universities'
                  ? 'bg-[#8d6e63] text-white shadow-sm'
                  : 'text-[#504441] hover:text-[#4A3229] hover:bg-[#fbf5ee]'
              }`}
            >
              Universities
            </button>
            <button
              onClick={() => onTabChange('ask-us')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ask-us'
                  ? 'bg-[#8d6e63] text-white shadow-sm'
                  : 'text-[#504441] hover:text-[#4A3229] hover:bg-[#fbf5ee]'
              }`}
            >
              Ask Us
            </button>
          </nav>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('universities')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8d6e63] text-white text-xs font-semibold shadow-[0_10px_26px_-20px_rgba(74,50,41,0.3)] hover:bg-[#72564c] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Browse 10,000+ Universities</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </header>
  );
};
