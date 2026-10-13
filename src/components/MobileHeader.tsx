import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { X } from 'lucide-react';

interface MobileHeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
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
    <header className="sticky top-0 w-full z-40 bg-[#fff8f4]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e7d8c7]/50">
      {/* Top Ethical Promise with X close button */}
      {isBannerVisible && (
        <div className="bg-[#f8ece1] text-[#7A6259] px-3 py-1.5 flex items-center justify-between border-b border-[#e7d8c7]/40 text-center relative">
          <div className="w-5" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] truncate px-1">
            No sponsors. No commissions. Free always.
          </span>
          <button
            onClick={handleCloseBanner}
            aria-label="Dismiss banner"
            title="Close announcement"
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#ebd7c6] text-[#7A6259] hover:text-[#4A3229] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Bar */}
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onTabChange('pathways')}
            aria-label="Navigation Menu"
            className="w-9 h-9 flex items-center justify-center text-[#4A3229] rounded-full hover:bg-[#ede0d2]/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          <button
            onClick={() => onTabChange('pathways')}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9sA3LaUrobJ8ls6gcnNXyojkPSW0qqBsS3_dJWdNUb37ElxhguOhY_z_u2ZI0hwx_Gx8oMNUgqXxeLBp5E_MrHdx0uAsavyfvs_H5oWc7LMDgFuAKzxyuo1MPgdg6lqWJp5qwGhOfVPknlS3yxbBIKPifCQ7_zGiEhrxOadTTB_Wp_-sPQTN-BdMIvFaCq94BCo4wxBODlluIo438GrszigAKKYZMO5qY8t2BhXIjJTXwfmroImPKCWQIjsm463mcjg"
              alt="OpenDoors logo"
              className="h-6 w-auto object-contain shrink-0"
            />
            <span className="text-[1.1rem] font-bold tracking-tight text-[#4A3229] lowercase">
              open<span className="text-[#8d6e63]">doors</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange('ask-us')}
            className="w-8 h-8 rounded-full bg-[#72564c] flex items-center justify-center text-white"
            title="Ask Founders"
          >
            <span className="material-symbols-outlined text-white text-[16px]">edit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
