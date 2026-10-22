import React, { useState } from 'react';
import { HISTORY_ERAS, KEYNES_CYCLE_STEPS } from '../../data/curriculumData';
import { HistoryEraId, TeacherSettings } from '../../types/economy';
import { 
  History, 
  ArrowRight, 
  AlertTriangle, 
  GraduationCap, 
  TrendingDown, 
  Building, 
  Layers, 
  ShieldAlert, 
  Compass, 
  Sparkles, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface UnitThreeHistoryProps {
  teacherSettings: TeacherSettings;
}

export const UnitThreeHistory: React.FC<UnitThreeHistoryProps> = ({ teacherSettings }) => {
  const [selectedEraId, setSelectedEraId] = useState<HistoryEraId>('commercial');
  const [activeStepTab, setActiveStepTab] = useState<number>(0); // 0 to 4 (5 stages)
  
  // Keynesian cycle interactive simulation state
  const [activeCycleStep, setActiveCycleStep] = useState<number>(1);
  const [isGovInterventionActive, setIsGovInterventionActive] = useState<boolean>(false);

  const selectedEra = HISTORY_ERAS.find(e => e.id === selectedEraId) || HISTORY_ERAS[0];

  const ERA_TABS = [
    { title: '1. 시대적 배경', subtitle: '태동 원인' },
    { title: '2. 주요 경제사상', subtitle: '핵심 사상가' },
    { title: '3. 정부와 시장의 역할', subtitle: '역할 분담' },
    { title: '4. 발생한 문제', subtitle: '모순과 위기' },
    { title: '5. 다음 시대로의 이행', subtitle: '왜 바뀌었는가?' }
  ];

  // Qualitative spectrum indicator for government vs market emphasis
  const getSpectrumValue = (eraId: HistoryEraId) => {
    switch (eraId) {
      case 'commercial':
        return { gov: '강력한 국가 개입 및 무역 독점', market: '특권 상인 위주 제한적 시장', label: '국가 보호무역 중심 (중상주의)' };
      case 'industrial':
        return { gov: '최소한의 치안·국방 유지 (야경국가)', market: '가격 기구에 의한 전면적 자율', label: '자유 시장 자율성 극대화' };
      case 'modified':
        return { gov: '적극적 재정정책 및 사회안전망', market: '사유재산과 시장 가격 기구 유지', label: '정부의 적극 개입 + 시장 조화' };
      case 'neoliberal':
        return { gov: '규제 완화, 민영화, 작은 정부', market: '시장 경쟁 및 효율성 재강조', label: '시장 원리 복원 및 정부 개입 축소' };
    }
  };

  const spectrum = getSpectrumValue(selectedEra.id);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Unit Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 03 · HISTORY ENGINE
          </span>
          <span className="text-xs text-slate-400">자본주의의 역사적 전개와 인과관계</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          자본주의의 역사적 전개 (History Engine)
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          자본주의는 고정된 것이 아니라, 각 시대가 직면했던 <span className="text-[#E5B65C] font-semibold">경제적 문제와 위기</span>를 해결하는 과정에서 새로운 사상과 제도를 도입하며 진화해 왔습니다.
        </p>
      </div>

      {/* SECTION 1: Interactive Horizontal History Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            시대별 타임라인 탐색기
          </span>
          <span className="text-xs text-slate-400">
            각 시대를 클릭하여 5단계 인과관계를 확인하세요
          </span>
        </div>

        {/* 4 Eras Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HISTORY_ERAS.map((era, idx) => {
            const isCurrent = era.id === selectedEraId;
            return (
              <button
                key={era.id}
                onClick={() => {
                  setSelectedEraId(era.id);
                  setActiveStepTab(0);
                }}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'bg-[#131E30] border-[#E5B65C] shadow-lg shadow-[#E5B65C]/10 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#E5B65C]" />
                )}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-[#E5B65C]' : 'text-slate-400'}`}>
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {era.eraPeriod.split(' ')[0]}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-100 truncate">
                  {era.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {era.kicker}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: 5 Sequential Deep-Dive Tabs */}
      <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        {/* Era Header */}
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                {selectedEra.eraPeriod}
              </span>
              <span className="text-xs text-slate-400">{selectedEra.kicker}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {selectedEra.name}
            </h3>
          </div>

          {/* Qualitative Concept Flow Badge */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[11px]">정부와 시장의 상대적 균형 성격</span>
            <span className="font-bold text-[#E5B65C]">{spectrum.label}</span>
          </div>
        </div>

        {/* 5-Step Disclosure Segmented Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          {ERA_TABS.map((tab, tIdx) => {
            const isTabActive = activeStepTab === tIdx;
            return (
              <button
                key={tIdx}
                onClick={() => setActiveStepTab(tIdx)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all text-center ${
                  isTabActive
                    ? 'bg-[#E5B65C] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="block truncate">{tab.title}</span>
                <span className={`text-[10px] hidden sm:block truncate ${isTabActive ? 'text-slate-800' : 'text-slate-400'}`}>
                  {tab.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5-Step Content Panel */}
        <div className="min-h-[220px] flex items-center">
          {/* 1. 배경 */}
          {activeStepTab === 0 && (
            <div className="w-full space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-[#E5B65C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5B65C]" />
                시대적 태동 배경
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedEra.background.map((bgItem, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                    <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                      배경 요인 0{i + 1}
                    </span>
                    {bgItem}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. 사상 */}
          {activeStepTab === 1 && (
            <div className="w-full space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  주요 경제사상 및 이론
                </h4>
                {selectedEra.keyThoughts.thinker && (
                  <span className="text-xs font-bold text-slate-200 bg-cyan-950/40 border border-cyan-800 px-2.5 py-1 rounded-md">
                    대표 사상가: {selectedEra.keyThoughts.thinker}
                  </span>
                )}
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h5 className="text-lg font-bold text-white">
                  {selectedEra.keyThoughts.title}
                </h5>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {selectedEra.keyThoughts.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                  {selectedEra.keyThoughts.concepts.map((cp, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-950/30 text-cyan-300 border border-cyan-800/40"
                    >
                      #{cp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. 정부와 시장 역할 */}
          {activeStepTab === 2 && (
            <div className="w-full space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-[#E5B65C] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E5B65C]" />
                정부와 시장의 역할 분담 구조
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    정부(국가)의 역할
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedEra.roles.stateRole}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    시장(민간)의 역할
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedEra.roles.marketRole}
                  </p>
                </div>
              </div>

              {/* Qualitative Spectrum Notice */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
                <span><strong>핵심 요약:</strong> {selectedEra.roles.balanceSummary}</span>
                <span className="text-slate-400 text-[11px] hidden md:inline">※ 정성적 상대 개념이며 실제 측정 수치가 아님</span>
              </div>
            </div>
          )}

          {/* 4. 발생한 문제 */}
          {activeStepTab === 3 && (
            <div className="w-full space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                {selectedEra.problems.title}
              </h4>
              <div className="space-y-2.5">
                {selectedEra.problems.items.map((prob, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-sm text-rose-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-900/60 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span className="leading-relaxed">{prob}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. 다음 시대로의 이행 (핵심 인과관계) */}
          {activeStepTab === 4 && (
            <div className="w-full space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                  인과관계 해독
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {selectedEra.transitionToNext.whyNext}
                </h4>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-[#E5B65C]/40 text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                {selectedEra.transitionToNext.causeAndEffect}
              </div>
            </div>
          )}
        </div>

        {/* Caution Box (Vital High-school curriculum traps) */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{selectedEra.caution}</span>
        </div>

        {/* Teacher Commentary (Visible when teacher notes toggled) */}
        {teacherSettings.teacherNotesVisible && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>교사용 역사적 흐름 지도 팁</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              {selectedEra.teacherTip}
            </p>
          </div>
        )}
      </div>

      {/* SECTION 3: KEYNESIAN EFFECTIVE DEMAND VICIOUS CYCLE SIMULATION */}
      <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                DEEP DIVE SIMULATION
              </span>
              <span className="text-xs text-slate-400">케인스의 대공황 원인 분석</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              '유효수요 부족'의 악순환 메커니즘과 정부 지출의 역할
            </h3>
          </div>

          {/* Government Intervention Trigger */}
          <button
            onClick={() => setIsGovInterventionActive(!isGovInterventionActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              isGovInterventionActive
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isGovInterventionActive ? '정부 재정 지출 투입 중 (악순환 차단!)' : '정부 재정 지출(뉴딜) 투입하기'}
            </span>
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          대공황 당시 고전학파는 "시장에 맡겨두면 임금이 내려가 저절로 고용이 회복된다"고 보았으나, 케인스는 물건을 살 수 있는 돈(유효수요)이 없어서 아래와 같은 <span className="text-rose-400 font-bold">치명적인 6단계 악순환</span>이 반복된다고 통찰했습니다.
        </p>

        {/* 6 Step Interactive Cycle Sequence */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {KEYNES_CYCLE_STEPS.map((stepItem) => {
            const isHighlighted = activeCycleStep === stepItem.step;
            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveCycleStep(stepItem.step)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[140px] relative ${
                  isGovInterventionActive && stepItem.step >= 4
                    ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200'
                    : isHighlighted
                    ? 'bg-rose-950/30 border-rose-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      STEP 0{stepItem.step}
                    </span>
                    {stepItem.step < 6 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                    )}
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white mb-1">
                    {stepItem.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {stepItem.desc}
                  </p>
                </div>

                {isGovInterventionActive && stepItem.step === 4 && (
                  <span className="text-[10px] font-bold text-emerald-400 mt-2 block bg-emerald-950/60 p-1 rounded border border-emerald-500/30">
                    ★ 공공사업으로 일자리 공급!
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Government Intervention Result Banner */}
        {isGovInterventionActive ? (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-sm text-emerald-100 leading-relaxed flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-300 mb-1">
                케인스식 처방의 성공적 작동:
              </strong>
              정부가 댐 건설 등 대규모 토목 사업(공공사업)을 일으켜 실업자에게 일자리와 임금을 지급합니다. 소득이 생긴 가계가 소비를 늘리자 기업의 물건이 팔리기 시작하고, 공장이 재가동되며 악순환의 사슬이 끊어집니다!
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs sm:text-sm text-rose-200/90 leading-relaxed flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-rose-300 mb-0.5">
                시장 방임 시의 결과 (대공황의 비극):
              </strong>
              가계가 돈이 없으니 아무도 물건을 사지 않고, 기업은 도산하며, 은행이 파산하여 경제 전체가 붕괴합니다. 위의 <strong>[정부 재정 지출(뉴딜) 투입하기]</strong> 버튼을 눌러 케인스의 해법을 적용해 보세요.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
