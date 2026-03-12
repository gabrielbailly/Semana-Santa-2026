export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'fácil' | 'medio' | 'difícil';
}

export const QUESTIONS: Question[] = [
  // Fácil
  {
    id: 1,
    text: "¿Qué día comienza oficialmente la Semana Santa?",
    options: ["Lunes Santo", "Domingo de Ramos", "Miércoles de Ceniza", "Viernes de Dolores"],
    correctAnswer: 1,
    difficulty: 'fácil'
  },
  {
    id: 2,
    text: "¿Qué animal montó Jesús al entrar en Jerusalén?",
    options: ["Un caballo", "Un camello", "Un pollino (borriquito)", "Un buey"],
    correctAnswer: 2,
    difficulty: 'fácil'
  },
  {
    id: 3,
    text: "¿Quién traicionó a Jesús por treinta monedas de plata?",
    options: ["Pedro", "Juan", "Santiago", "Judas Iscariote"],
    correctAnswer: 3,
    difficulty: 'fácil'
  },
  {
    id: 4,
    text: "¿Qué dulce es el más típico de la Semana Santa en España?",
    options: ["Roscón de Reyes", "Torrijas", "Turrón", "Polvorones"],
    correctAnswer: 1,
    difficulty: 'fácil'
  },
  // Medio
  {
    id: 5,
    text: "¿Cómo se llama el gorro cónico que llevan los nazarenos?",
    options: ["Capirote", "Sombrero", "Tiara", "Mitra"],
    correctAnswer: 0,
    difficulty: 'medio'
  },
  {
    id: 6,
    text: "¿Qué ciudad española es famosa por su 'Madrugá'?",
    options: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    correctAnswer: 2,
    difficulty: 'medio'
  },
  {
    id: 7,
    text: "¿Quién fue el gobernador romano que condenó a Jesús?",
    options: ["Herodes", "Poncio Pilato", "Cayo Julio César", "Nerón"],
    correctAnswer: 1,
    difficulty: 'medio'
  },
  {
    id: 8,
    text: "¿Qué se conmemora el Jueves Santo?",
    options: ["La Resurrección", "La Crucifixión", "La Última Cena", "La Entrada en Jerusalén"],
    correctAnswer: 2,
    difficulty: 'medio'
  },
  // Difícil
  {
    id: 9,
    text: "¿Cuál es la hermandad más antigua de Sevilla según la tradición?",
    options: ["El Silencio", "Los Negritos", "La Macarena", "El Gran Poder"],
    correctAnswer: 1,
    difficulty: 'difícil'
  },
  {
    id: 10,
    text: "¿Qué significan las siglas I.N.R.I. puestas en la cruz?",
    options: ["Iesus Nazarenus Rex Iudaeorum", "In Nomine Rex Israel", "Iesus Natus Rex Israel", "Iustus Nazarenus Rex Iudaeorum"],
    correctAnswer: 0,
    difficulty: 'difícil'
  },
  {
    id: 11,
    text: "¿Cómo se llama el palo que llevan los nazarenos para apoyarse o iluminar?",
    options: ["Vara", "Cirio", "Báculo", "Pértiga"],
    correctAnswer: 1,
    difficulty: 'difícil'
  },
  {
    id: 12,
    text: "¿En qué monte fue crucificado Jesús?",
    options: ["Monte Sinaí", "Monte de los Olivos", "Monte Calvario (Gólgota)", "Monte Tabor"],
    correctAnswer: 2,
    difficulty: 'difícil'
  }
];

export interface Score {
  id: number;
  name: string;
  score: number;
  difficulty: string;
  date: string;
}
