import React, { useState, useEffect } from 'react';
import { useDevice } from './hooks/useDevice';
import { ActiveTab, TopologyNode, University, StudentDilemma } from './types';
import { fetchUniversitiesFromSupabase, getStoredSubmissions } from './services/supabaseService';

// Components
import { DesktopHeader } from './components/DesktopHeader';
import { MobileHeader } from './components/MobileHeader';
import { MobileNav } from './components/MobileNav';
import { TopologyDetailModal } from './components/TopologyDetailModal';
import { Footer } from './components/Footer';

// Views
import { PathwaysView } from './views/PathwaysView';
import { UniversitiesView } from './views/UniversitiesView';
import { AskUsView } from './views/AskUsView';
import { SavedView } from './views/SavedView';
import { FolioView } from './views/FolioView';
import { CorrectionReportView } from './views/CorrectionReportView';

export default function App() {
  const { isMobile } = useDevice();
  const [activeTab, setActiveTab] = useState<ActiveTab>('pathways');
  const [universities, setUniversities] = useState<University[]>([]);
  const [, setIsLoadingUniversities] = useState(true);
  const [selectedTopologyNode, setSelectedTopologyNode] = useState<TopologyNode | null>(null);
  const [submissions, setSubmissions] = useState<StudentDilemma[]>([]);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('opendoors_bookmarks');
      return saved ? JSON.parse(saved) : ['row-1', 'row-2'];
    } catch {
      return ['row-1', 'row-2'];
    }
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('opendoors_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Load universities
  const refreshUniversities = async () => {
    setIsLoadingUniversities(true);
    try {
      const data = await fetchUniversitiesFromSupabase();
      setUniversities(data);
    } catch (err) {
      console.error('Failed to load universities:', err);
    } finally {
      setIsLoadingUniversities(false);
    }
  };

  useEffect(() => {
    refreshUniversities();
    setSubmissions(getStoredSubmissions());
  }, []);

  const handleSubmissionsUpdated = () => {
    setSubmissions(getStoredSubmissions());
  };

  const handleSubmissionComplete = () => {
    setSubmissions(getStoredSubmissions());
  };

  const [correctionPrefillUni, setCorrectionPrefillUni] = useState<string>('');

  const handleOpenCorrection = (uniName?: string) => {
    setCorrectionPrefillUni(uniName || '');
    setActiveTab('correction-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#fff8f4] text-[#1b1c18] font-sans flex flex-col selection:bg-[#ffdad6] selection:text-[#410002] ${isMobile ? 'pb-20' : ''}`}>
      {/* Responsive Header */}
      {isMobile ? (
        <MobileHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      ) : (
        <DesktopHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'pathways' && (
          <PathwaysView
            isMobile={isMobile}
            onNavigate={setActiveTab}
            onSelectNode={(node) => setSelectedTopologyNode(node)}
          />
        )}

        {activeTab === 'universities' && (
          <UniversitiesView
            universities={universities}
            isMobile={isMobile}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onOpenCorrectionForm={handleOpenCorrection}
          />
        )}

        {activeTab === 'ask-us' && (
          <AskUsView
            isMobile={isMobile}
            onSubmissionComplete={handleSubmissionComplete}
          />
        )}

        {activeTab === 'saved' && (
          <SavedView
            universities={universities}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onExplore={() => setActiveTab('universities')}
          />
        )}

        {activeTab === 'folio' && (
          <FolioView
            submissions={submissions}
            onSubmissionsUpdated={handleSubmissionsUpdated}
            onNewInquiry={() => setActiveTab('ask-us')}
          />
        )}

        {/* Secret / Dedicated Correction Form (Only accessible via hidden credit link) */}
        {activeTab === 'correction-report' && (
          <CorrectionReportView
            initialUniversityName={correctionPrefillUni}
            onBack={() => setActiveTab('universities')}
          />
        )}
      </main>

      {/* Unified Footer with Share capabilities & hidden mistake reporting link */}
      <Footer
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMobile={isMobile}
      />

      {/* Bottom Nav for Mobile */}
      {isMobile && (
        <MobileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          savedCount={bookmarkedIds.length}
          folioCount={submissions.length}
        />
      )}

      {/* Topology Detail Modal */}
      <TopologyDetailModal
        node={selectedTopologyNode}
        onClose={() => setSelectedTopologyNode(null)}
        onAskFounders={() => {
          setSelectedTopologyNode(null);
          setActiveTab('ask-us');
        }}
      />
    </div>
  );
}
