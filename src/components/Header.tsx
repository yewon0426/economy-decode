import React from 'react';
import { UnitId } from '../types/economy';
import { UNITS_LIST } from '../data/curriculumData';
import { GraduationCap, Maximize2, Minimize2, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeUnit: UnitId;
  onSelectUnit: (unitId: UnitId) => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenTeacherNotes: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeUnit,
  onSelectUnit,
  isTeacherMode,
  onToggleTeacherMode,
  isFullscreen,
  onToggleFullscreen,
  onOpenTeacherNotes,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#0B1220]/95 backdrop-blur border-b border-slate-800">
      {/* Zone 1: Single text element wordmark in display face */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onSelectUnit('unit-1'); }}
          className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-[#E5B65C] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-[#E5B65C] font-mono tracking-wider font-extrabold text-xl">ECONOMY DECODE</span>
          <span className="hidden lg:inline text-xs font-normal text-slate-400 border-l border-slate-700 pl-2.5">
            통합사회 경제 마스터 클래스
          </span>
        </a>
      </div>

      {/* Zone 2: 4-6 clean single-line text navigation links */}
      <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
        {UNITS_LIST.map((unit) => {
          const isActive = activeUnit === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className={`transition-colors whitespace-nowrap shrink-0 text-xs 2xl:text-sm font-medium py-1 relative ${
                isActive
                  ? 'text-[#E5B65C] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>{unit.number.replace('UNIT ', 'U')} · {unit.title}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5B65C] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action & Teacher Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {isTeacherMode && (
          <button
            onClick={onOpenTeacherNotes}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-lg hover:bg-amber-900/40 transition-colors whitespace-nowrap shrink-0"
            title="현재 단원 교사용 지도서 보기"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>교사용 지도서</span>
          </button>
        )}

        <button
          onClick={onToggleTeacherMode}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            isTeacherMode
              ? 'bg-[#E5B65C] text-slate-950 font-semibold shadow-sm shadow-[#E5B65C]/20'
              : 'bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700'
          }`}
          title="교사용 단계별 설명 및 해설 모드 활성화"
        >
          <GraduationCap className="w-4 h-4" />
          <span>{isTeacherMode ? '교사용 모드 ON' : '교사용 모드'}</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors shrink-0"
          title={isFullscreen ? '전체화면 종료 (Esc)' : '교실 프로젝터 전체화면 (F)'}
          aria-label={isFullscreen ? '전체화면 종료' : '전체화면 시작'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
