import React from 'react';
import { X, AlertTriangle, KeyRound, Lightbulb, Target } from 'lucide-react';
import { UnitId } from '../types/economy';

interface TeacherNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUnit: UnitId;
}

interface UnitTeachingGuide {
  unitId: UnitId;
  unitName: string;
  confusingConcepts: string[];
  mandatoryKeywords: string[];
  examTraps: string[];
  teachingQuestions: string[];
}

const TEACHING_GUIDES: Record<UnitId, UnitTeachingGuide> = {
  'unit-1': {
    unitId: 'unit-1',
    unitName: 'UNIT 01 — 자본주의의 의미',
    confusingConcepts: [
      '소비재의 사적 소유와 "생산수단"의 사적 소유의 차이 혼동 (사회주의도 옷, 식기 등 소비재 소유는 부분 인정함).',
      '이윤 추구를 탐욕이나 부정적 행위로만 오인하는 편견 (정당한 혁신과 가치 창출에 대한 시장 보상임을 설명).',
      '자유로운 경제활동이 법률 없는 완전 방임을 의미한다고 오해 (공공복리와 법 테두리 안에서의 자유).'
    ],
    mandatoryKeywords: [
      '생산수단의 사적 소유',
      '시장 가격 기구 (보이지 않는 손)',
      '경제활동의 자유',
      '경제적 유인 (Incentive)',
      '자원 배분의 효율성'
    ],
    examTraps: [
      '선지 함정: "자본주의에서는 사유재산권이 어떠한 경우에도 제한될 수 없다" → 오답 (공공복리를 위한 법률적 제한 가능).',
      '선지 함정: "중앙 계획 기구가 생산량을 일괄 통제한다" → 오답 (계획경제의 특징).'
    ],
    teachingQuestions: [
      '"만약 여러분이 카페를 차리고 싶은데 국가가 허락한 사람만 기계를 살 수 있다면 어떻게 될까요?"',
      '"자본주의에서 가격은 단순한 숫자일까요, 아니면 수많은 정보를 담고 있는 신호등일까요?"'
    ]
  },
  'unit-2': {
    unitId: 'unit-2',
    unitName: 'UNIT 02 — 자본주의의 핵심 특징',
    confusingConcepts: [
      '수요곡선 "위에서의 점의 이동(가격 변화)"과 "수요곡선 자체의 이동(소득, 선호 변화)" 구분.',
      '균형가격 상승 시 생산자가 공급량을 늘리는 자원 배분 메커니즘을 자연스러운 신호로 이해하기.',
      '경쟁이 치열할 때 소비자에게 유리한 이유(가격 인하, 품질 향상) 파악.'
    ],
    mandatoryKeywords: [
      '신호 기능(Signal)',
      '자원 배분 기능(Allocation)',
      '초과수요 vs 초과공급',
      '균형가격과 균형거래량',
      '소비자 주권'
    ],
    examTraps: [
      '선지 함정: "수요가 증가하면 균형가격은 상승하고 균형거래량은 감소한다" → 오답 (수요 증가 시 가격과 거래량 모두 상승!).',
      '선지 함정: "공급이 증가하면 가격은 하락하고 거래량은 감소한다" → 오답 (공급 증가 시 가격은 하락, 거래량은 증가!).'
    ],
    teachingQuestions: [
      '"커피 열풍이 불어 모든 학생이 커피를 사 마신다면, 커피 가격과 거래량은 어떻게 변할까요?" (시뮬레이터 직접 조작 유도)',
      '"가격이 오르는 것은 나쁜 일이기만 할까요? 농부들에게 가격 상승은 어떤 신호가 될까요?"'
    ]
  },
  'unit-3': {
    unitId: 'unit-3',
    unitName: 'UNIT 03 — 자본주의의 역사적 전개',
    confusingConcepts: [
      '상업 자본주의 시대의 중상주의를 "자유방임"으로 착각 (오히려 절대왕정의 강력한 무역 통제기였음).',
      '애덤 스미스를 무조건적인 무정부 상태 옹호자로 오해 (국방, 사법, 필수 공공사업의 정부 역할 분명히 인정).',
      '스태그플레이션(Stagflation)을 단순한 인플레이션이나 불황으로 혼동 (경기 침체 + 고물가의 복합 재난).'
    ],
    mandatoryKeywords: [
      '중상주의 (보호무역, 금·은 축적)',
      '보이지 않는 손 & 자유방임 (애덤 스미스)',
      '유효수요 부족 & 수정 자본주의 (케인스)',
      '스태그플레이션 & 정부 실패',
      '신자유주의 (하이에크, 프리드먼: 작은 정부, 규제 완화, 민영화)'
    ],
    examTraps: [
      '선지 함정: "수정 자본주의는 사유재산제를 폐지하고 생산수단을 국유화하였다" → 오답 (자본주의의 기본 골격은 유지한 채 정부 개입만 결합한 혼합경제임).',
      '선지 함정: "신자유주의는 국가의 모든 법적 제도를 폐지하고 시장에 전적으로 맡겼다" → 오답 (시장 규칙을 지키는 국가의 기초 역할 인정).'
    ],
    teachingQuestions: [
      '"1929년 대공황 때 왜 공장이 멀쩡한데도 사람들이 굶주렸을까요? 케인스는 이를 무엇의 부족이라고 보았을까요?"',
      '"1970년대에 정부가 돈을 더 풀었는데도 왜 경기가 살아나지 않고 물가만 치솟았을까요?"'
    ]
  },
  'unit-4': {
    unitId: 'unit-4',
    unitName: 'UNIT 04 — 경제체제의 유형',
    confusingConcepts: [
      '혼합 경제체제를 시장경제 50% + 계획경제 50%의 수학적 반반 혼합으로 오해 (국가마다 천차만별인 연속 스펙트럼임).',
      '계획경제에서 개인 옷, 칫솔 등 일상 소비재까지 국가 소유였다고 오인 (핵심은 "생산수단"의 공적 소유임).',
      '현대 시장경제를 정부 개입이 전혀 없는 순수 시장경제로 오해.'
    ],
    mandatoryKeywords: [
      '시장경제체제: 가격 기구, 사적 소유, 효율성 극대화, 시장 실패',
      '계획경제체제: 중앙 계획 당국, 공적 소유, 정보의 한계, 유인 결여',
      '혼합 경제체제: 시장 자율성 + 정부 개입, 효율성과 형평성의 조화, 정부 실패 위험'
    ],
    examTraps: [
      '선지 함정: "혼합 경제체제는 시장과 계획의 요소가 정확히 절반씩 결합되어 있다" → 오답 (시대와 국가마다 상이함).',
      '선지 함정: "계획경제체제에서는 소비재의 사적 소유까지 전면 금지된다" → 오답 (생산수단이 공적 소유 대상임).'
    ],
    teachingQuestions: [
      '"우리나라 대한민국은 시장경제체제일까요, 계획경제체제일까요, 아니면 혼합 경제체제일까요?" (헌법 제119조 제시)',
      '"만약 성적에 상관없이 전교생에게 똑같이 80점을 준다면 여러분은 시험공부를 열심히 할까요? 계획경제의 유인 부족과 연결해 보세요."'
    ]
  },
  'unit-5': {
    unitId: 'unit-5',
    unitName: 'UNIT 05 — 경제체제 비교 분석',
    confusingConcepts: [
      '시장의 가격 메커니즘을 활용한 정부 개입(예: 탄소세, 배출권 거래제)을 단순 직접 규제로 오인.',
      '시장 실패(독과점, 외부효과, 공공재 부족)와 정부 실패(관료주의, 재정 적자, 왜곡)의 원인과 현상 혼동.'
    ],
    mandatoryKeywords: [
      '부정적 외부효과 & 비용의 내부화',
      '공공재의 비배제성·비경합성 (무임승차)',
      '누진세 & 소득 재분배',
      '효율성과 형평성의 상충(Trade-off)과 조화'
    ],
    examTraps: [
      '선지 함정: "외부효과가 발생할 때 시장경제는 스스로 사회적 최적 생산량을 달성한다" → 오답 (시장 실패 발생).',
      '선지 함정: "정부 실패는 시장경제를 완벽하게 복원할 때만 발생한다" → 오답 (정부 개입의 부작용임).'
    ],
    teachingQuestions: [
      '"빵이 부족할 때 가격을 올려서 해결하는 것과, 번호표를 줘서 똑같이 나누는 것 중 어떤 방식이 더 정의로울까요?"',
      '"공장이 강물을 오염시킬 때, 정부가 강제로 문을 닫게 하는 것과 오염세를 물리는 것 중 어느 쪽이 시장 친화적일까요?"'
    ]
  },
  'unit-6': {
    unitId: 'unit-6',
    unitName: 'UNIT 06 — 수능·내신 개념 확인',
    confusingConcepts: [
      '문제 풀이 시 문장 전체를 보지 않고 키워드 하나만 보고 성급히 O/X를 판단하는 습관.',
      '"어떠한 경우에도", "전혀", "모든", "절대적" 등 극단적 수식어가 들어간 선지의 위험성.'
    ],
    mandatoryKeywords: [
      '선지 분석법 (주어-서술어 일치 여부 확인)',
      '오개념 교정 문장 읽기',
      '조건부 문장의 판별 (예: 공공복리를 위한 제한 가능 여부)'
    ],
    examTraps: [
      '학생들이 가장 많이 틀리는 3대 문항: Q2 (사유재산권의 절대성 오개념), Q9 (애덤 스미스 정부 역할 부정 오개념), Q17 (혼합경제 50:50 오개념).'
    ],
    teachingQuestions: [
      '"틀린 선지를 볼 때 단순히 X라고만 하지 말고, 어느 어구가 틀렸는지를 콕 집어 올바른 표현으로 바꿔 말해보세요."'
    ]
  }
};

export const TeacherNotesModal: React.FC<TeacherNotesModalProps> = ({
  isOpen,
  onClose,
  activeUnit,
}) => {
  if (!isOpen) return null;

  const guide = TEACHING_GUIDES[activeUnit];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#131E30] border border-[#E5B65C]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0B1220]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                TEACHER PEDAGOGICAL BRIEF
              </span>
              <span className="text-xs text-slate-400">교사용 지도서 및 수업 팁</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {guide.unitName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 1: Confusing Concepts */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>학생들이 가장 혼동하기 쉬운 오개념 (주의 지도 요망)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc list-inside">
              {guide.confusingConcepts.map((item, idx) => (
                <li key={idx} className="pl-1">
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Mandatory Keywords */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="flex items-center gap-2 text-sm font-bold text-[#E5B65C] mb-3">
              <KeyRound className="w-4 h-4 text-[#E5B65C]" />
              <span>수업 시 칠판에 반드시 적고 강조할 핵심 개념어</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {guide.mandatoryKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E5B65C]/10 text-[#E5B65C] border border-[#E5B65C]/30"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Exam Traps */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <h4 className="flex items-center gap-2 text-sm font-bold text-rose-300 mb-3">
              <Target className="w-4 h-4 text-rose-400" />
              <span>수능·내신 기출 선지 함정 및 낚시 포인트</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {guide.examTraps.map((trap, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20">
                  {trap}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Teaching Questions */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-3">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>수업 도입 및 호기심 유발 추천 발문 (질문 던지기)</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              {guide.teachingQuestions.map((q, idx) => (
                <p key={idx} className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 italic">
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1220] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            단축키 힌트: 교사용 모드 켜진 상태에서 Alt+Right로 다음 개념 순차 공개
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            확인 및 창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
