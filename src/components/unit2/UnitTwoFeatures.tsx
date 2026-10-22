import React, { useState } from 'react';
import { UNIT_TWO_FEATURES } from '../../data/curriculumData';
import { TeacherSettings } from '../../types/economy';
import { 
  TrendingUp, 
  Coffee, 
  RotateCcw, 
  ArrowUpRight, 
  ArrowDownRight, 
  Lightbulb, 
  AlertTriangle, 
  GraduationCap, 
  Sliders 
} from 'lucide-react';

interface UnitTwoFeaturesProps {
  teacherSettings: TeacherSettings;
}

type MarketShift = 'initial' | 'demand_increase' | 'demand_decrease' | 'supply_increase' | 'supply_decrease';

export const UnitTwoFeatures: React.FC<UnitTwoFeaturesProps> = ({ teacherSettings }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const [activeTabSubStep, setActiveTabSubStep] = useState<number>(0); // 0: 정의, 1: 원리, 2: 사례, 3: 시험 주의
  
  // Market Simulator State
  const [marketShift, setMarketShift] = useState<MarketShift>('initial');

  const currentFeature = UNIT_TWO_FEATURES[activeFeatureIndex];

  // Simulator Coordinates Math (SVG viewBox 0 0 500 400)
  // Base demand: line from (100, 80) to (400, 320)
  // Base supply: line from (100, 320) to (400, 80)
  // Base Equilibrium: (250, 200)
  let dOffset = 0;
  let sOffset = 0;
  let eqPriceText = '3,000원';
  let eqQtyText = '100잔';
  let eqStateNote = '기본 균형 상태: 커피 시장의 수요량과 공급량이 일치하는 균형가격(3,000원)과 균형거래량(100잔)이 형성되어 있습니다.';

  if (marketShift === 'demand_increase') {
    dOffset = 60; // right shift
    eqPriceText = '4,500원 (상승 ↑)';
    eqQtyText = '140잔 (증가 ↑)';
    eqStateNote = '수요 증가: 커피 유행 및 소득 증가로 수요곡선(D)이 우측 이동 → 초과수요 발생 → 균형가격 상승(3,000원→4,500원) 및 균형거래량 증가(100잔→140잔).';
  } else if (marketShift === 'demand_decrease') {
    dOffset = -60; // left shift
    eqPriceText = '1,800원 (하락 ↓)';
    eqQtyText = '65잔 (감소 ↓)';
    eqStateNote = '수요 감소: 대체 음료 인기 또는 경기 침체로 수요곡선(D)이 좌측 이동 → 초과공급 발생 → 균형가격 하락(3,000원→1,800원) 및 균형거래량 감소(100잔→65잔).';
  } else if (marketShift === 'supply_increase') {
    sOffset = 60; // right shift
    eqPriceText = '2,000원 (하락 ↓)';
    eqQtyText = '140잔 (증가 ↑)';
    eqStateNote = '공급 증가: 원두 대풍작 및 자동 추출 기술 혁신으로 공급곡선(S)이 우측 이동 → 균형가격 하락(3,000원→2,000원) 및 균형거래량 증가(100잔→140잔).';
  } else if (marketShift === 'supply_decrease') {
    sOffset = -60; // left shift
    eqPriceText = '4,200원 (상승 ↑)';
    eqQtyText = '65잔 (감소 ↓)';
    eqStateNote = '공급 감소: 원두 산지 가뭄 피해로 공급곡선(S)이 좌측 이동 → 균형가격 상승(3,000원→4,200원) 및 균형거래량 감소(100잔→65잔).';
  }

  // Calculate dynamic intersection point
  // D line: Y - 80 = (320 - 80)/(400 - 100) * (X - (100 + dOffset)) => Y - 80 = 0.8 * (X - 100 - dOffset)
  // S line: Y - 320 = (80 - 320)/(400 - 100) * (X - (100 + sOffset)) => Y - 320 = -0.8 * (X - 100 - sOffset)
  // Intersection X_eq = 250 + (dOffset + sOffset) / 2
  // Intersection Y_eq = 200 - 0.4 * (dOffset - sOffset)
  const eqX = 250 + (dOffset + sOffset) / 2;
  const eqY = 200 - 0.4 * (dOffset - sOffset);

  const SUB_STEPS = [
    { title: '1. 개념 정의', desc: '본질적 의미' },
    { title: '2. 작동 원리', desc: '경제적 메커니즘' },
    { title: '3. 생활 속 사례', desc: '현실 적용' },
    { title: '4. 시험 주의점', desc: '수능·내신 킬러' }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Unit Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 02 · MECHANISM
          </span>
          <span className="text-xs text-slate-400">자본주의 5대 특징과 시장 가격 기구</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          자본주의의 5대 핵심 특징 & 가격 기구 시각화
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          자본주의는 사유재산권, 경제활동의 자유, 이윤 추구 동기, 시장 가격 기구, 경쟁이라는 5대 원리로 움직입니다.
        </p>
      </div>

      {/* SECTION 1: 5 Core Features Step-by-Step Deep Dive */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-[#E5B65C]">PART 1</span>
            <span>5대 핵심 특징 체계적 분석</span>
          </h3>
          <span className="text-xs text-slate-400">
            개념 정의 → 작동 원리 → 생활 사례 → 시험 주의 4단계 학습
          </span>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {UNIT_TWO_FEATURES.map((feat, idx) => {
            const isActive = idx === activeFeatureIndex;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  setActiveFeatureIndex(idx);
                  setActiveTabSubStep(0);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-[#131E30] border-[#E5B65C] text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className={`text-[11px] font-mono font-bold block mb-1 ${
                  isActive ? 'text-[#E5B65C]' : 'text-slate-400'
                }`}>
                  0{idx + 1}
                </span>
                <span className="text-sm font-bold block truncate">
                  {feat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4-Step Progressive Sequence Card */}
        <div className="bg-[#131E30] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-[#E5B65C] tracking-wide">
                FEATURE 0{activeFeatureIndex + 1}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {currentFeature.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {currentFeature.shortDesc}
              </p>
            </div>

            {/* 4 Sub-step Navigation Pill Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
              {SUB_STEPS.map((st, sIdx) => {
                const isSelected = sIdx === activeTabSubStep;
                return (
                  <button
                    key={sIdx}
                    onClick={() => setActiveTabSubStep(sIdx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#E5B65C] text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {st.title.split('. ')[1]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-step Content Display */}
          <div className="min-h-[140px] flex items-center">
            {activeTabSubStep === 0 && (
              <div className="w-full space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-[#E5B65C] uppercase tracking-wider block">
                  ① 개념 정의 (Definition)
                </span>
                <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  {currentFeature.definition}
                </p>
              </div>
            )}

            {activeTabSubStep === 1 && (
              <div className="w-full space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  ② 작동 원리 (Mechanism)
                </span>
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  {currentFeature.mechanism}
                </p>
              </div>
            )}

            {activeTabSubStep === 2 && (
              <div className="w-full space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  ③ 생활 속 적용 사례 (Real-World Case)
                </span>
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
                  {currentFeature.realCase}
                </p>
              </div>
            )}

            {activeTabSubStep === 3 && (
              <div className="w-full space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  ④ 시험에서 주의할 점 (Exam Caution)
                </span>
                <p className="text-base sm:text-lg text-rose-100 leading-relaxed p-4 rounded-xl bg-rose-950/25 border border-rose-800/40">
                  {currentFeature.examCaution}
                </p>
              </div>
            )}
          </div>

          {/* Teacher Commentary Box */}
          {teacherSettings.teacherNotesVisible && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>교사용 수업 발문 & 지도 팁</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                {currentFeature.teacherNote}
              </p>
            </div>
          )}

          {/* Quick Pagination between the 4 steps */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span>진행: {activeTabSubStep + 1} / 4 단계</span>
            <div className="flex gap-2">
              <button
                disabled={activeTabSubStep === 0}
                onClick={() => setActiveTabSubStep(prev => Math.max(0, prev - 1))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              >
                이전 단계
              </button>
              <button
                disabled={activeTabSubStep === 3}
                onClick={() => setActiveTabSubStep(prev => Math.min(3, prev + 1))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              >
                다음 단계
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SPECIAL FEATURE — Interactive Price Mechanism Visualizer */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                SPECIAL LAB
              </span>
              <span className="text-xs text-slate-400">자본주의의 시장 가격 기구 시뮬레이터</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2">
              <Coffee className="w-6 h-6 text-amber-400" />
              <span>커피 시장의 수요·공급과 가격 결정 시각화</span>
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            신호 기능(Signal) & 자원 배분 기능(Allocation)
          </span>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Canvas: SVG Coordinate Graph (7 cols) */}
          <div className="lg:col-span-7 bg-[#131E30] border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                실시간 커피 시장 균형 곡선
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> 수요곡선 (D)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-3 h-0.5 bg-amber-400 inline-block" /> 공급곡선 (S)
                </span>
              </div>
            </div>

            {/* SVG Graph Canvas */}
            <div className="relative w-full aspect-[5/4] max-h-[380px] bg-slate-950/80 rounded-xl p-2 border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg 
                viewBox="0 0 500 400" 
                className="w-full h-full text-slate-400 select-none"
              >
                {/* Axes */}
                <line x1="60" y1="40" x2="60" y2="350" stroke="#475569" strokeWidth="2" />
                <line x1="60" y1="350" x2="470" y2="350" stroke="#475569" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="50" y="30" fill="#94A3B8" fontSize="13" fontWeight="bold">가격 (P)</text>
                <text x="440" y="380" fill="#94A3B8" fontSize="13" fontWeight="bold">거래량 (Q)</text>

                {/* Origin */}
                <text x="45" y="365" fill="#64748B" fontSize="11">0</text>

                {/* Base Demand Curve (Ghost reference if shifted) */}
                {dOffset !== 0 && (
                  <g opacity="0.25">
                    <line x1="100" y1="80" x2="400" y2="320" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="390" y="340" fill="#06B6D4" fontSize="11">D₀</text>
                  </g>
                )}

                {/* Base Supply Curve (Ghost reference if shifted) */}
                {sOffset !== 0 && (
                  <g opacity="0.25">
                    <line x1="100" y1="320" x2="400" y2="80" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="390" y="70" fill="#F59E0B" fontSize="11">S₀</text>
                  </g>
                )}

                {/* Active Demand Curve */}
                <line 
                  x1={100 + dOffset} 
                  y1="80" 
                  x2={400 + dOffset} 
                  y2="320" 
                  stroke="#22D3EE" 
                  strokeWidth="3.5" 
                  className="transition-all duration-300"
                />
                <text 
                  x={395 + dOffset} 
                  y="340" 
                  fill="#22D3EE" 
                  fontSize="14" 
                  fontWeight="bold"
                  className="transition-all duration-300"
                >
                  {dOffset > 0 ? "D₁ (수요 증가)" : dOffset < 0 ? "D₂ (수요 감소)" : "D"}
                </text>

                {/* Active Supply Curve */}
                <line 
                  x1={100 + sOffset} 
                  y1="320" 
                  x2={400 + sOffset} 
                  y2="80" 
                  stroke="#FBBF24" 
                  strokeWidth="3.5" 
                  className="transition-all duration-300"
                />
                <text 
                  x={395 + sOffset} 
                  y="70" 
                  fill="#FBBF24" 
                  fontSize="14" 
                  fontWeight="bold"
                  className="transition-all duration-300"
                >
                  {sOffset > 0 ? "S₁ (공급 증가)" : sOffset < 0 ? "S₂ (공급 감소)" : "S"}
                </text>

                {/* Equilibrium Projection Dashed Lines */}
                <line 
                  x1="60" 
                  y1={eqY} 
                  x2={eqX} 
                  y2={eqY} 
                  stroke="#E2E8F0" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                  className="transition-all duration-300"
                />
                <line 
                  x1={eqX} 
                  y1={eqY} 
                  x2={eqX} 
                  y2="350" 
                  stroke="#E2E8F0" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                  className="transition-all duration-300"
                />

                {/* Equilibrium Point Marker */}
                <circle 
                  cx={eqX} 
                  cy={eqY} 
                  r="6" 
                  fill="#E5B65C" 
                  stroke="#FFFFFF" 
                  strokeWidth="2" 
                  className="transition-all duration-300"
                />
                <text 
                  x={eqX + 10} 
                  y={eqY - 10} 
                  fill="#E5B65C" 
                  fontSize="13" 
                  fontWeight="extrabold"
                  className="transition-all duration-300"
                >
                  E (균형점)
                </text>

                {/* Axis Price/Qty projections markers */}
                <text 
                  x="15" 
                  y={eqY + 4} 
                  fill="#F1F5F9" 
                  fontSize="11" 
                  fontWeight="bold"
                  className="transition-all duration-300"
                >
                  P*
                </text>
                <text 
                  x={eqX - 10} 
                  y="368" 
                  fill="#F1F5F9" 
                  fontSize="11" 
                  fontWeight="bold"
                  className="transition-all duration-300"
                >
                  Q*
                </text>
              </svg>
            </div>

            {/* Graph Live Readout Strip */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">균형 가격 (P*)</span>
                <span className="text-base sm:text-lg font-mono font-bold text-amber-300">
                  {eqPriceText}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">균형 거래량 (Q*)</span>
                <span className="text-base sm:text-lg font-mono font-bold text-cyan-300">
                  {eqQtyText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls & Pedagogical Analysis (5 cols) */}
          <div className="lg:col-span-5 bg-[#131E30] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#E5B65C]" />
                  <span>시장 충격 시뮬레이션 버튼</span>
                </h4>
                {marketShift !== 'initial' && (
                  <button
                    onClick={() => setMarketShift('initial')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>초기화</span>
                  </button>
                )}
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-2">
                <button
                  onClick={() => setMarketShift('demand_increase')}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    marketShift === 'demand_increase'
                      ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100 font-bold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-cyan-300">수요 증가 (인기 급상승)</span>
                    <span className="text-[11px] text-slate-400">수요곡선 우측 이동 → 가격 상승, 거래량 증가</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 shrink-0" />
                </button>

                <button
                  onClick={() => setMarketShift('demand_decrease')}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    marketShift === 'demand_decrease'
                      ? 'bg-slate-800 border-cyan-500/60 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-200">수요 감소 (대체재 유행)</span>
                    <span className="text-[11px] text-slate-400">수요곡선 좌측 이동 → 가격 하락, 거래량 감소</span>
                  </div>
                  <ArrowDownRight className="w-4 h-4 text-cyan-500 shrink-0" />
                </button>

                <button
                  onClick={() => setMarketShift('supply_increase')}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    marketShift === 'supply_increase'
                      ? 'bg-amber-950/40 border-amber-400 text-amber-100 font-bold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-amber-300">공급 증가 (기술 혁신 / 풍작)</span>
                    <span className="text-[11px] text-slate-400">공급곡선 우측 이동 → 가격 하락, 거래량 증가</span>
                  </div>
                  <ArrowDownRight className="w-4 h-4 text-amber-400 shrink-0" />
                </button>

                <button
                  onClick={() => setMarketShift('supply_decrease')}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    marketShift === 'supply_decrease'
                      ? 'bg-slate-800 border-amber-500/60 text-amber-200 font-bold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-200">공급 감소 (원두 흉작 / 가뭄)</span>
                    <span className="text-[11px] text-slate-400">공급곡선 좌측 이동 → 가격 상승, 거래량 감소</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-amber-500 shrink-0" />
                </button>
              </div>

              {/* Dynamic Note Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
                <span className="text-xs font-bold text-[#E5B65C] block">
                  🔍 메커니즘 해설
                </span>
                <p>{eqStateNote}</p>
              </div>
            </div>

            {/* Core Educational Meaning Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#131E30] border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-white block">
                ⭐ 가격 기구의 2대 기능 (수능 필수)
              </span>
              <ul className="space-y-1 text-slate-300">
                <li>
                  <strong className="text-amber-300">1. 신호 기능(Signal):</strong> 커피가 귀해지면 가격 상승을 통해 "아껴 쓰라"는 신호를 보냄.
                </li>
                <li>
                  <strong className="text-cyan-300">2. 자원 배분 기능(Allocation):</strong> 가격 상승을 본 농부들이 더 많은 토지와 노동을 커피 생산에 투입하여 자원이 효율적으로 흐름.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
