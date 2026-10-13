import React from 'react';
import { ActiveTab, TopologyNode } from '../types';
import { TOPOLOGY_NODES } from '../data/topologyData';

interface PathwaysViewProps {
  isMobile: boolean;
  onNavigate: (tab: ActiveTab) => void;
  onSelectNode: (node: TopologyNode) => void;
}

export const PathwaysView: React.FC<PathwaysViewProps> = ({
  isMobile,
  onNavigate,
  onSelectNode,
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className={`w-full max-w-[1160px] mx-auto ${isMobile ? 'px-4 pt-4 pb-8' : 'px-6 pt-10 pb-16'}`}>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 lg:grid-cols-12 gap-12 items-center'}`}>
          {/* Left Column: Editorial Value Proposition */}
          <div className={`${isMobile ? 'flex flex-col' : 'lg:col-span-7 flex flex-col items-start'}`}>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#fbf5ee] shadow-xs text-[#7A6259] mb-4 border border-[#e7d8c7]/60">
              <span className="w-2 h-2 rounded-full bg-[#b87f72] animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A3229]">
                More paths. Better decisions. · Class 11–12
              </span>
            </div>

            {/* Headline */}
            <h1 className={`${isMobile ? 'text-[2.2rem] leading-[1.12]' : 'text-[3.2rem] leading-[1.1]'} text-[#4A3229] font-bold tracking-tight mb-4`}>
              You have more options than{' '}
              <span className="font-editorial italic font-normal text-[#864a57]">
                anyone's shown you.
              </span>
            </h1>

            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#7A6259] leading-relaxed mb-6 max-w-xl`}>
              Finding a worthwhile path after Class 12 is needlessly painful. High-fee agencies charge fortunes for biased recommendations, and doing it alone leaves you spiraling in 50 open tabs. OpenDoors cuts through both.
            </p>

            {/* Action Buttons */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3 w-full sm:w-auto mb-8`}>
              <button
                onClick={() => onNavigate('universities')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#8d6e63] text-white text-xs font-semibold shadow-md hover:bg-[#72564c] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Browse 10,000+ universities</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('ask-us')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#fbf5ee] text-[#4A3229] border border-[#e7d8c7] text-xs font-semibold shadow-xs hover:bg-[#f8ece1] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-[#b87f72]">chat</span>
                <span>Ask a founder directly</span>
              </button>
            </div>

            {/* Trust Pill Badges */}
            <div className={`grid grid-cols-3 gap-2 w-full max-w-lg ${isMobile ? 'pt-1' : 'bg-[#f8ece1]/50 p-3 rounded-2xl'}`}>
              <div className="bg-[#ffffff] p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1 border border-[#e7d8c7]/50">
                <span className="material-symbols-outlined text-[18px] text-[#72564c]">school</span>
                <span className="text-[10px] uppercase font-bold text-[#4A3229]">100% Student-authored</span>
              </div>
              <div className="bg-[#ffffff] p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1 border border-[#e7d8c7]/50">
                <span className="material-symbols-outlined text-[18px] text-[#b87f72]">money_off</span>
                <span className="text-[10px] uppercase font-bold text-[#4A3229]">Zero sponsored links</span>
              </div>
              <div className="bg-[#ffffff] p-2.5 rounded-xl shadow-xs flex flex-col items-center text-center gap-1 border border-[#e7d8c7]/50">
                <span className="material-symbols-outlined text-[18px] text-[#864a57]">savings</span>
                <span className="text-[10px] uppercase font-bold text-[#4A3229]">Always free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Class 11 Option Topology */}
          <div className={`${isMobile ? 'w-full' : 'lg:col-span-5'}`}>
            <div className="bg-[#fbf5ee] rounded-3xl p-5 lg:p-6 shadow-md border border-[#e7d8c7] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#e7d8c7]/60">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b87f72] block">
                    Topology Map
                  </span>
                  <h2 className="text-base font-bold text-[#4A3229]">
                    Class 11 Option Branches
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#fed7ca] text-[#795c52] text-[10px] font-bold uppercase tracking-wider">
                  5 Active Nodes
                </span>
              </div>

              {/* Branch visualizer list */}
              <div className="space-y-2.5">
                {TOPOLOGY_NODES.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => onSelectNode(node)}
                    className="p-3.5 rounded-2xl bg-[#f8ece1]/70 hover:bg-[#f8ece1] transition-all cursor-pointer border border-[#e7d8c7]/40 hover:border-[#b87f72]/50 group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-[#4A3229] group-hover:text-[#72564c] transition-colors line-clamp-1">
                        {node.id}. {node.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${node.tagClass}`}>
                        {node.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A6259] leading-snug">
                      {node.shortDesc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Topology Footer */}
              <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center justify-between text-[11px] text-[#7A6259]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#8d6e63]">info</span>
                  Tap any node to view prerequisites
                </span>
                <span className="text-[#b87f72] font-semibold text-[10px] uppercase tracking-wider">
                  5 Distinct Vectors
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNVARNISHED REALITY / SPLIT COMPARISON */}
      <section className="w-full bg-[#fef2e6] py-14 lg:py-20 border-y border-[#e7d8c7]">
        <div className="max-w-[1160px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#b87f72] mb-1">
              Unvarnished Reality
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#4A3229] tracking-tight mb-2">
              Why finding a good path feels so hard
            </h2>
            <p className="text-sm text-[#7A6259] max-w-xl">
              The counseling ecosystem is built to monetize student panic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Commercial Agencies */}
            <div className="bg-[#fbf5ee] p-6 lg:p-7 rounded-3xl shadow-xs flex flex-col justify-between border border-[#e7d8c7]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72]">
                    <span className="material-symbols-outlined text-xl">storefront</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f3e2db] text-[#b87f72] text-[10px] uppercase font-bold">
                    ₹50k – ₹3L Fee
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#4A3229] mb-3">Commercial Agencies</h3>
                <ul className="space-y-3 text-xs text-[#7A6259]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 shrink-0">close</span>
                    <span>Receive 20–40% backroom kickbacks from private deemed universities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 shrink-0">close</span>
                    <span>Actively conceal low-cost government institutions because they pay zero commission.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-[#e7d8c7]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B3A093] block font-bold">Incentive Structure</span>
                <span className="text-xs text-[#4A3229] font-medium">Prioritizes university revenue per head</span>
              </div>
            </div>

            {/* Card 2: Doing it alone */}
            <div className="bg-[#fbf5ee] p-6 lg:p-7 rounded-3xl shadow-xs flex flex-col justify-between border border-[#e7d8c7]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f8ece1] flex items-center justify-center text-[#7A6259]">
                    <span className="material-symbols-outlined text-xl">hourglass_empty</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#7A6259] text-[10px] uppercase font-bold">
                    Cognitive Exhaustion
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#4A3229] mb-3">Doing it alone</h3>
                <ul className="space-y-3 text-xs text-[#7A6259]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 shrink-0">warning</span>
                    <span>Drowning in Quora threads, predatory YouTube influencers, and fake cutoff blogs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 shrink-0">warning</span>
                    <span>Discovering prerequisite subject requirements only after central registration portals shut down.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-[#e7d8c7]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B3A093] block font-bold">Incentive Structure</span>
                <span className="text-xs text-[#4A3229] font-medium">Algorithmic ad revenue & clickbait</span>
              </div>
            </div>

            {/* Card 3: What OpenDoors gives you */}
            <div className="bg-[#ffffff] p-6 lg:p-7 rounded-3xl shadow-md flex flex-col justify-between border-2 border-[#8d6e63]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f5c8d0]/30 rounded-bl-full pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#fed7ca] flex items-center justify-center text-[#795c52]">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#fed7ca] text-[#795c52] text-[10px] uppercase font-bold">
                    100% Non-Commercial
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#4A3229] mb-3">What OpenDoors gives you</h3>
                <ul className="space-y-3 text-xs text-[#4A3229]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#b87f72] text-sm mt-0.5 shrink-0">check_circle</span>
                    <span>Zero sponsored ranks. If a college has terrible hostel hygiene or fake placements, we write it down.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#b87f72] text-sm mt-0.5 shrink-0">check_circle</span>
                    <span>Verified 5-year cutoff historical trends, full living expenses, and exact dated steps for your calendar.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-[#e7d8c7]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#b87f72] block font-bold">Incentive Structure</span>
                <span className="text-xs text-[#4A3229] font-semibold">100% Student-first Public Benefit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METHODICAL CLARITY — 5-STEP SEQUENCE */}
      <section className="max-w-[1160px] mx-auto px-4 lg:px-6 py-16 lg:py-20 w-full">
        <div className="flex flex-col items-start mb-10">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#b87f72] mb-1">
            The Framework
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#4A3229] tracking-tight mb-2">
            How OpenDoors works for you
          </h2>
          <p className="text-sm text-[#7A6259] max-w-xl">
            A calm 5-step sequence engineered to replace anxiety with evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Step 1 */}
          <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-2xl font-bold text-[#864a57] block mb-2">01</span>
              <h3 className="text-xs font-bold text-[#4A3229] uppercase tracking-wider mb-2">
                Discover Options
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                Uncover fields beyond the standard 3 Indian streams, cross-matched with your cognitive strengths.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center gap-1.5 text-[#7A6259] text-[10px] uppercase font-bold">
              <span className="material-symbols-outlined text-xs text-[#8d6e63]">psychology</span>
              <span>Aptitude match</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-2xl font-bold text-[#864a57] block mb-2">02</span>
              <h3 className="text-xs font-bold text-[#4A3229] uppercase tracking-wider mb-2">
                Compare Honestly
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                Rank isn't the sole metric. We compare genuine net living costs, campus mental health, and median debt burden.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center gap-1.5 text-[#7A6259] text-[10px] uppercase font-bold">
              <span className="material-symbols-outlined text-xs text-[#8d6e63]">balance</span>
              <span>Holistic ROI</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-2xl font-bold text-[#864a57] block mb-2">03</span>
              <h3 className="text-xs font-bold text-[#4A3229] uppercase tracking-wider mb-2">
                Understand Realities
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                Explicit checklists of prerequisites, daily timetables, and clear red flags on who this path does NOT suit.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center gap-1.5 text-[#7A6259] text-[10px] uppercase font-bold">
              <span className="material-symbols-outlined text-xs text-[#b87f72]">warning</span>
              <span>Red flag audits</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-2xl font-bold text-[#864a57] block mb-2">04</span>
              <h3 className="text-xs font-bold text-[#4A3229] uppercase tracking-wider mb-2">
                Plan This Week
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                No 3-year overhauls. We hand you exactly one tangible, 20-minute action to complete before Sunday.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center gap-1.5 text-[#7A6259] text-[10px] uppercase font-bold">
              <span className="material-symbols-outlined text-xs text-[#8d6e63]">calendar_today</span>
              <span>Micro sprints</span>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-[#fbf5ee] p-5 rounded-2xl border border-[#e7d8c7] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-2xl font-bold text-[#864a57] block mb-2">05</span>
              <h3 className="text-xs font-bold text-[#4A3229] uppercase tracking-wider mb-2">
                Defend at Home
              </h3>
              <p className="text-xs text-[#7A6259] leading-relaxed">
                Printable one-pagers with ROI data, accreditation stamps, and safety stats to share directly with parents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e7d8c7]/60 flex items-center gap-1.5 text-[#7A6259] text-[10px] uppercase font-bold">
              <span className="material-symbols-outlined text-xs text-[#b87f72]">print</span>
              <span>Family briefing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORATION VAULTS */}
      <section className="w-full bg-[#fef2e6] py-14 lg:py-18 border-t border-[#e7d8c7]">
        <div className="max-w-[1160px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#b87f72] mb-1 block">
                Curated Indexes
              </span>
              <h2 className="text-2xl font-bold text-[#4A3229]">
                Exploration Vaults
              </h2>
              <p className="text-xs text-[#7A6259] mt-0.5">
                Hand-verified databases updated continuously by senior scholars.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f8ece1] text-[#7A6259] px-3 py-1 rounded-full self-start sm:self-auto border border-[#e7d8c7]">
              Updated for 2025 Admissions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Vault 1 */}
            <div
              onClick={() => onNavigate('universities')}
              className="bg-[#ffffff] p-5 rounded-2xl shadow-xs border border-[#e7d8c7] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fed7ca] flex items-center justify-center text-[#795c52] mb-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <h3 className="text-sm font-bold text-[#4A3229] mb-1">10,000+ Universities</h3>
                <p className="text-xs text-[#7A6259] leading-snug">
                  NIRF, NAAC, QS & genuine fee ledgers without inflated averages.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[#864a57] text-xs font-bold">
                <span>Explore DB</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Vault 2 */}
            <div
              onClick={() => onNavigate('pathways')}
              className="bg-[#ffffff] p-5 rounded-2xl shadow-xs border border-[#e7d8c7] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#f8ece1] flex items-center justify-center text-[#72564c] mb-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">work</span>
                </div>
                <h3 className="text-sm font-bold text-[#4A3229] mb-1">Internships & Roles</h3>
                <p className="text-xs text-[#7A6259] leading-snug">
                  High school lab attachments & verified internships across India.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[#864a57] text-xs font-bold">
                <span>View listings</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Vault 3 */}
            <div
              onClick={() => onNavigate('pathways')}
              className="bg-[#ffffff] p-5 rounded-2xl shadow-xs border border-[#e7d8c7] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#f3e2db] flex items-center justify-center text-[#b87f72] mb-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">emoji_events</span>
                </div>
                <h3 className="text-sm font-bold text-[#4A3229] mb-1">Olympiads & ECs</h3>
                <p className="text-xs text-[#7A6259] leading-snug">
                  National science, debate, and writing bouts with dated timelines.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[#864a57] text-xs font-bold">
                <span>See schedule</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Vault 4 */}
            <div
              onClick={() => onNavigate('ask-us')}
              className="bg-[#ffffff] p-5 rounded-2xl shadow-xs border border-[#e7d8c7] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ffd9df] flex items-center justify-center text-[#864a57] mb-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">contact_support</span>
                </div>
                <h3 className="text-sm font-bold text-[#4A3229] mb-1">Founder Consultation</h3>
                <p className="text-xs text-[#7A6259] leading-snug">
                  48-hour SLA direct guidance from founders Ashwitha & Nakshitha.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[#864a57] text-xs font-bold">
                <span>Ask dilemma</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT FOUNDER ADVISORY DESK (Authentic, No Fake Testimonials) */}
      <section className="max-w-[1160px] mx-auto px-4 lg:px-6 py-12 lg:py-16 w-full">
        <div className="bg-[#8d6e63] text-white rounded-3xl p-6 lg:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-[#a2626f]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 relative z-10 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#72564c] text-white text-[10px] uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5c8d0] animate-pulse"></span>
              <span>Direct Founder Desk · 48h Direct SLA</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Stuck between two conflicting college or exam choices?
            </h3>
            
            <p className="text-xs lg:text-sm text-white/90 leading-relaxed">
              Talk to founders Ashwitha & Nakshitha directly. No automated bots, no high-pressure coaching sales calls, and no commercial commissions. We read every message and respond with verified fee math and unvarnished reality.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <div className="flex -space-x-2 items-center">
                <img
                  alt="Ashwitha - Co-Founder"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  src="/assets/ashwitha_founder_1791795080913.jpg"
                />
                <img
                  alt="Nakshitha - Co-Founder"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  src="/assets/nakshitha_cofounder_1791795105734.jpg"
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">Ashwitha & Nakshitha</p>
                <p className="text-[10px] text-white/80">OpenDoors Co-Founders · Inboxes Open</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('ask-us')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white text-[#4A3229] hover:bg-[#fff8f4] text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
            >
              <span className="material-symbols-outlined text-sm text-[#8d6e63]">send</span>
              <span>Send your question directly to founders</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
