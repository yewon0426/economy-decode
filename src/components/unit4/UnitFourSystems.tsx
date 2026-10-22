import React, { useState } from 'react';
import { ECONOMIC_SYSTEMS } from '../../data/curriculumData';
import { EconomicSystemType, TeacherSettings } from '../../types/economy';
import { 
  Layers, 
  Check, 
  X, 
  AlertTriangle, 
  GraduationCap, 
  Scale, 
  HelpCircle,
  Building,
  Activity
} from 'lucide-react';

interface UnitFourSystemsProps {
  teacherSettings: TeacherSettings;
}

export const UnitFourSystems: React.FC<UnitFourSystemsProps> = ({ teacherSettings }) => {
  const [activeSystemType, setActiveSystemType] = useState<EconomicSystemType>('market');

  const system = ECONOMIC_SYSTEMS[activeSystemType];

  const SYSTEM_LIST: { id: EconomicSystemType; name: string; color: string; desc: string }[] = [
    { id: 'market', name: '시장경제체제', color: 'text-teal-400 border-teal-500/40', desc: '시장 가격 기구 중심' },
    { id: 'planned', name: '계획경제체제', color: 'text-purple-400 border-purple-500/40', desc: '중앙 정부 계획 중심' },
    { id: 'mixed', name: '혼합 경제체제', color: 'text-[#E5B65C] border-[#E5B65C]/40', desc: '시장 자율과 정부 개입 조화' }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Unit Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 04 · TAXONOMY
          </span>
          <span className="text-xs text-slate-400">자원 배분과 생산수단에 따른 경제체제</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          경제체제의 3대 유형 (시장 · 계획 · 혼합)
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          경제 문제는 <span className="text-teal-400 font-semibold">시장 가격 기구</span>에 맡기느냐, <span className="text-purple-400 font-semibold">정부의 중앙 계획</span>에 맡기느냐, 혹은 <span className="text-[#E5B65C] font-semibold">두 방식을 조화</span>시키느냐에 따라 서로 다른 경제체제로 분류됩니다.
        </p>
      </div>

      {/* 3 System Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SYSTEM_LIST.map((sys) => {
          const isSelected = sys.id === activeSystemType;
          return (
            <button
              key={sys.id}
              onClick={() => setActiveSystemType(sys.id)}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-[#131E30] border-current shadow-lg text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              } ${sys.color}`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-current" />
              )}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                  {sys.desc}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {sys.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active System Comprehensive Specification */}
      <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        {/* System Title and Badge */}
        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${system.badgeBg}`}>
                {system.badgeText}
              </span>
              <span className="text-xs text-slate-400">자원 배분 메커니즘 심층 규명</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {system.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            {system.summary}
          </p>
        </div>

        {/* 5 Core Facets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Facet 1: 자원 배분 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-[#E5B65C] uppercase tracking-wider block">
              1. 자원 배분 방식
            </span>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {system.resourceAllocation}
            </p>
          </div>

          {/* Facet 2: 경제활동 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              2. 경제활동 의사결정
            </span>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {system.economicActivity}
            </p>
          </div>

          {/* Facet 3: 생산수단 소유 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              3. 생산수단의 소유 형태
            </span>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {system.meansOfProduction}
            </p>
          </div>

          {/* Facet 4: 정부의 역할 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              4. 정부(국가)의 주된 역할
            </span>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {system.roleOfGovernment}
            </p>
          </div>

          {/* Facet 5: 경제적 유인 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 md:col-span-2 lg:col-span-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              5. 경제적 유인(동기) 구조
            </span>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {system.economicIncentive}
            </p>
          </div>
        </div>

        {/* Pros & Cons Comparison Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Advantages */}
          <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>체제의 핵심 장점 (Advantages)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {system.advantages.map((adv, aIdx) => (
                <li key={aIdx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <X className="w-4 h-4 text-rose-400" />
              <span>체제의 구조적 한계 (Limitations)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              {system.limitations.map((lim, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vital High-School Exam Caveat Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-[#E5B65C]/40 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#E5B65C] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#E5B65C] block mb-0.5">
              반드시 기억할 교육과정 핵심 주의사항:
            </strong>
            {system.vitalCaveat}
          </div>
        </div>

        {/* Teacher Note */}
        {teacherSettings.teacherNotesVisible && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>교사용 체제 비교 수업 팁</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              {system.teacherNote}
            </p>
          </div>
        )}
      </div>

      {/* Special Constitutional Linkage Card */}
      <div className="p-5 rounded-2xl bg-[#131E30] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#E5B65C]" />
          <h4 className="text-base font-bold text-white">
            대한민국 헌법과 혼합 경제체제의 법적 근거
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="font-bold text-teal-400 block mb-1">
              헌법 제119조 제1항 (시장경제의 원칙)
            </span>
            <p className="text-slate-300 italic">
              "대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다."
            </p>
            <span className="text-[11px] text-slate-400 mt-2 block">
              → 사유재산권과 자유 경쟁 시장 질서를 천명
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="font-bold text-[#E5B65C] block mb-1">
              헌법 제119조 제2항 (정부 개입과 경제 민주화)
            </span>
            <p className="text-slate-300 italic">
              "국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며..."
            </p>
            <span className="text-[11px] text-slate-400 mt-2 block">
              → 시장 실패 교정 및 복지국가적 정부 개입을 헌법상 보장
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
