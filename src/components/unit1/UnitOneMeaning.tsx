import React, { useState } from 'react';
import { UNIT_ONE_KEYWORDS } from '../../data/curriculumData';
import { TeacherSettings } from '../../types/economy';
import { 
  Building2, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  GraduationCap, 
  Lightbulb, 
  AlertCircle 
} from 'lucide-react';

interface UnitOneMeaningProps {
  teacherSettings: TeacherSettings;
}

export const UnitOneMeaning: React.FC<UnitOneMeaningProps> = ({ teacherSettings }) => {
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>(UNIT_ONE_KEYWORDS[0].id);
  const [showTeacherDeepDive, setShowTeacherDeepDive] = useState<boolean>(false);

  const selectedKeyword = UNIT_ONE_KEYWORDS.find(k => k.id === selectedKeywordId) || UNIT_ONE_KEYWORDS[0];

  // In teacher mode, limit visible keywords based on stepRevealed (1 to 5)
  const visibleKeywordsCount = teacherSettings.stepRevealed;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Unit Header Banner */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 01 · FOUNDATION
          </span>
          <span className="text-xs text-slate-400">자본주의의 본질과 구성 요소</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
          자본주의의 의미와 5대 핵심 축
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          자본주의(Capitalism)는 <span className={teacherSettings.highlightKeyTerms ? 'bg-[#E5B65C]/30 text-[#E5B65C] px-1 rounded font-semibold' : 'text-[#E5B65C] font-semibold'}>생산수단의 사적 소유</span>를 바탕으로 개인과 기업이 경제적 이익을 추구하며 시장을 통해 경제활동을 수행하는 경제 질서입니다.
        </p>
      </div>

      {/* Central Visual Architecture: Interactive Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Concept Pillar Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              자본주의를 지탱하는 5대 기둥
            </span>
            <span className="text-xs text-slate-400">
              {teacherSettings.stepRevealed < 5 ? `공개: ${Math.min(5, visibleKeywordsCount)}/5` : '전체 공개'}
            </span>
          </div>

          <div className="space-y-2.5">
            {UNIT_ONE_KEYWORDS.map((kw, index) => {
              const isSelected = selectedKeywordId === kw.id;
              const isStepUnlocked = index < visibleKeywordsCount;

              if (!isStepUnlocked && !teacherSettings.skipAnimations) {
                return (
                  <div
                    key={kw.id}
                    className="p-3.5 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-slate-400 flex items-center justify-between text-xs"
                  >
                    <span>{index + 1}. [단계별 공개 대기 중...]</span>
                    <span className="text-[11px] text-slate-400">교사용 모드 다음 단계(Space)</span>
                  </div>
                );
              }

              return (
                <button
                  key={kw.id}
                  onClick={() => setSelectedKeywordId(kw.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#131E30] border-[#E5B65C] shadow-lg shadow-[#E5B65C]/10 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-[#E5B65C] text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        0{index + 1}
                      </span>
                      <h4 className="text-base font-bold tracking-tight">
                        {kw.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400">
                      {kw.shortTag}
                    </p>
                  </div>

                  <div className={`p-1 rounded-full ${isSelected ? 'text-[#E5B65C]' : 'text-slate-400'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Central Definition Quick Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 block mb-1">
              💡 핵심 개념 연계 이해
            </span>
            자본주의는 이 5가지 요소 중 어느 하나라도 결여되면 온전히 작동하기 어렵습니다. 특히 <strong className="text-slate-200">생산수단의 사적 소유</strong>가 제도적 바탕이 되고, <strong className="text-slate-200">시장 가격 기구</strong>가 조정 장치가 됩니다.
          </div>
        </div>

        {/* Right Column: Deep-dive Knowledge Screen (7 cols) */}
        <div className="lg:col-span-7 bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
          {/* Header of Active Node */}
          <div className="border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                  핵심 개념 해독
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE: {selectedKeyword.id.toUpperCase()}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                {selectedKeyword.name}
              </h3>
            </div>

            <button
              onClick={() => setShowTeacherDeepDive(!showTeacherDeepDive)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors shrink-0"
              title="교사용 심화 설명 및 발문 팁 보기"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{showTeacherDeepDive ? '교사 팁 접기' : '교사용 팁'}</span>
            </button>
          </div>

          {/* 1. Definition */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E5B65C]" />
              교과서 표준 개념 정의
            </h4>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
              {selectedKeyword.definition}
            </div>
          </div>

          {/* 2. Real-World Case */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
              생활 속 실제 적용 사례
            </h4>
            <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-sm sm:text-base text-cyan-100 leading-relaxed">
              {selectedKeyword.realWorldExample}
            </div>
          </div>

          {/* 3. Exam Trap */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              수능·내신 기출 선지 함정 분석
            </h4>
            <div className="p-4 sm:p-5 rounded-xl bg-rose-950/25 border border-rose-800/40 text-sm sm:text-base text-rose-100 leading-relaxed">
              {selectedKeyword.examTrap}
            </div>
          </div>

          {/* 4. Teacher Tip (Visible when toggled or teacher mode enabled) */}
          {(showTeacherDeepDive || teacherSettings.teacherNotesVisible) && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>교사용 지도 포인트 & 오개념 차단</span>
              </div>
              <p className="text-sm text-amber-100/90 leading-relaxed">
                {selectedKeyword.teacherTip}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Conceptual Summary Banner for Classroom Projection */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#131E30] to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <span className="text-xs font-bold text-[#E5B65C] tracking-wider uppercase block">
            CLASSROOM TAKEAWAY · 수능 핵심 명제
          </span>
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
            "자본주의는 <span className="text-[#E5B65C] underline decoration-[#E5B65C]/40 underline-offset-4">사유재산권</span>과 <span className="text-[#E5B65C] underline decoration-[#E5B65C]/40 underline-offset-4">경제활동의 자유</span>를 바탕으로, 개인이 자신의 이익을 위해 시장에서 경쟁하고 가격을 통해 협력하는 체제이다."
          </p>
        </div>
        <div className="shrink-0 text-xs text-slate-300 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5 font-medium">
          2022 개정 통합사회 평가 기준 충족
        </div>
      </div>
    </div>
  );
};
