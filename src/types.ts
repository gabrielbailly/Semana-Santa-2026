export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'fácil' | 'medio' | 'difícil';
  image?: string;
}

export const QUESTIONS: Question[] = [
  // Dificultad: Fácil (1)
  { id: 1, text: "¿Qué celebración aparece en esta escena?", options: ["La Última Cena", "La Resurrección", "La Ascensión", "Pentecostés"], correctAnswer: 0, difficulty: 'fácil', image: '/1.jpg' },
  { id: 2, text: "¿Cuántos discípulos estaban con Jesús en la Última Cena?", options: ["10", "12", "7", "15"], correctAnswer: 1, difficulty: 'fácil', image: '/1.jpg' },
  { id: 3, text: "¿Qué alimento parte Jesús en la Última Cena?", options: ["Pan", "Pescado", "Cordero", "Fruta"], correctAnswer: 0, difficulty: 'fácil', image: '/1.jpg' },
  { id: 4, text: "¿Dónde reza Jesús antes de ser arrestado?", options: ["Monte Tabor", "Huerto de Getsemaní", "Nazaret", "Jerusalén"], correctAnswer: 1, difficulty: 'fácil', image: '/2.jpg' },
  { id: 5, text: "¿Qué hacen los discípulos mientras Jesús reza?", options: ["Hablan", "Duermen", "Comen", "Huyen"], correctAnswer: 1, difficulty: 'fácil', image: '/2.jpg' },
  { id: 6, text: "¿Qué está haciendo Jesús en esta escena?", options: ["Predicando", "Rezando", "Caminando", "Comiendo"], correctAnswer: 1, difficulty: 'fácil', image: '/2.jpg' },
  { id: 7, text: "¿Ante quién comparece Jesús en esta escena?", options: ["Herodes", "Pilato", "Caifás", "Pedro"], correctAnswer: 1, difficulty: 'fácil', image: '/3.jpg' },
  { id: 8, text: "¿Qué autoridad juzga a Jesús?", options: ["Romana", "Griega", "Egipcia", "Persa"], correctAnswer: 0, difficulty: 'fácil', image: '/3.jpg' },
  { id: 9, text: "¿Qué lleva Jesús sobre sus hombros?", options: ["Una cruz", "Una espada", "Una corona", "Un estandarte"], correctAnswer: 0, difficulty: 'fácil', image: '/4.jpg' },
  { id: 10, text: "¿Hacia dónde se dirige Jesús con la cruz?", options: ["Nazaret", "Calvario", "Belén", "Cafarnaúm"], correctAnswer: 1, difficulty: 'fácil', image: '/4.jpg' },
  { id: 11, text: "¿A quién encuentra Jesús en el camino al Calvario según la tradición?", options: ["Su madre", "Juan Bautista", "Herodes", "Un sacerdote"], correctAnswer: 0, difficulty: 'fácil', image: '/5.jpg' },
  { id: 12, text: "¿Cómo se llama este camino tradicionalmente?", options: ["Camino de Santiago", "Vía Crucis", "Camino Real", "Sendero Santo"], correctAnswer: 1, difficulty: 'fácil', image: '/5.jpg' },
  { id: 13, text: "¿Dónde muere Jesús?", options: ["En una cruz", "En un templo", "En una casa", "En un barco"], correctAnswer: 0, difficulty: 'fácil', image: '/6.jpg' },
  { id: 14, text: "¿Cuántas cruces aparecen normalmente en esta escena?", options: ["Dos", "Tres", "Cuatro", "Cinco"], correctAnswer: 1, difficulty: 'fácil', image: '/6.jpg' },
  { id: 15, text: "¿Qué están haciendo con el cuerpo de Jesús?", options: ["Lo están enterrando", "Lo están bajando de la cruz", "Lo están coronando", "Lo están llevando a Roma"], correctAnswer: 1, difficulty: 'fácil', image: '/7.jpg' },
  { id: 16, text: "¿Cómo se llama este momento?", options: ["Descendimiento", "Ascensión", "Bautismo", "Transfiguración"], correctAnswer: 0, difficulty: 'fácil', image: '/7.jpg' },
  { id: 17, text: "¿Dónde colocan el cuerpo de Jesús?", options: ["En una tumba", "En el templo", "En el río", "En una cueva"], correctAnswer: 0, difficulty: 'fácil', image: '/8.jpg' },
  { id: 18, text: "¿Qué cerraba la entrada del sepulcro?", options: ["Una puerta", "Una gran piedra", "Un muro", "Una cortina"], correctAnswer: 1, difficulty: 'fácil', image: '/8.jpg' },
  { id: 19, text: "¿Quién aparece junto al sepulcro vacío?", options: ["Un ángel", "Un soldado", "Pedro", "Pilato"], correctAnswer: 0, difficulty: 'fácil', image: '/9.jpg' },
  { id: 20, text: "¿Quién se encuentra con Jesús resucitado?", options: ["María Magdalena", "María y Marta", "Verónica", "Salomé"], correctAnswer: 0, difficulty: 'fácil', image: '/10.jpg' },

  // Dificultad: Medio (2)
  { id: 21, text: "¿Qué sacramento instituye Jesús en la Última Cena?", options: ["Bautismo", "Eucaristía", "Confirmación", "Matrimonio"], correctAnswer: 1, difficulty: 'medio', image: '/1.jpg' },
  { id: 22, text: "¿Qué bebida comparte Jesús con sus discípulos?", options: ["Agua", "Vino", "Leche", "Aceite"], correctAnswer: 1, difficulty: 'medio', image: '/1.jpg' },
  { id: 23, text: "¿Qué fiesta judía celebraban durante esta cena?", options: ["Pentecostés", "Pascua", "Hanukkah", "Yom Kippur"], correctAnswer: 1, difficulty: 'medio', image: '/1.jpg' },
  { id: 24, text: "¿Qué discípulo acompañan más de cerca a Jesús en Getsemaní?", options: ["Pedro, Santiago y Juan", "Mateo, Tomás y Andrés", "Felipe, Bartolomé y Judas", "Simón, Judas y Mateo"], correctAnswer: 0, difficulty: 'medio', image: '/2.jpg' },
  { id: 25, text: "¿Qué pidió Jesús al Padre en su oración?", options: ["Poder", "Gloria", "Que se hiciera su voluntad", "Riquezas"], correctAnswer: 2, difficulty: 'medio', image: '/2.jpg' },
  { id: 26, text: "¿Qué gobernaba Pilato en Judea?", options: ["El ejército", "El imperio romano", "El templo", "La sinagoga"], correctAnswer: 1, difficulty: 'medio', image: '/3.jpg' },
  { id: 27, text: "¿Qué preso fue liberado en lugar de Jesús?", options: ["Barrabás", "Herodes", "Simón", "Caifás"], correctAnswer: 0, difficulty: 'medio', image: '/3.jpg' },
  { id: 28, text: "¿Quién ayudó a Jesús a llevar la cruz?", options: ["Simón de Cirene", "Pedro", "Juan", "Andrés"], correctAnswer: 0, difficulty: 'medio', image: '/4.jpg' },
  { id: 29, text: "¿Qué mujeres lloraban al ver a Jesús?", options: ["Las mujeres de Jerusalén", "Las romanas", "Las fariseas", "Las samaritanas"], correctAnswer: 0, difficulty: 'medio', image: '/4.jpg' },
  { id: 30, text: "¿Qué mujer secó el rostro de Jesús según la tradición?", options: ["Verónica", "Magdalena", "Salomé", "Marta"], correctAnswer: 0, difficulty: 'medio', image: '/5.jpg' },
  { id: 31, text: "¿Qué signo se colocó sobre la cruz de Jesús?", options: ["INRI", "XP", "IHS", "ALFA"], correctAnswer: 0, difficulty: 'medio', image: '/6.jpg' },
  { id: 32, text: "¿Quién estaba junto a Jesús en las otras cruces?", options: ["Dos ladrones", "Dos soldados", "Dos discípulos", "Dos sacerdotes"], correctAnswer: 0, difficulty: 'medio', image: '/6.jpg' },
  { id: 33, text: "¿Quién pidió el cuerpo de Jesús para enterrarlo?", options: ["José de Arimatea", "Pedro", "Herodes", "Barrabás"], correctAnswer: 0, difficulty: 'medio', image: '/7.jpg' },
  { id: 34, text: "¿Qué discípulo ayudó también en el entierro?", options: ["Nicodemo", "Mateo", "Tomás", "Felipe"], correctAnswer: 0, difficulty: 'medio', image: '/7.jpg' },
  { id: 35, text: "¿De qué material estaba excavado el sepulcro?", options: ["Roca", "Madera", "Arena", "Arcilla"], correctAnswer: 0, difficulty: 'medio', image: '/8.jpg' },
  { id: 36, text: "¿Qué día fue enterrado Jesús?", options: ["Viernes", "Domingo", "Lunes", "Miércoles"], correctAnswer: 0, difficulty: 'medio', image: '/8.jpg' },
  { id: 37, text: "¿Qué anuncia el ángel en el sepulcro?", options: ["Que Jesús ha resucitado", "Que Jesús dormía", "Que Jesús partió", "Que Jesús regresará luego"], correctAnswer: 0, difficulty: 'medio', image: '/9.jpg' },
  { id: 38, text: "¿Qué mujeres fueron al sepulcro?", options: ["María Magdalena y otras mujeres", "Solo María", "Las romanas", "Las discípulas"], correctAnswer: 0, difficulty: 'medio', image: '/9.jpg' },
  { id: 39, text: "¿Qué día ocurrió la resurrección?", options: ["Domingo", "Viernes", "Jueves", "Sábado"], correctAnswer: 0, difficulty: 'medio', image: '/10.jpg' },
  { id: 40, text: "¿Qué reconoce María Magdalena al ver a Jesús?", options: ["Que está vivo", "Que es un ángel", "Que es Pedro", "Que es un soldado"], correctAnswer: 0, difficulty: 'medio', image: '/10.jpg' },

  // Dificultad: Difícil (3)
  { id: 41, text: "¿Qué gesto de servicio realizó Jesús durante la Última Cena?", options: ["Lavó los pies a los discípulos", "Curó a un enfermo", "Multiplicó panes", "Resucitó a Lázaro"], correctAnswer: 0, difficulty: 'difícil', image: '/1.jpg' },
  { id: 42, text: "¿Quién traicionó a Jesús?", options: ["Judas Iscariote", "Pedro", "Juan", "Santiago"], correctAnswer: 0, difficulty: 'difícil', image: '/1.jpg' },
  { id: 43, text: "¿Qué nuevo mandamiento dio Jesús en la Última Cena?", options: ["Amaos unos a otros", "Conquistad el mundo", "Construid templos", "Haced sacrificios"], correctAnswer: 0, difficulty: 'difícil', image: '/1.jpg' },
  { id: 44, text: "¿Qué discípulo cortó la oreja de un soldado?", options: ["Pedro", "Juan", "Tomás", "Felipe"], correctAnswer: 0, difficulty: 'difícil', image: '/2.jpg' },
  { id: 45, text: "¿Cómo se llamaba el soldado cuya oreja fue cortada?", options: ["Malco", "Lucas", "Cayo", "Tito"], correctAnswer: 0, difficulty: 'difícil', image: '/2.jpg' },
  { id: 46, text: "¿Qué pregunta famosa hizo Pilato a Jesús?", options: ["¿Qué es la verdad?", "¿Quién eres?", "¿Dónde naciste?", "¿Quién te envía?"], correctAnswer: 0, difficulty: 'difícil', image: '/3.jpg' },
  { id: 47, text: "¿Qué gesto hizo Pilato para mostrar que no era responsable?", options: ["Se lavó las manos", "Se arrodilló", "Rasgó sus vestiduras", "Escribió una carta"], correctAnswer: 0, difficulty: 'difícil', image: '/3.jpg' },
  { id: 48, text: "¿Cuántas caídas de Jesús recuerda la tradición del Vía Crucis?", options: ["Tres", "Dos", "Cinco", "Cuatro"], correctAnswer: 0, difficulty: 'difícil', image: '/4.jpg' },
  { id: 49, text: "¿Cómo se llama el monte donde fue crucificado Jesús?", options: ["Gólgota", "Tabor", "Carmelo", "Hermón"], correctAnswer: 0, difficulty: 'difícil', image: '/4.jpg' },
  { id: 50, text: "¿Qué frase dirige Jesús a las mujeres de Jerusalén?", options: ["No lloréis por mí", "Seguidme", "Escuchadme", "Esperad aquí"], correctAnswer: 0, difficulty: 'difícil', image: '/5.jpg' },
  { id: 51, text: "¿Qué dijo Jesús al buen ladrón?", options: ["Hoy estarás conmigo en el Paraíso", "Te perdono", "Te salvaré", "Ven conmigo"], correctAnswer: 0, difficulty: 'difícil', image: '/6.jpg' },
  { id: 52, text: "¿Qué palabras finales pronunció Jesús según el evangelio de Juan?", options: ["Todo está cumplido", "Padre ayúdame", "Tengo sed", "Venid a mí"], correctAnswer: 0, difficulty: 'difícil', image: '/6.jpg' },
  { id: 53, text: "¿Cómo se llama la escena de María con Jesús muerto en brazos?", options: ["La Piedad", "La Gloria", "La Misericordia", "La Esperanza"], correctAnswer: 0, difficulty: 'difícil', image: '/7.jpg' },
  { id: 54, text: "¿Qué tela envolvió el cuerpo de Jesús?", options: ["Una sábana", "Un manto púrpura", "Un velo", "Una túnica"], correctAnswer: 0, difficulty: 'difícil', image: '/7.jpg' },
  { id: 55, text: "¿Qué especias llevaron al sepulcro?", options: ["Mirra y áloe", "Canela y miel", "Aceite y sal", "Incienso y vino"], correctAnswer: 0, difficulty: 'difícil', image: '/8.jpg' },
  { id: 56, text: "¿Qué soldados vigilaban el sepulcro?", options: ["Romanos", "Judíos", "Griegos", "Egipcios"], correctAnswer: 0, difficulty: 'difícil', image: '/8.jpg' },
  { id: 57, text: "¿Qué dice el ángel a las mujeres?", options: ["No está aquí, ha resucitado", "Está dormido", "Volverá mañana", "Buscad en otro lugar"], correctAnswer: 0, difficulty: 'difícil', image: '/9.jpg' },
  { id: 58, text: "¿Qué sucede con la piedra del sepulcro?", options: ["Está removida", "Está rota", "Está sellada", "Está enterrada"], correctAnswer: 0, difficulty: 'difícil', image: '/9.jpg' },
  { id: 59, text: "¿Qué palabra hebrea dice María Magdalena al reconocer a Jesús?", options: ["Rabbuní", "Hosanna", "Amen", "Shalom"], correctAnswer: 0, difficulty: 'difícil', image: '/10.jpg' },
  { id: 60, text: "¿Qué significa Rabbuní?", options: ["Maestro", "Rey", "Señor", "Padre"], correctAnswer: 0, difficulty: 'difícil', image: '/10.jpg' }
];

export interface Score {
  id: number;
  name: string;
  score: number;
  difficulty: string;
  date: string;
}
