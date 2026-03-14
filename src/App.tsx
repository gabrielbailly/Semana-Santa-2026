import React, { useState, useEffect, useRef, Component, ReactNode } from 'react';
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
  VolumeX,
  Share2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTIONS, Question, Score } from './types';
import { db, auth } from './firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, getDocFromServer, doc } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// --- Firebase Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authConfigError, setAuthConfigError] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth).catch((error) => {
          if (error.code === 'auth/admin-restricted-operation') {
            setAuthConfigError(true);
            console.error(
              "CRITICAL: Anonymous Authentication is disabled or User Sign-up is restricted in your Firebase Console. " +
              "Please go to Authentication > Settings > User actions and ensure 'Allow users to sign up' is checked, " +
              "and Authentication > Sign-in method to enable 'Anonymous'."
            );
          } else {
            console.error("Auth error:", error);
          }
        });
      } else {
        setAuthConfigError(false);
      }
      setIsAuthReady(true);
    });

    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scores = snapshot.docs.map(doc => ({
        id: doc.id as any,
        ...doc.data()
      })) as Score[];
      setLeaderboard(scores);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'scores');
    });

    return () => unsubscribe();
  }, [isAuthReady]);

  useEffect(() => {
    if (view !== 'quiz' || isAnswered) return;

    if (timeLeft === 0) {
      handleAnswer(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [view, timeLeft, isAnswered]);

  useEffect(() => {
    if (view === 'quiz') {
      setTimeLeft(7);
    }
  }, [currentQuestionIndex, view]);

  const fetchLeaderboard = async () => {
    // Handled by onSnapshot
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
      
      // Trigger confetti if score is high (e.g., more than 70% correct)
      const percentage = (score / (filteredQuestions.length * 10)) * 100;
      if (score >= filteredQuestions.length * 7) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9333ea', '#c026d3', '#7c3aed', '#ffffff']
        });
      }
      
      setView('result');
    }
  };

  const saveScore = async () => {
    if (!playerName.trim()) return;
    try {
      const scoreData = {
        name: playerName,
        score,
        difficulty,
        date: new Date().toISOString()
      };
      await addDoc(collection(db, 'scores'), scoreData);
      setView('leaderboard');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'scores');
    }
  };

  const handleShare = async () => {
    const text = `¡He conseguido ${score} puntos en el nivel ${difficulty} de la Trivia de Semana Santa! ¿Te atreves a superarme? 🕊️✨`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Trivia de Semana Santa',
          text: text,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard or open Twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
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

      {/* Auth Config Error Warning */}
      {authConfigError && (
        <div className="fixed bottom-0 left-0 right-0 bg-rose-600 text-white p-4 z-[100] shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="max-w-2xl mx-auto flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold">Acción requerida en Firebase Console</p>
              <p className="text-sm opacity-90">
                Para que el ranking funcione, debes habilitar el acceso en tu consola de Firebase:
              </p>
              <ol className="text-xs list-decimal list-inside space-y-1 opacity-80">
                <li>Ve a <b>Authentication</b> &gt; <b>Sign-in method</b> y habilita <b>Anónimo</b>.</li>
                <li>Ve a <b>Settings</b> &gt; <b>User actions</b> y marca <b>"Allow users to sign up"</b>.</li>
              </ol>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="ml-auto bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

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
              <div className="relative inline-block w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-50">
                <img 
                  src="/portada.png" 
                  alt="Semana Santa" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-serif italic text-slate-900">
                  Trivial de Semana Santa
                </h1>
                <p className="text-slate-500 max-w-md mx-auto">
                  Pon a prueba tus conocimientos sobre la Pasión, muerte y Resurrección de Jesús
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
                <div className="flex flex-wrap items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    Pregunta {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${DIFFICULTY_COLORS[difficulty]}`}>
                    {difficulty}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${timeLeft <= 3 ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono font-bold">{timeLeft}s</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <Award className="w-5 h-5" />
                    {score} pts
                  </div>
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
                {filteredQuestions[currentQuestionIndex].image && (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-200 flex items-center justify-center relative">
                    <img 
                      src={filteredQuestions[currentQuestionIndex].image} 
                      alt="Pregunta" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
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

              {isAnswered && selectedOption === -1 && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-rose-600 font-bold"
                >
                  ¡Se acabó el tiempo!
                </motion.p>
              )}

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
                  onClick={handleShare}
                  className="w-full py-4 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> Compartir Resultado
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
