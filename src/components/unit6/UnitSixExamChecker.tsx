import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizCategory, QuizQuestion, TeacherSettings } from '../../types/economy';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Target, 
  Sparkles, 
  AlertTriangle, 
  GraduationCap, 
  Check, 
  X, 
  Filter 
} from 'lucide-react';

interface UnitSixExamCheckerProps {
  teacherSettings: TeacherSettings;
}

export const UnitSixExamChecker: React.FC<UnitSixExamCheckerProps> = ({ teacherSettings }) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | '전체'>('전체');
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean | null>>({});
  const [showOnlyWrong, setShowOnlyWrong] = useState<boolean>(false);

  const CATEGORIES: (QuizCategory | '전체')[] = [
    '전체',
    '자본주의의 의미와 특징',
    '역사적 전개',
    '주요 경제사상가',
    '경제체제 비교',
    '혼합 경제체제',
    '정부와 시장의 역할'
  ];

  // Filter questions
  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedCategory !== '전체' && q.category !== selectedCategory) return false;
    if (showOnlyWrong) {
      const ans = userAnswers[q.id];
      // only show answered questions that were incorrect
      return ans !== undefined && ans !== null && ans !== q.correctAnswer;
    }
    return true;
  });

  const handleSelectAnswer = (questionId: number, answer: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleResetAll = () => {
    setUserAnswers({});
    setShowOnlyWrong(false);
  };

  // Stats calculation
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[Number(k)] !== null).length;
  const correctCount = Object.keys(userAnswers).filter(k => userAnswers[Number(k)] === QUIZ_QUESTIONS.find(q => q.id === Number(k))?.correctAnswer).length;
  const incorrectCount = answeredCount - correctCount;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Unit Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5B65C] uppercase bg-[#E5B65C]/10 px-2.5 py-0.5 rounded border border-[#E5B65C]/20">
            UNIT 06 · CONCEPT DIAGNOSTIC
          </span>
          <span className="text-xs text-slate-400">평가원형 선지 분석 & 오개념 클리닉</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          수능·내신 개념 확인 (선지 판단 평가)
        </h2>
        <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-4xl leading-relaxed">
          실제 시험에서 빈출되는 정오 판단 문항을 통해 <span className="text-[#E5B65C] font-semibold">함정 선지를 간파하는 실전 능력</span>과 오개념 교정 훈련을 수행합니다.
        </p>
      </div>

      {/* Stats Dashboard Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#131E30] border border-slate-800 text-slate-300">
          <span className="text-xs text-slate-400 block mb-1">풀이 진행도</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl sm:text-2xl font-bold text-white">{answeredCount}</span>
            <span className="text-xs text-slate-400">/ {totalQuestions}문항</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#131E30] border border-slate-800 text-emerald-300">
          <span className="text-xs text-slate-400 block mb-1">정답 개수</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">{correctCount}</span>
            <span className="text-xs text-slate-400">문항</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#131E30] border border-slate-800 text-rose-300">
          <span className="text-xs text-slate-400 block mb-1">오답 개수</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl sm:text-2xl font-bold text-rose-400">{incorrectCount}</span>
            <span className="text-xs text-slate-400">문항</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#131E30] border border-slate-800 text-[#E5B65C]">
          <span className="text-xs text-slate-400 block mb-1">현재 정답률</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl sm:text-2xl font-bold text-[#E5B65C]">{scorePercent}%</span>
            <span className="text-xs text-slate-400">정확도</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs & Tools */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#131E30] p-4 rounded-xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isCatActive
                    ? 'bg-[#E5B65C] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {incorrectCount > 0 && (
            <button
              onClick={() => setShowOnlyWrong(!showOnlyWrong)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                showOnlyWrong
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {showOnlyWrong ? '전체 문항 보기' : `오답 ${incorrectCount}개만 모아보기`}
            </button>
          )}

          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
            title="모든 문제 풀이 기록 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>풀이 리셋</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#131E30] border border-slate-800 text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-base text-slate-200 font-semibold">
              해당 조건에 해당하는 문항이 없습니다.
            </p>
            <p className="text-xs text-slate-400">
              오답이 없거나 필터 조건이 맞지 않습니다. 상단 필터를 변경해 보세요.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const hasAnswered = userAnswer !== undefined && userAnswer !== null;
            const isCorrect = hasAnswered && userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-[#131E30] border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                      : 'bg-[#131E30] border-rose-500/40 shadow-lg shadow-rose-500/5'
                    : 'bg-[#131E30] border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#E5B65C] bg-[#E5B65C]/15 px-2.5 py-0.5 rounded border border-[#E5B65C]/30">
                      Q{q.id < 10 ? `0${q.id}` : q.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {q.category}
                    </span>
                  </div>

                  {hasAnswered && (
                    <div className="flex items-center gap-1.5">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5" /> 정답입니다!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
                          <X className="w-3.5 h-3.5" /> 오답 (선지 재확인 필요)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Statement */}
                <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed mb-6">
                  {q.question}
                </h4>

                {/* O / X Selection Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSelectAnswer(q.id, true)}
                    className={`flex-1 py-3 px-4 rounded-xl border font-bold text-base transition-all flex items-center justify-center gap-2 ${
                      userAnswer === true
                        ? isCorrect
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">O</span>
                    <span className="text-xs font-medium">옳은 진술</span>
                  </button>

                  <button
                    onClick={() => handleSelectAnswer(q.id, false)}
                    className={`flex-1 py-3 px-4 rounded-xl border font-bold text-base transition-all flex items-center justify-center gap-2 ${
                      userAnswer === false
                        ? isCorrect
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">X</span>
                    <span className="text-xs font-medium">틀린 진술</span>
                  </button>
                </div>

                {/* Detailed Rationale & Misconception Clinic (Visible after user selects an answer) */}
                {hasAnswered && (
                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4 animate-in fade-in">
                    {/* Core Rationale */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>정답 판정 근거 (2022 개정 통합사회 기준)</span>
                      </span>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <strong className="text-white mr-1.5">
                          [정답: {q.correctAnswer ? 'O' : 'X'}]
                        </strong>
                        {q.explanation}
                      </p>
                    </div>

                    {/* Wrong Statement Correction (if statement was X) */}
                    {q.wrongStatementCorrection && (
                      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                        <span className="text-xs font-bold text-amber-300 block">
                          ✍️ 오답 어구 교정 클리닉 (수능식 문장 바로잡기)
                        </span>
                        <div className="text-xs sm:text-sm space-y-1">
                          <p className="text-rose-300 line-through">
                            ❌ 틀린 표현: "{q.wrongStatementCorrection.originalWrongPart}"
                          </p>
                          <p className="text-emerald-300 font-semibold">
                            ⭕ 올바른 표준 표현: "{q.wrongStatementCorrection.correctedStatement}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Misconception Killer & Exam Tip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                        <span className="font-bold text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> 오개념 킬러
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {q.misconceptionAlert}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                        <span className="font-bold text-[#E5B65C] flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" /> 시험 득점 팁
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {q.examTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Completion Banner */}
      {answeredCount === totalQuestions && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#131E30] to-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
          <h4 className="text-xl font-bold text-white">
            축하합니다! 24개 전 문항 개념 진단을 완료하였습니다.
          </h4>
          <p className="text-sm text-slate-300">
            총 {totalQuestions}문항 중 {correctCount}문항 정답 (정답률 {scorePercent}%)을 기록했습니다.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetAll}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-[#E5B65C] rounded-lg hover:bg-[#d8a84e] transition-colors"
            >
              처음부터 다시 진단하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
