import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Share2, Mail, Check, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tab: ActiveTab) => void;
  isMobile: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab, isMobile }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const shareTitle = "OpenDoors Foundation — Independent Higher Education Guide";
  const shareText = "Stop falling for paid coaching traps and biased counseling. Check out OpenDoors for unfiltered cutoffs, honest tuition reality, and direct founder answers:";
  const shareUrl = window.location.origin;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Thought you should see this: OpenDoors Foundation");
    const body = encodeURIComponent(`Hey,\n\nI found this independent, commercial-free higher education directory for Class 11-12 students. They don't take commissions or university sponsorships and show honest fees and prerequisites:\n\n${shareUrl}\n\nHope it helps!`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // fallback to clipboard
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <footer className="w-full bg-[#f8ece1] border-t border-[#e7d8c7] mt-12 text-[#504441]">
      {/* 1. COMMUNITY SHARE BAR (WhatsApp, Instagram, Email, Copy Link) */}
      <div className="border-b border-[#e7d8c7]/60 py-8 px-4 lg:px-6">
        <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#b87f72] block">
              Pass It Forward
            </span>
            <h3 className="text-base font-bold text-[#4A3229]">
              Help a student escape coaching traps & biased rankings.
            </h3>
            <p className="text-xs text-[#7A6259] max-w-lg">
              Share OpenDoors with classmates, parents, or school groups. Commercial-free and 100% free for students — always.
            </p>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-all text-xs font-semibold shadow-xs hover:shadow-sm cursor-pointer"
              title="Share via WhatsApp"
            >
              {/* WhatsApp custom SVG icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-1.118-.063-.264-.086-.607-.203-1.036-.391-1.815-.796-3.003-2.616-3.094-2.738-.09-.122-.74-1.002-.74-1.911 0-.909.477-1.357.646-1.542.169-.185.369-.231.492-.231.123 0 .247.001.354.006.113.005.263-.043.411.314.154.37.525 1.28.571 1.374.046.093.077.202.015.325-.062.123-.093.2-.185.308-.092.108-.194.24-.277.323-.092.093-.188.193-.081.377.108.185.479.791 1.028 1.279.707.629 1.303.824 1.488.917.185.092.292.077.4-.046.108-.123.462-.538.585-.723.123-.185.246-.154.415-.092.169.062 1.077.508 1.262.6.185.092.308.138.354.215.046.077.046.446-.098.851zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.66 1.449 5.174L2 22l4.981-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              <span>Share WhatsApp</span>
            </button>

            {/* Instagram Community Share */}
            <a
              href="https://www.instagram.com/opendoors.community?dlrf=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-95 transition-all text-xs font-semibold shadow-xs hover:shadow-sm"
              title="Visit & Share our Instagram Handle"
            >
              <Instagram className="w-4 h-4" />
              <span>@opendoors.community</span>
            </a>

            {/* Email Share */}
            <button
              onClick={handleEmailShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#fbf5ee] hover:bg-[#ede0d2] text-[#4A3229] border border-[#e7d8c7] transition-all text-xs font-semibold shadow-xs cursor-pointer"
              title="Share via Email"
            >
              <Mail className="w-4 h-4 text-[#8d6e63]" />
              <span>Email Link</span>
            </button>

            {/* Native Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#fbf5ee] hover:bg-[#ede0d2] text-[#4A3229] border border-[#e7d8c7] transition-all text-xs font-semibold shadow-xs cursor-pointer"
              title="Copy page link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-[#2e7d32]" />
                  <span className="text-[#2e7d32]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#8d6e63]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT & HIDDEN CORRECTION LINK IN CREDITS */}
      <div className="max-w-[1160px] mx-auto px-4 lg:px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9sA3LaUrobJ8ls6gcnNXyojkPSW0qqBsS3_dJWdNUb37ElxhguOhY_z_u2ZI0hwx_Gx8oMNUgqXxeLBp5E_MrHdx0uAsavyfvs_H5oWc7LMDgFuAKzxyuo1MPgdg6lqWJp5qwGhOfVPknlS3yxbBIKPifCQ7_zGiEhrxOadTTB_Wp_-sPQTN-BdMIvFaCq94BCo4wxBODlluIo438GrszigAKKYZMO5qY8t2BhXIjJTXwfmroImPKCWQIjsm463mcjg"
                alt="OpenDoors emblem"
                className="h-6 w-auto object-contain"
              />
              <span className="text-base font-bold text-[#4A3229]">
                open<span className="text-[#8d6e63]">doors</span> foundation
              </span>
            </div>
            <p className="text-xs text-[#7A6259] leading-relaxed max-w-md">
              An independent public interest higher education benchmark directory and decision engine for students in Classes 11–12. Audited against the India DPDP Act 2023.
            </p>
            <p className="text-[11px] text-[#7A6259]">
              Conceived and curated by Ashwitha & Nakshitha. Free for students, educators, and schools — always.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] block">
              Direct Pathways
            </span>
            <ul className="space-y-1.5 text-xs text-[#504441]">
              <li>
                <button
                  onClick={() => onNavigateToTab('pathways')}
                  className="hover:text-[#4A3229] hover:underline cursor-pointer"
                >
                  Option Topology Tree
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('universities')}
                  className="hover:text-[#4A3229] hover:underline cursor-pointer"
                >
                  Universities Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('ask-us')}
                  className="hover:text-[#4A3229] hover:underline cursor-pointer"
                >
                  Direct Founder Desk (48h SLA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('folio')}
                  className="hover:text-[#4A3229] hover:underline cursor-pointer"
                >
                  Student Folio & DPDP Docket
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] block">
              Integrity Charter
            </span>
            <p className="text-xs text-[#7A6259] leading-relaxed">
              OpenDoors does not accept institutional sponsorship fees, lead-generation bounties, or paid rank placements. All datasets represent independent research.
            </p>
          </div>
        </div>

        {/* 3. CREDITS WITH SNEAKY / HIDDEN CONTACT SOURCE AT THE VERY BOTTOM */}
        <div className="pt-6 border-t border-[#e7d8c7]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-[#7A6259]">
            © {new Date().getFullYear()} OpenDoors Foundation. Public Domain Educational Resource.
          </p>

          {/* SNEAKILY PLACED CORRECTION LINK:
              Normal-looking, small-sized text embedded seamlessly in the bottom credits
          */}
          <div className="text-[11px] text-[#7A6259]">
            <span>Registry accuracy verified. </span>
            <button
              onClick={() => onNavigateToTab('correction-report')}
              className="text-[#7A6259] hover:text-[#4A3229] hover:underline transition-colors cursor-pointer inline-block"
            >
              We made a mistake? Let us know more about it
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
