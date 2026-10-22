import React from 'react';
import { UnitId } from '../types/economy';
import { UNITS_LIST } from '../data/curriculumData';
import { 
  Compass, 
  TrendingUp, 
  History, 
  Layers, 
  GitCompare, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeUnit: UnitId;
  onSelectUnit: (unitId: UnitId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const UNIT_ICONS: Record<UnitId, React.ComponentType<{ className?: string }>> = {
  'unit-1': Compass,
  'unit-2': TrendingUp,
  'unit-3': History,
  'unit-4': Layers,
  'unit-5': GitCompare,
  'unit-6': CheckCircle2,
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeUnit,
  onSelectUnit,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside 
      className={`relative shrink-0 bg-[#0B1220] border-r border-slate-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-72 lg:w-80'
      }`}
    >
      {/* Sidebar Header & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
        {!isCollapsed && (
          <div>
            <span className="text-[11px] font-semibold text-[#E5B65C] tracking-wider uppercase block">
              Curriculum Map
            </span>
            <span className="text-sm font-bold text-white">단원 탐색 네비게이터</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto"
          title={isCollapsed ? '사이드바 펼치기' : '사이드바 접기 (16:9 프로젝터 모드)'}
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Units List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {UNITS_LIST.map((unit) => {
          const isActive = activeUnit === unit.id;
          const Icon = UNIT_ICONS[unit.id];

          return (
            <button
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className={`w-full text-left rounded-xl transition-all p-3 flex items-start gap-3 relative group ${
                isActive
                  ? 'bg-[#131E30] text-white border border-[#E5B65C]/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
              title={isCollapsed ? `${unit.number}: ${unit.title}` : undefined}
            >
              {/* Left Accent indicator for active */}
              {isActive && (
                <div className="absolute left-1 top-2.5 bottom-2.5 w-1 bg-[#E5B65C] rounded-full" />
              )}

              <div className={`p-2 rounded-lg shrink-0 ${
                isActive ? 'bg-[#E5B65C]/15 text-[#E5B65C]' : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-[11px] font-semibold tracking-wider font-mono ${
                      isActive ? 'text-[#E5B65C]' : 'text-slate-400'
                    }`}>
                      {unit.number}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold truncate leading-tight text-slate-100">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-1 leading-snug">
                    {unit.subtitle}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-[#0B1220]/60">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>2022 개정 교육과정 기준</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              고등학교 통합사회 4단원: 시장경제와 지속 가능한 발전 연계
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
