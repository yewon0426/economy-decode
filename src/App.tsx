import React, { useState, useEffect, useCallback } from 'react';
import { UnitId, TeacherSettings } from './types/economy';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TeacherToolbar } from './components/TeacherToolbar';
import { TeacherNotesModal } from './components/TeacherNotesModal';
import { UnitOneMeaning } from './components/unit1/UnitOneMeaning';
import { UnitTwoFeatures } from './components/unit2/UnitTwoFeatures';
import { UnitThreeHistory } from './components/unit3/UnitThreeHistory';
import { UnitFourSystems } from './components/unit4/UnitFourSystems';
import { UnitFiveComparisonLab } from './components/unit5/UnitFiveComparisonLab';
import { UnitSixExamChecker } from './components/unit6/UnitSixExamChecker';
import { UNITS_LIST } from './data/curriculumData';
import { MonitorPlay, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

const UNIT_MAX_STEPS: Record<UnitId, number> = {
  'unit-1': 5,
  'unit-2': 4,
  'unit-3': 5,
  'unit-4': 3,
  'unit-5': 3,
  'unit-6': 1,
};

export default function App() {
  const [activeUnit, setActiveUnit] = useState<UnitId>('unit-1');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(true); // Enabled by default for teacher convenience
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTeacherNotesModalOpen, setIsTeacherNotesModalOpen] = useState<boolean>(false);
  const [isProjector16to9, setIsProjector16to9] = useState<boolean>(false);

  // Teacher presentation settings
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>({
    teacherNotesVisible: false,
    highlightKeyTerms: true,
    skipAnimations: false,
    stepRevealed: 5, // fully revealed by default, teachers can step backward/forward
    maxSteps: 5,
  });

  // When active unit changes, update maxSteps
  const handleSelectUnit = useCallback((unitId: UnitId) => {
    setActiveUnit(unitId);
    setTeacherSettings((prev) => ({
      ...prev,
      maxSteps: UNIT_MAX_STEPS[unitId],
      stepRevealed: UNIT_MAX_STEPS[unitId],
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 't' || e.key === 'T') {
        setIsTeacherMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsTeacherNotesModalOpen(false);
      } else if (isTeacherMode && (e.altKey || e.metaKey)) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setTeacherSettings(prev => ({
            ...prev,
            stepRevealed: Math.min(prev.maxSteps, prev.stepRevealed + 1)
          }));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setTeacherSettings(prev => ({
            ...prev,
            stepRevealed: Math.max(1, prev.stepRevealed - 1)
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTeacherMode]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Find active unit object
  const currentUnitInfo = UNITS_LIST.find(u => u.id === activeUnit) || UNITS_LIST[0];
  const currentUnitIndex = UNITS_LIST.findIndex(u => u.id === activeUnit);

  const handleNextUnit = () => {
    if (currentUnitIndex < UNITS_LIST.length - 1) {
      handleSelectUnit(UNITS_LIST[currentUnitIndex + 1].id);
    }
  };

  const handlePrevUnit = () => {
    if (currentUnitIndex > 0) {
      handleSelectUnit(UNITS_LIST[currentUnitIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex flex-col selection:bg-[#E5B65C]/30 selection:text-[#E5B65C]">
      {/* Top Bar Header */}
      <Header
        activeUnit={activeUnit}
        onSelectUnit={handleSelectUnit}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={() => setIsTeacherMode(!isTeacherMode)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenTeacherNotes={() => setIsTeacherNotesModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigator Sidebar */}
        <Sidebar
          activeUnit={activeUnit}
          onSelectUnit={handleSelectUnit}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Central Content Area */}
        <main className="flex-1 overflow-y-auto min-w-0 bg-[#0B1220]">
          {/* Unit Stage Wrapper */}
          <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${
            isProjector16to9 ? 'max-w-[1500px] aspect-[16/9]' : 'max-w-7xl'
          }`}>
            {/* Unit Progression Top Breadcrumb & 16:9 Switcher */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#E5B65C]">
                  {currentUnitInfo.number}
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-300 font-medium">
                  {currentUnitInfo.title}
                </span>
              </div>

              {/* 16:9 Aspect toggle & Unit Prev/Next Quick Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsProjector16to9(!isProjector16to9)}
                  className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    isProjector16to9
                      ? 'bg-[#E5B65C]/20 text-[#E5B65C] border-[#E5B65C]/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title="교실 프로젝터 16:9 프레임 모드 전환"
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span>16:9 프로젝터 뷰</span>
                </button>

                <div className="flex items-center bg-slate-900 rounded-md border border-slate-800 p-0.5">
                  <button
                    onClick={handlePrevUnit}
                    disabled={currentUnitIndex === 0}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    title="이전 단원으로 이동"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono px-2 text-slate-300">
                    {currentUnitIndex + 1} / {UNITS_LIST.length}
                  </span>
                  <button
                    onClick={handleNextUnit}
                    disabled={currentUnitIndex === UNITS_LIST.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    title="다음 단원으로 이동"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Unit Component Routing */}
            {activeUnit === 'unit-1' && (
              <UnitOneMeaning teacherSettings={teacherSettings} />
            )}
            {activeUnit === 'unit-2' && (
              <UnitTwoFeatures teacherSettings={teacherSettings} />
            )}
            {activeUnit === 'unit-3' && (
              <UnitThreeHistory teacherSettings={teacherSettings} />
            )}
            {activeUnit === 'unit-4' && (
              <UnitFourSystems teacherSettings={teacherSettings} />
            )}
            {activeUnit === 'unit-5' && (
              <UnitFiveComparisonLab teacherSettings={teacherSettings} />
            )}
            {activeUnit === 'unit-6' && (
              <UnitSixExamChecker teacherSettings={teacherSettings} />
            )}

            {/* Bottom Unit Pagination Navigation Bar */}
            <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
              {currentUnitIndex > 0 ? (
                <button
                  onClick={handlePrevUnit}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs sm:text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4 text-[#E5B65C]" />
                  <span>이전: {UNITS_LIST[currentUnitIndex - 1].title}</span>
                </button>
              ) : <div />}

              {currentUnitIndex < UNITS_LIST.length - 1 ? (
                <button
                  onClick={handleNextUnit}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E5B65C] text-slate-950 hover:bg-[#d8a84e] transition-colors text-xs sm:text-sm font-bold shadow-md shadow-[#E5B65C]/10"
                >
                  <span>다음: {UNITS_LIST[currentUnitIndex + 1].title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSelectUnit('unit-1')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors text-xs sm:text-sm font-medium"
                >
                  <span>처음으로 (UNIT 01)</span>
                </button>
              )}
            </div>

            {/* Classroom Footer Trust Notes */}
            <footer className="mt-12 py-6 border-t border-slate-800/60 text-center text-xs text-slate-400 space-y-1">
              <p className="font-medium text-slate-400">
                ECONOMY DECODE — 통합사회 경제 개념 마스터 클래스
              </p>
              <p className="text-slate-400 text-[11px]">
                대한민국 2022 개정 교육과정 고등학교 통합사회 기준 · 수능 및 내신 대비 맞춤 설계
              </p>
            </footer>
          </div>
        </main>
      </div>

      {/* Teacher Presentation Floating Toolbar (when isTeacherMode is ON) */}
      {isTeacherMode && (
        <TeacherToolbar
          settings={teacherSettings}
          onUpdateSettings={setTeacherSettings}
          onOpenHandbook={() => setIsTeacherNotesModalOpen(true)}
          unitTitle={`${currentUnitInfo.number} · ${currentUnitInfo.title}`}
        />
      )}

      {/* Teacher Notes Modal */}
      <TeacherNotesModal
        isOpen={isTeacherNotesModalOpen}
        onClose={() => setIsTeacherNotesModalOpen(false)}
        activeUnit={activeUnit}
      />
    </div>
  );
}
