import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Play, 
  ChevronRight, 
  RotateCcw, 
  Home, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Volume2,
  VolumeX
} from 'lucide-react';
import { QUESTIONS, Question, Score } from './types';

const DIFFICULTY_COLORS = {
  fácil: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medio: 'bg-amber-100 text-amber-700 border-amber-200',
  difícil: 'bg-rose-100 text-rose-700 border-rose-200',
};

const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/601/601-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
};

export default function App() {
  const [view, setView] = useState<'home' | 'difficulty' | 'quiz' | 'result' | 'leaderboard'>('home');
  const [difficulty, setDifficulty] = useState<'fácil' | 'medio' | 'difícil'>('fácil');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/scores');
      const data = await res.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const playSound = (type: keyof typeof SOUNDS) => {
    if (!soundEnabled) return;
    const audio = new Audio(SOUNDS[type]);
    audio.volume = 0.4;
    audio.play().catch(e => console.log('Audio play blocked:', e));
  };

  const startQuiz = (diff: 'fácil' | 'medio' | 'difícil') => {
    const questions = QUESTIONS.filter(q => q.difficulty === diff);
    setFilteredQuestions(questions);
    setDifficulty(diff);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setView('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === filteredQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      playSound('complete');
      setView('result');
    }
  };

  const saveScore = async () => {
    if (!playerName.trim()) return;
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score, difficulty }),
      });
      fetchLeaderboard();
      setView('leaderboard');
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-slate-900 font-sans selection:bg-purple-100">
      {/* Sound Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-3 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
          title={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-purple-100 rounded-full blur-2xl opacity-50" />
                <Trophy className="w-20 h-20 mx-auto text-purple-600 relative" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-serif italic text-slate-900">
                  Trivia de Semana Santa
                </h1>
                <p className="text-slate-500 max-w-md mx-auto">
                  Pon a prueba tus conocimientos sobre las tradiciones, historia y curiosidades de la Semana Santa.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setView('difficulty')}
                  className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Empezar Juego
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setView('leaderboard')}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Clasificación
                </button>
              </div>
            </motion.div>
          )}

          {view === 'difficulty' && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif italic">Elige tu nivel</h2>
                <p className="text-slate-500">¿Qué tanto sabes sobre la pasión?</p>
              </div>
              <div className="grid gap-4">
                {(['fácil', 'medio', 'difícil'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => startQuiz(level)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] active:scale-95 ${DIFFICULTY_COLORS[level]}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase tracking-widest font-bold opacity-70">{level}</span>
                        <h3 className="text-xl font-bold capitalize">{level}</h3>
                      </div>
                      <ChevronRight className="w-6 h-6 opacity-50" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setView('home')}
                className="w-full py-4 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Volver al inicio
              </button>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  Pregunta {currentQuestionIndex + 1} / {filteredQuestions.length}
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-bold">
                  <Award className="w-5 h-5" />
                  {score} pts
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif leading-tight">
                  {filteredQuestions[currentQuestionIndex].text}
                </h2>
                <div className="grid gap-3">
                  {filteredQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isCorrect = idx === filteredQuestions[currentQuestionIndex].correctAnswer;
                    const isSelected = idx === selectedOption;
                    
                    let buttonClass = "p-5 rounded-xl border-2 text-left transition-all flex justify-between items-center ";
                    if (!isAnswered) {
                      buttonClass += "border-slate-100 hover:border-purple-200 hover:bg-purple-50/30";
                    } else {
                      if (isCorrect) buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                      else if (isSelected) buttonClass += "border-rose-500 bg-rose-50 text-rose-700";
                      else buttonClass += "border-slate-100 opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={buttonClass}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex + 1 === filteredQuestions.length ? 'Ver Resultados' : 'Siguiente Pregunta'}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-4xl font-serif italic">¡Fin del juego!</h2>
                <div className="text-6xl font-bold text-slate-900">{score}</div>
                <p className="text-slate-500">Puntos acumulados en nivel {difficulty}</p>
              </div>

              <div className="max-w-xs mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-purple-500 outline-none transition-all text-center"
                />
                <button
                  onClick={saveScore}
                  disabled={!playerName.trim()}
                  className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                  Guardar Puntuación
                </button>
                <button
                  onClick={() => setView('difficulty')}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Reintentar
                </button>
              </div>
            </motion.div>
          )}

          {view === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif italic">Clasificación</h2>
                <p className="text-slate-500">Los mejores cofrades</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 p-4 bg-slate-50 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">Jugador</div>
                  <div className="col-span-3">Nivel</div>
                  <div className="col-span-2 text-right">Pts</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {leaderboard.map((entry, idx) => (
                    <div key={entry.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50 transition-colors">
                      <div className="col-span-1 font-mono text-slate-400">{idx + 1}</div>
                      <div className="col-span-6 font-bold text-slate-700">{entry.name}</div>
                      <div className="col-span-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          entry.difficulty === 'fácil' ? 'bg-emerald-100 text-emerald-700' :
                          entry.difficulty === 'medio' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {entry.difficulty}
                        </span>
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold text-purple-600">{entry.score}</div>
                    </div>
                  ))}
                  {leaderboard.length === 0 && (
                    <div className="p-8 text-center text-slate-400">No hay puntuaciones todavía.</div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setView('home')}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" /> Volver al Inicio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
