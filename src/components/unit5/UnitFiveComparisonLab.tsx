import React, { useState } from 'react';
import { LAB_SCENARIOS, COMPARISON_MATRIX_ROWS } from '../../data/curriculumData';
import { TeacherSettings } from '../../types/economy';
import { 
  GitCompare, 
  FlaskConical, 
  Table, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

interface UnitFiveComparisonLabProps {
  teacherSettings: TeacherSettings;
}

export const UnitFiveComparisonLab: React.FC<UnitFiveComparisonLabProps> = ({ teacherSettings }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [highlightedRowId, setHighlightedRowId] = useState<string>('allocator');

  const currentScenario = LAB_SCENARIOS[selectedScenarioIndex];
  const highlightedRow = COMPARISON_MATRIX_ROWS.find(r => r.id === highlightedRowId) || COMPARISON_MATRIX_ROWS[0];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Unit Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 05 · LAB & MATRIX
          </span>
          <span className="text-xs text-slate-400">ECONOMIC SYSTEM LAB & 매트릭스 비교</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          경제체제 비교 분석 (ECONOMIC SYSTEM LAB)
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          동일한 경제적 위기 상황에 직면했을 때 <span className="text-teal-400 font-semibold">시장경제</span>, <span className="text-purple-400 font-semibold">계획경제</span>, <span className="text-[#E5B65C] font-semibold">혼합경제</span>는 어떻게 다르게 반응할까요?
        </p>
      </div>

      {/* SECTION 1: ECONOMIC SYSTEM LAB — Real-world Scenario Simulator */}
      <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-cyan-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E5B65C] tracking-wide block">
                PART 1 · 상황별 반응 시뮬레이터
              </span>
              <h3 className="text-xl font-bold text-white">
                3대 위기 상황 시뮬레이션
              </h3>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            상황을 선택하여 각 체제의 반응을 비교하세요
          </span>
        </div>

        {/* 3 Scenarios Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {LAB_SCENARIOS.map((sc, sIdx) => {
            const isSelected = sIdx === selectedScenarioIndex;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(sIdx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-[#E5B65C] text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className={`text-[11px] font-mono font-bold block mb-1 ${
                  isSelected ? 'text-[#E5B65C]' : 'text-slate-400'
                }`}>
                  SCENARIO 0{sIdx + 1}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                  {sc.title.split(': ')[1] || sc.title}
                </h5>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Prompt Card */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2 py-0.5 rounded border border-[#E5B65C]/30">
              위기 상황
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentScenario.contextKicker}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {currentScenario.title}
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            {currentScenario.situation}
          </p>
        </div>

        {/* 3 Systems Response Grid Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Market Economy Response */}
          <div className="p-5 rounded-xl bg-teal-950/15 border border-teal-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-teal-500/20 pb-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  시장경제체제의 반응
                </span>
                <span className="text-[11px] text-teal-300 font-mono">자율적 가격 기구</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">
                  작동 메커니즘: {currentScenario.responses.market.mechanism}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentScenario.responses.market.outcome}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-teal-500/20 text-xs text-teal-100/90 leading-snug">
              {currentScenario.responses.market.evaluation}
            </div>
          </div>

          {/* Planned Economy Response */}
          <div className="p-5 rounded-xl bg-purple-950/15 border border-purple-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  계획경제체제의 반응
                </span>
                <span className="text-[11px] text-purple-300 font-mono">정부 중앙 배급</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">
                  작동 메커니즘: {currentScenario.responses.planned.mechanism}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentScenario.responses.planned.outcome}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-purple-500/20 text-xs text-purple-100/90 leading-snug">
              {currentScenario.responses.planned.evaluation}
            </div>
          </div>

          {/* Mixed Economy Response */}
          <div className="p-5 rounded-xl bg-amber-950/15 border border-[#E5B65C]/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5B65C]/20 pb-2">
                <span className="text-xs font-bold text-[#E5B65C] uppercase tracking-wider">
                  혼합 경제체제의 반응
                </span>
                <span className="text-[11px] text-[#E5B65C] font-mono">시장 가격 + 정부 보완</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">
                  작동 메커니즘: {currentScenario.responses.mixed.mechanism}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentScenario.responses.mixed.outcome}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-[#E5B65C]/20 text-xs text-amber-100/90 leading-snug">
              {currentScenario.responses.mixed.evaluation}
            </div>
          </div>
        </div>

        {/* Pedagogical Takeaway */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300 block mb-0.5">
              💡 시뮬레이션 교육적 함의 (Pedagogical Takeaway):
            </strong>
            {currentScenario.pedagogicalTakeaway}
            <span className="text-[11px] text-slate-400 block mt-1">
              ※ 본 시뮬레이션은 각 체제의 전형적인 작동 원리를 비교하기 위한 교육용 단순화 모형이며, 실제 현실의 정책 효과는 국가별 여건에 따라 복합적으로 나타납니다.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: SIDE-BY-SIDE COMPARATIVE ANALYSIS MATRIX */}
      <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E5B65C]/15 border border-[#E5B65C]/30 text-[#E5B65C]">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E5B65C] tracking-wide block">
                PART 2 · 수능 1등급 대비 비교표
              </span>
              <h3 className="text-xl font-bold text-white">
                3대 경제체제 나란히 비교 분석 매트릭스
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400">
            행을 클릭하면 하단에 출제 포인트가 강조됩니다
          </span>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-950/90 text-slate-300 border-b border-slate-800">
                <th className="p-3.5 font-bold w-1/5">비교 항목</th>
                <th className="p-3.5 font-bold w-1/4 text-teal-400 bg-teal-950/10">
                  시장경제체제
                </th>
                <th className="p-3.5 font-bold w-1/4 text-purple-400 bg-purple-950/10">
                  계획경제체제
                </th>
                <th className="p-3.5 font-bold w-1/4 text-[#E5B65C] bg-amber-950/10">
                  혼합 경제체제
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {COMPARISON_MATRIX_ROWS.map((row) => {
                const isRowSelected = row.id === highlightedRowId;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setHighlightedRowId(row.id)}
                    className={`cursor-pointer transition-colors ${
                      isRowSelected
                        ? 'bg-slate-800/90 text-white font-medium'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="p-3.5 font-semibold text-slate-200 flex items-center gap-2">
                      {isRowSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B65C]" />
                      )}
                      <span>{row.category}</span>
                    </td>
                    <td className={`p-3.5 leading-relaxed ${isRowSelected ? 'text-teal-200' : 'text-slate-300'}`}>
                      {row.marketValue}
                    </td>
                    <td className={`p-3.5 leading-relaxed ${isRowSelected ? 'text-purple-200' : 'text-slate-300'}`}>
                      {row.plannedValue}
                    </td>
                    <td className={`p-3.5 leading-relaxed ${isRowSelected ? 'text-amber-200' : 'text-slate-300'}`}>
                      {row.mixedValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Row Deep-Dive Exam Check Callout */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-[#E5B65C]/40 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2 py-0.5 rounded border border-[#E5B65C]/30">
              선택 항목 심층 분석
            </span>
            <h4 className="text-sm font-bold text-white">
              '{highlightedRow.category}' 관련 수능 선지 판단 기준
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {highlightedRow.keyExamCheck}
          </p>
        </div>
      </div>
    </div>
  );
};
