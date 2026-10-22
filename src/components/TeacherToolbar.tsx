import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Highlighter, 
  Zap, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { TeacherSettings } from '../types/economy';

interface TeacherToolbarProps {
  settings: TeacherSettings;
  onUpdateSettings: (updater: (prev: TeacherSettings) => TeacherSettings) => void;
  onOpenHandbook: () => void;
  unitTitle: string;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  settings,
  onUpdateSettings,
  onOpenHandbook,
  unitTitle,
}) => {
  const handlePrevStep = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      stepRevealed: Math.max(1, prev.stepRevealed - 1),
    }));
  };

  const handleNextStep = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      stepRevealed: Math.min(prev.maxSteps, prev.stepRevealed + 1),
    }));
  };

  const handleRevealAll = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      stepRevealed: prev.maxSteps,
    }));
  };

  const handleResetStep = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      stepRevealed: 1,
    }));
  };

  const toggleTeacherNotes = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      teacherNotesVisible: !prev.teacherNotesVisible,
    }));
  };

  const toggleHighlight = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      highlightKeyTerms: !prev.highlightKeyTerms,
    }));
  };

  const toggleSkipAnimations = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      skipAnimations: !prev.skipAnimations,
    }));
  };

  return (
    <div className="sticky bottom-4 z-30 mx-auto max-w-4xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-[#131E30]/95 backdrop-blur-md border border-[#E5B65C]/40 rounded-2xl shadow-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Left: Step controller */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-1 rounded-md border border-[#E5B65C]/30 hidden sm:inline">
            교사용 진행
          </span>

          <div className="flex items-center bg-slate-900/90 rounded-lg border border-slate-700/80 p-0.5">
            <button
              onClick={handlePrevStep}
              disabled={settings.stepRevealed <= 1}
              className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="이전 단계로 돌아가기 (Alt+Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono px-2.5 font-bold text-slate-200">
              {settings.stepRevealed} / {settings.maxSteps}
            </span>

            <button
              onClick={handleNextStep}
              disabled={settings.stepRevealed >= settings.maxSteps}
              className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="다음 개념 공개 (Alt+Right / Space)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {settings.stepRevealed < settings.maxSteps ? (
            <button
              onClick={handleRevealAll}
              className="text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
              title="현재 단원 모든 개념 한번에 펼치기"
            >
              전체 공개
            </button>
          ) : (
            <button
              onClick={handleResetStep}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              title="1단계로 리셋"
            >
              1단계로
            </button>
          )}
        </div>

        {/* Center: Current Unit Context */}
        <div className="hidden lg:flex items-center text-xs text-slate-300 truncate max-w-xs">
          <span className="text-slate-400 mr-1.5">진행 중:</span>
          <span className="font-medium text-slate-200 truncate">{unitTitle}</span>
        </div>

        {/* Right: Functional Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Teacher Commentary Toggle */}
          <button
            onClick={toggleTeacherNotes}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              settings.teacherNotesVisible
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="학생 화면에 숨겨진 교사용 해설 표시/숨기기"
          >
            {settings.teacherNotesVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">해설 {settings.teacherNotesVisible ? 'ON' : 'OFF'}</span>
          </button>

          {/* Key Term Highlighter */}
          <button
            onClick={toggleHighlight}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              settings.highlightKeyTerms
                ? 'bg-[#E5B65C]/20 text-[#E5B65C] border-[#E5B65C]/50'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="수능·내신 출제 핵심 어구 형광펜 강조"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">핵심강조</span>
          </button>

          {/* Skip animations */}
          <button
            onClick={toggleSkipAnimations}
            className={`p-1.5 text-xs font-medium rounded-lg border transition-colors ${
              settings.skipAnimations
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={settings.skipAnimations ? '애니메이션 복원' : '애니메이션 건너뛰기 (빠른 수업용)'}
          >
            <Zap className="w-3.5 h-3.5" />
          </button>

          {/* Handbook Modal */}
          <button
            onClick={onOpenHandbook}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#E5B65C] text-slate-950 hover:bg-[#d8a84e] transition-colors"
            title="현재 단원 교사용 지도서 보기"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>지도 팁</span>
          </button>
        </div>
      </div>
    </div>
  );
};
