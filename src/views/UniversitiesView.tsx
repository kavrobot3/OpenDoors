import React, { useState, useMemo, useEffect } from 'react';
import { University } from '../types';
import { 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal, 
  Info, 
  ChevronDown,
  Globe2,
  Building,
  GraduationCap,
  DollarSign,
  ArrowUpDown,
  X
} from 'lucide-react';
import { UniversityDetailModal } from '../components/UniversityDetailModal';
import { AuditProtocolModal } from '../components/AuditProtocolModal';

interface UniversitiesViewProps {
  universities: University[];
  isMobile: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onOpenCorrectionForm: (prefillUniName?: string) => void;
}

const ITEMS_PER_PAGE = 48;

// Popular student destination shortcuts with flag/emojis
const TOP_DESTINATIONS = [
  { key: 'all', label: 'All Global', icon: '🌐' },
  { key: 'united states', label: 'United States', icon: '🇺🇸' },
  { key: 'india', label: 'India', icon: '🇮🇳' },
  { key: 'canada', label: 'Canada', icon: '🇨🇦' },
  { key: 'united kingdom', label: 'United Kingdom', icon: '🇬🇧' },
  { key: 'germany', label: 'Germany', icon: '🇩🇪' },
  { key: 'australia', label: 'Australia', icon: '🇦🇺' },
  { key: 'france', label: 'France', icon: '🇫🇷' },
  { key: 'japan', label: 'Japan', icon: '🇯🇵' },
];

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  universities,
  isMobile,
  bookmarkedIds,
  onToggleBookmark,
  onOpenCorrectionForm,
}) => {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCost, setSelectedCost] = useState('all');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'ranked' | 'country'>('name-asc');
  
  // UI Controls
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedUniForModal, setSelectedUniForModal] = useState<University | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract distinct countries with their count
  const availableCountries = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    universities.forEach((u) => {
      if (u.country && u.country !== 'not found') {
        const key = u.country.toLowerCase().trim();
        const display = u.country.charAt(0).toUpperCase() + u.country.slice(1);
        const existing = map.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(key, { label: display, count: 1 });
        }
      }
    });
    return Array.from(map.entries()).sort((a, b) => a[1].label.localeCompare(b[1].label));
  }, [universities]);

  // Extract distinct states / provinces (filtered by current selected country if chosen)
  const availableStates = useMemo(() => {
    const map = new Map<string, number>();
    universities.forEach((u) => {
      const countryMatch = selectedCountry === 'all' || u.country?.toLowerCase() === selectedCountry.toLowerCase();
      if (countryMatch && u.stateProvince && u.stateProvince.trim().length > 1 && u.stateProvince !== 'not found') {
        const stateName = u.stateProvince.trim();
        map.set(stateName, (map.get(stateName) || 0) + 1);
      }
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [universities, selectedCountry]);

  // Reset state selection when country changes
  useEffect(() => {
    setSelectedState('all');
  }, [selectedCountry]);

  // Reset pagination when any search/filter parameter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedCountry, selectedState, selectedTier, selectedCost, sortBy]);

  // Filter universities based on all search criteria
  const filteredUniversities = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    return universities.filter((uni) => {
      // 1. Text Search across multiple key fields
      if (q) {
        const nameMatch = uni.name?.toLowerCase().includes(q);
        const locationMatch = uni.location?.toLowerCase().includes(q);
        const stateMatch = uni.stateProvince?.toLowerCase().includes(q);
        const countryMatch = uni.country?.toLowerCase().includes(q);
        const alphaMatch = uni.alphaTwoCode?.toLowerCase() === q;
        const domainMatch = uni.domains?.some((d) => d.toLowerCase().includes(q));
        const benchmarkMatch = uni.entryBenchmark?.toLowerCase().includes(q);
        const costMatch = uni.costReality?.toLowerCase().includes(q);
        const rankMatch = uni.rankBadge?.toLowerCase().includes(q);

        if (!nameMatch && !locationMatch && !stateMatch && !countryMatch && !alphaMatch && !domainMatch && !benchmarkMatch && !costMatch && !rankMatch) {
          return false;
        }
      }

      // 2. Country Filter
      if (selectedCountry !== 'all') {
        if (uni.country?.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }
      }

      // 3. State / Province Filter
      if (selectedState !== 'all') {
        if (uni.stateProvince?.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }
      }

      // 4. Ranking / Institutional Tier Filter
      if (selectedTier !== 'all') {
        const rankText = (uni.rankBadge || '').toLowerCase();
        if (selectedTier === 'top25') {
          if (!rankText.includes('top 25') && !rankText.includes('top 10') && !rankText.includes('top 5')) {
            return false;
          }
        } else if (selectedTier === 'top100') {
          if (!rankText.includes('top 100') && !rankText.includes('top 50') && !rankText.includes('top 25') && !rankText.includes('top 10')) {
            return false;
          }
        } else if (selectedTier === 'major') {
          if (!rankText.includes('qs') && !rankText.includes('times') && !rankText.includes('nirf') && !rankText.includes('rookies')) {
            return false;
          }
        } else if (selectedTier === 'specialized') {
          if (!rankText.includes('special') && !rankText.includes('boutique') && !rankText.includes('animation') && !rankText.includes('film') && !rankText.includes('media')) {
            return false;
          }
        }
      }

      // 5. Cost / Tuition Filter
      if (selectedCost !== 'all') {
        const costText = (uni.costReality || '').toLowerCase();
        if (selectedCost === 'public') {
          if (!costText.includes('public') && !costText.includes('free') && !costText.includes('nominal') && !costText.includes('government') && !costText.includes('subsidized') && !costText.includes('₹25,000') && !costText.includes('€0')) {
            return false;
          }
        } else if (selectedCost === 'private') {
          if (!costText.includes('private') && !costText.includes('cad 3') && !costText.includes('usd 4') && !costText.includes('usd 5') && !costText.includes('usd 6') && !costText.includes('lakh')) {
            return false;
          }
        } else if (selectedCost === 'mid') {
          if (!costText.includes('cad 1') && !costText.includes('cad 2') && !costText.includes('usd 1') && !costText.includes('usd 2') && !costText.includes('moderate')) {
            return false;
          }
        }
      }

      return true;
    });
  }, [universities, searchTerm, selectedCountry, selectedState, selectedTier, selectedCost]);

  // Sort filtered universities
  const sortedUniversities = useMemo(() => {
    const list = [...filteredUniversities];
    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'country') {
      list.sort((a, b) => (a.country || '').localeCompare(b.country || '') || a.name.localeCompare(b.name));
    } else if (sortBy === 'ranked') {
      list.sort((a, b) => {
        const aRanked = a.rankBadge && !a.rankBadge.toLowerCase().includes('no verified published');
        const bRanked = b.rankBadge && !b.rankBadge.toLowerCase().includes('no verified published');
        if (aRanked && !bRanked) return -1;
        if (!aRanked && bRanked) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }, [filteredUniversities, sortBy]);

  // Paginated visible slice
  const displayedUniversities = useMemo(() => {
    return sortedUniversities.slice(0, visibleCount);
  }, [sortedUniversities, visibleCount]);

  // Reset all filters
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setSelectedState('all');
    setSelectedTier('all');
    setSelectedCost('all');
    setSortBy('name-asc');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, sortedUniversities.length));
  };

  const hasActiveFilters = Boolean(
    searchTerm || 
    selectedCountry !== 'all' || 
    selectedState !== 'all' || 
    selectedTier !== 'all' || 
    selectedCost !== 'all' ||
    sortBy !== 'name-asc'
  );

  return (
    <div className="w-full flex flex-col">
      {/* 1. EDITORIAL HEADER BANNER */}
      <section className={`w-full bg-[#fef2e6] border-b border-[#e7d8c7] ${isMobile ? 'py-8 px-4' : 'py-12 px-6'}`}>
        <div className="max-w-[1160px] mx-auto space-y-4">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#7A6259]">
            <span>Open Academic Archive</span>
            <span className="text-[#B3A093]">/</span>
            <span className="text-[#8d6e63]">Universities Registry</span>
            <span className="text-[#B3A093]">/</span>
            <span className="text-[#B3A093]">{universities.length.toLocaleString()} Institutions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbf5ee] text-[#b87f72] text-[10px] uppercase font-bold tracking-wider shadow-xs border border-[#e7d8c7]">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span>OpenDoors Master Registry · 100% Free For Students</span>
              </div>

              <h1 className={`${isMobile ? 'text-[2rem] leading-[1.15]' : 'text-[2.8rem] leading-[1.12]'} font-bold text-[#4A3229] tracking-tight`}>
                Search any university. <br className="hidden sm:inline" />
                <span className="font-editorial italic font-normal text-[#8d6e63]">
                  Select to inspect comprehensive details.
                </span>
              </h1>

              <p className="text-xs lg:text-sm text-[#7A6259] max-w-2xl leading-relaxed">
                Filter by country, state/province, institutional tier, tuition profile, or search directly by institution name, city, and web domain. Click any card to inspect full rankings, eligibility, and verified tuition reality.
              </p>
            </div>

            {/* Independent Registry Standards Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#fbf5ee] p-4 lg:p-5 rounded-2xl shadow-xs border border-[#e7d8c7] space-y-2">
                <div className="flex items-center gap-2 text-[#4A3229]">
                  <span className="material-symbols-outlined text-base text-[#b87f72]">policy</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Independent Registry Standards
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-[#7A6259]">
                  <span className="flex items-center gap-1.5 bg-[#f8ece1]/70 px-2.5 py-1.5 rounded-lg border border-[#e7d8c7]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b87f72]"></span>100% Unsponsored
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#f8ece1]/70 px-2.5 py-1.5 rounded-lg border border-[#e7d8c7]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b87f72]"></span>Zero Commission
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#f8ece1]/70 px-2.5 py-1.5 rounded-lg border border-[#e7d8c7]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b87f72]"></span>Audited Gazette
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#f8ece1]/70 px-2.5 py-1.5 rounded-lg border border-[#e7d8c7]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b87f72]"></span>No Paid Placement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & ADVANCED FILTER CONTROLS */}
      <section className="w-full bg-[#fff8f4] py-5 sticky top-20 z-30 shadow-xs border-b border-[#e7d8c7]/60 backdrop-blur-md bg-[#fff8f4]/95">
        <div className="max-w-[1160px] mx-auto px-4 lg:px-6 space-y-3.5">
          
          {/* Quick Destination Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] uppercase font-bold text-[#7A6259] shrink-0 mr-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-[#b87f72]" />
              <span>Quick Jump:</span>
            </span>
            {TOP_DESTINATIONS.map((dest) => {
              const isActive = selectedCountry === dest.key;
              return (
                <button
                  key={dest.key}
                  onClick={() => {
                    setSelectedCountry(dest.key);
                    setSelectedState('all');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#8d6e63] text-white shadow-xs'
                      : 'bg-[#fbf5ee] hover:bg-[#f3e2db] text-[#4A3229] border border-[#e7d8c7]/70'
                  }`}
                >
                  <span>{dest.icon}</span>
                  <span>{dest.label}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Search Bar Row */}
          <div className="bg-[#fbf5ee] p-3 rounded-2xl shadow-xs border border-[#e7d8c7] flex flex-col md:flex-row items-center gap-3">
            {/* Multi-Field Search Input */}
            <div className="relative flex-1 w-full flex items-center">
              <Search className="text-[#7A6259] absolute left-3.5 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by university name, state, city, ISO code (e.g. US, IN, CA), or website domain..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] placeholder-[#B3A093] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 text-xs text-[#7A6259] hover:text-[#4A3229] p-1 cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Country Selector */}
            <div className="relative w-full md:w-56 shrink-0">
              <Globe2 className="text-[#7A6259] absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState('all');
                }}
                className="w-full pl-9 pr-8 py-2.5 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50 cursor-pointer appearance-none truncate"
              >
                <option value="all">All Countries ({universities.length.toLocaleString()})</option>
                {availableCountries.map(([val, { label, count }]) => (
                  <option key={val} value={val}>
                    {label} ({count.toLocaleString()})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6259] text-[10px]">
                ▼
              </div>
            </div>

            {/* Advanced Filters Toggle Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3.5 py-2.5 text-xs rounded-xl border transition-all font-medium flex items-center justify-center gap-1.5 shrink-0 w-full md:w-auto cursor-pointer ${
                showAdvancedFilters || (selectedState !== 'all' || selectedTier !== 'all' || selectedCost !== 'all')
                  ? 'bg-[#8d6e63] text-white border-[#8d6e63]'
                  : 'bg-[#fef2e6] text-[#7A6259] hover:text-[#4A3229] border-[#e7d8c7]/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {(selectedState !== 'all' || selectedTier !== 'all' || selectedCost !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-[#f5c8d0] ml-0.5"></span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs text-[#8d6e63] hover:text-[#72564c] hover:bg-[#ede0d2]/50 rounded-xl transition-colors font-medium shrink-0 cursor-pointer"
                title="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>

          {/* Secondary Row: State/Province, Ranking Tier, Cost Profile & Sort */}
          {showAdvancedFilters && (
            <div className="bg-[#fbf5ee] p-4 rounded-2xl border border-[#e7d8c7] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
              {/* Field 1: State / Province */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#b87f72]" />
                  <span>State / Province</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50 cursor-pointer appearance-none truncate"
                  >
                    <option value="all">
                      {selectedCountry === 'all' ? 'All States/Provinces' : `All in ${selectedCountry}`}
                    </option>
                    {availableStates.map(([stateName, count]) => (
                      <option key={stateName} value={stateName}>
                        {stateName} ({count})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6259] text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 2: Ranking / Tier */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-[#b87f72]" />
                  <span>Standing & Tier</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50 cursor-pointer appearance-none truncate"
                  >
                    <option value="all">All Tiers & Standings</option>
                    <option value="top25">Top 10 / Top 25 Tier</option>
                    <option value="top100">Top 50 / Top 100 Ranked</option>
                    <option value="major">Major League (QS / Times / NIRF)</option>
                    <option value="specialized">Specialized / Creative / Boutique</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6259] text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 3: Tuition & Cost Profile */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-[#b87f72]" />
                  <span>Tuition Structure</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCost}
                    onChange={(e) => setSelectedCost(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50 cursor-pointer appearance-none truncate"
                  >
                    <option value="all">All Tuition Profiles</option>
                    <option value="public">Public / Subsidized / Low-Cost</option>
                    <option value="mid">Moderate / Standard Bracket</option>
                    <option value="private">Private / Premium Tuition</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6259] text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 4: Sort By */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#7A6259] flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3 text-[#b87f72]" />
                  <span>Sort Order</span>
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full pl-3 pr-7 py-2 bg-[#fef2e6] rounded-xl text-xs text-[#4A3229] focus:outline-none focus:bg-[#f8ece1] transition-all border border-[#e7d8c7]/50 cursor-pointer appearance-none truncate"
                  >
                    <option value="name-asc">Alphabetical (A → Z)</option>
                    <option value="name-desc">Alphabetical (Z → A)</option>
                    <option value="ranked">Prominent / Ranked First</option>
                    <option value="country">Country (A → Z)</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6259] text-[10px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#7A6259]">Active Filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-[11px] font-medium border border-[#e7d8c7]">
                  <span>Search: &ldquo;{searchTerm}&rdquo;</span>
                  <button onClick={() => setSearchTerm('')} className="hover:text-[#ba1a1a] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCountry !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-[11px] font-medium border border-[#e7d8c7]">
                  <span>Country: {selectedCountry}</span>
                  <button onClick={() => setSelectedCountry('all')} className="hover:text-[#ba1a1a] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-[11px] font-medium border border-[#e7d8c7]">
                  <span>State: {selectedState}</span>
                  <button onClick={() => setSelectedState('all')} className="hover:text-[#ba1a1a] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedTier !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-[11px] font-medium border border-[#e7d8c7]">
                  <span>Tier: {selectedTier}</span>
                  <button onClick={() => setSelectedTier('all')} className="hover:text-[#ba1a1a] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCost !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8ece1] text-[#4A3229] text-[11px] font-medium border border-[#e7d8c7]">
                  <span>Tuition: {selectedCost}</span>
                  <button onClick={() => setSelectedCost('all')} className="hover:text-[#ba1a1a] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleReset}
                className="text-[11px] text-[#8d6e63] hover:text-[#72564c] underline ml-1 cursor-pointer font-semibold"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Match Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b87f72] animate-pulse"></span>
              <p className="text-[11px] font-bold tracking-wider text-[#7A6259]">
                Showing <strong className="text-[#4A3229]">{displayedUniversities.length.toLocaleString()}</strong> of{' '}
                <strong className="text-[#4A3229]">{sortedUniversities.length.toLocaleString()}</strong> matched institutions
                {sortedUniversities.length < universities.length && (
                  <span className="text-[#B3A093] ml-1">({universities.length.toLocaleString()} total in registry)</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#8d6e63]">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Select any institution card to inspect detailed rankings, eligibility & verified tuition.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNIVERSITIES CARDS GRID - CLEAN & MINIMAL (ONLY NAME & LOCATION) */}
      <section className="w-full py-8 lg:py-12">
        <div className="max-w-[1160px] mx-auto px-4 lg:px-6">
          {sortedUniversities.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-[#fbf5ee] rounded-3xl border border-[#e7d8c7] p-8 max-w-lg mx-auto">
              <span className="material-symbols-outlined text-4xl text-[#B3A093]">search_off</span>
              <h3 className="text-base font-bold text-[#4A3229]">No matching universities found</h3>
              <p className="text-xs text-[#7A6259]">
                Try adjusting your search criteria, clearing state/province, or switching country filters.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-5 py-2 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedUniversities.map((uni) => {
                  const isBookmarked = bookmarkedIds.includes(uni.id);

                  return (
                    <article
                      key={uni.id}
                      onClick={() => setSelectedUniForModal(uni)}
                      className="group relative flex flex-col justify-between bg-[#fbf5ee] hover:bg-[#fffdf9] rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-[#e7d8c7] cursor-pointer"
                    >
                      <div className="space-y-3">
                        {/* Top Header: Location Pill & Bookmark Action */}
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
                            className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                              isBookmarked 
                                ? 'text-[#b87f72] bg-[#f8ece1]' 
                                : 'text-[#B3A093] hover:text-[#b87f72] hover:bg-[#f8ece1]'
                            }`}
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark university'}
                            aria-label="Bookmark"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-[#b87f72]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Prominent University Name (Only Name & Location per brief) */}
                        <h3 className="text-base font-bold text-[#4A3229] group-hover:text-[#8d6e63] transition-colors leading-snug line-clamp-2">
                          {uni.name}
                        </h3>
                      </div>

                      {/* Clean Card Footer: Minimal Action */}
                      <div className="pt-4 mt-4 border-t border-[#e7d8c7]/60 flex items-center justify-between text-xs text-[#8d6e63]">
                        <span className="text-[11px] font-medium text-[#7A6259] group-hover:text-[#4A3229] transition-colors">
                          View full profile & criteria
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#f8ece1] group-hover:bg-[#8d6e63] group-hover:text-white flex items-center justify-center transition-all">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#72564c] group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Progressive Load More pagination */}
              {visibleCount < sortedUniversities.length && (
                <div className="mt-10 text-center space-y-3">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8d6e63] text-white text-xs font-semibold hover:bg-[#72564c] transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Load next {Math.min(ITEMS_PER_PAGE, sortedUniversities.length - visibleCount).toLocaleString()} universities</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#7A6259]">
                    Showing {displayedUniversities.length.toLocaleString()} of {sortedUniversities.length.toLocaleString()} institutions
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* University Detail Modal (Spacious, Detailed) */}
      <UniversityDetailModal
        university={selectedUniForModal}
        isOpen={Boolean(selectedUniForModal)}
        onClose={() => setSelectedUniForModal(null)}
        isBookmarked={selectedUniForModal ? bookmarkedIds.includes(selectedUniForModal.id) : false}
        onToggleBookmark={(id) => onToggleBookmark(id)}
        onOpenCorrectionForm={(uniName?: string) => {
          setSelectedUniForModal(null);
          onOpenCorrectionForm(uniName);
        }}
      />

      {/* Audit Protocol Modal */}
      <AuditProtocolModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* 4. FOUNDATION METHODOLOGY & RESEARCH ETHICS BANNER */}
      <section className="w-full bg-[#f8ece1] py-12 px-4 lg:px-6 border-t border-[#e7d8c7] mt-8">
        <div className="max-w-[1160px] mx-auto">
          <div className="bg-[#fff8f4] p-6 lg:p-8 rounded-3xl border border-[#e7d8c7] shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-1.5 text-[#b87f72]">
                  <span className="material-symbols-outlined text-base">gavel</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    The OpenDoors Foundation Covenant
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#4A3229]">
                  How OpenDoors audits institutions.
                </h2>
                <p className="text-xs text-[#7A6259] leading-relaxed max-w-2xl">
                  We do not accept institutional sponsorships, enrollment commissions, or sponsored ranking placements. All prerequisites and tuition numbers are extracted directly from official university gazettes, statutory fee regulation authorities, and verified RTI filings.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3 text-[#7A6259] text-[10px] uppercase font-bold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#b87f72]">check_circle</span> Statutory Gazette Sourced
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#b87f72]">check_circle</span> No Consultant Affiliation
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#b87f72]">check_circle</span> Open Access RTI Files
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-2.5">
                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#72564c] text-white text-xs font-semibold hover:bg-[#5b4137] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Audit Code</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
