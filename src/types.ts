export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'fácil' | 'medio' | 'difícil';
  image?: string;
}

export const QUESTIONS: Question[] = [
  // Fácil
  {
    id: 1,
    text: "¿Qué día comienza oficialmente la Semana Santa?",
    options: ["Lunes Santo", "Domingo de Ramos", "Miércoles de Ceniza", "Viernes de Dolores"],
    correctAnswer: 1,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p1.jpg'
  },
  {
    id: 2,
    text: "¿Qué animal montó Jesús al entrar en Jerusalén?",
    options: ["Un caballo", "Un camello", "Un pollino (borriquito)", "Un buey"],
    correctAnswer: 2,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p2.jpg'
  },
  {
    id: 3,
    text: "¿Quién traicionó a Jesús por treinta monedas de plata?",
    options: ["Pedro", "Juan", "Santiago", "Judas Iscariote"],
    correctAnswer: 3,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p3.jpg'
  },
  {
    id: 4,
    text: "¿Qué dulce es el más típico de la Semana Santa en España?",
    options: ["Roscón de Reyes", "Torrijas", "Turrón", "Polvorones"],
    correctAnswer: 1,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p4.jpg'
  },
  {
    id: 13,
    text: "¿Cuántos apóstoles tenía Jesús?",
    options: ["10", "12", "7", "14"],
    correctAnswer: 1,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p13.jpg'
  },
  {
    id: 14,
    text: "¿Qué planta se bendice el Domingo de Ramos?",
    options: ["Ramas de olivo y palmas", "Rosas", "Pinos", "Cactus"],
    correctAnswer: 0,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p14.jpg'
  },
  {
    id: 15,
    text: "¿En qué ciudad nació Jesús?",
    options: ["Jerusalén", "Nazaret", "Belén", "Roma"],
    correctAnswer: 2,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p15.jpg'
  },
  {
    id: 16,
    text: "¿Qué se celebra el Domingo de Resurrección?",
    options: ["La muerte de Jesús", "La vuelta a la vida de Jesús", "La Última Cena", "El bautismo de Jesús"],
    correctAnswer: 1,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p16.jpg'
  },
  {
    id: 17,
    text: "¿De qué material era la corona que le pusieron a Jesús?",
    options: ["De oro", "De flores", "De espinas", "De plata"],
    correctAnswer: 2,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p17.jpg'
  },
  {
    id: 18,
    text: "¿Quién negó a Jesús tres veces antes de que cantara el gallo?",
    options: ["Pedro", "Andrés", "Mateo", "Tomás"],
    correctAnswer: 0,
    difficulty: 'fácil',
    image: 'https://lasfuentes-alcaste.com/ssta/p18.jpg'
  },
  // Medio
  {
    id: 5,
    text: "¿Cómo se llama el gorro cónico que llevan los nazarenos?",
    options: ["Capirote", "Sombrero", "Tiara", "Mitra"],
    correctAnswer: 0,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p5.jpg'
  },
  {
    id: 6,
    text: "¿Qué ciudad española es famosa por su 'Madrugá'?",
    options: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    correctAnswer: 2,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p6.jpg'
  },
  {
    id: 7,
    text: "¿Quién fue el gobernador romano que condenó a Jesús?",
    options: ["Herodes", "Poncio Pilato", "Cayo Julio César", "Nerón"],
    correctAnswer: 1,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p7.jpg'
  },
  {
    id: 8,
    text: "¿Qué se conmemora el Jueves Santo?",
    options: ["La Resurrección", "La Crucifixión", "La Última Cena", "La Entrada en Jerusalén"],
    correctAnswer: 2,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p8.jpg'
  },
  {
    id: 19,
    text: "¿Qué apóstol es conocido por dudar de la resurrección de Jesús?",
    options: ["Juan", "Mateo", "Tomás", "Bartolomé"],
    correctAnswer: 2,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p19.jpg'
  },
  {
    id: 20,
    text: "¿Cómo se llama el lugar donde Jesús fue a orar antes de ser arrestado?",
    options: ["Monte Sinaí", "Getsemaní", "Jordán", "Galilea"],
    correctAnswer: 1,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p20.jpg'
  },
  {
    id: 21,
    text: "¿Qué discípulo era recaudador de impuestos antes de seguir a Jesús?",
    options: ["Lucas", "Marcos", "Mateo", "Felipe"],
    correctAnswer: 2,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p21.jpg'
  },
  {
    id: 22,
    text: "¿Qué significa la palabra 'Pascua'?",
    options: ["Fiesta", "Paso o Salto", "Sacrificio", "Renacimiento"],
    correctAnswer: 1,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p22.jpg'
  },
  {
    id: 23,
    text: "¿Cuántas veces cayó Jesús cargando la cruz según la tradición?",
    options: ["Una vez", "Dos veces", "Tres veces", "Siete veces"],
    correctAnswer: 2,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p23.jpg'
  },
  {
    id: 24,
    text: "¿Quién ayudó a Jesús a cargar la cruz?",
    options: ["José de Arimatea", "Simón de Cirene", "Lázaro", "Nicodemo"],
    correctAnswer: 1,
    difficulty: 'medio',
    image: 'https://lasfuentes-alcaste.com/ssta/p24.jpg'
  },
  // Difícil
  {
    id: 9,
    text: "¿Cuál es la hermandad más antigua de Sevilla según la tradición?",
    options: ["El Silencio", "Los Negritos", "La Macarena", "El Gran Poder"],
    correctAnswer: 1,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p9.jpg'
  },
  {
    id: 10,
    text: "¿Qué significan las siglas I.N.R.I. puestas en la cruz?",
    options: ["Iesus Nazarenus Rex Iudaeorum", "In Nomine Rex Israel", "Iesus Natus Rex Israel", "Iustus Nazarenus Rex Iudaeorum"],
    correctAnswer: 0,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p10.jpg'
  },
  {
    id: 11,
    text: "¿Cómo se llama el palo que llevan los nazarenos para apoyarse o iluminar?",
    options: ["Vara", "Cirio", "Báculo", "Pértiga"],
    correctAnswer: 1,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p11.jpg'
  },
  {
    id: 12,
    text: "¿En qué monte fue crucificado Jesús?",
    options: ["Monte Sinaí", "Monte de los Olivos", "Monte Calvario (Gólgota)", "Monte Tabor"],
    correctAnswer: 2,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p12.jpg'
  },
  {
    id: 25,
    text: "¿Qué profeta del Antiguo Testamento es considerado el que más profetizó sobre la Pasión?",
    options: ["Jeremías", "Ezequiel", "Isaías", "Daniel"],
    correctAnswer: 2,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p25.jpg'
  },
  {
    id: 26,
    text: "¿Cómo se llama el lienzo con el que la Verónica limpió el rostro de Jesús?",
    options: ["Sábana Santa", "Santo Rostro o Santa Faz", "Sudario de Turín", "Manto Sagrado"],
    correctAnswer: 1,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p26.jpg'
  },
  {
    id: 27,
    text: "¿Quién era el sumo sacerdote que interrogó a Jesús antes de llevarlo ante Pilato?",
    options: ["Caifás", "Anás", "Gamaliel", "Zacarías"],
    correctAnswer: 0,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p27.jpg'
  },
  {
    id: 28,
    text: "¿Qué salmo empezó a recitar Jesús en la cruz según los Evangelios?",
    options: ["Salmo 23", "Salmo 51", "Salmo 22", "Salmo 91"],
    correctAnswer: 2,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p28.jpg'
  },
  {
    id: 29,
    text: "¿Cuál es el nombre del ladrón que se arrepintió en la cruz junto a Jesús?",
    options: ["Gestas", "Dimas", "Barrabás", "Longinos"],
    correctAnswer: 1,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p29.jpg'
  },
  {
    id: 30,
    text: "¿Qué centurión romano se dice que atravesó el costado de Jesús con una lanza?",
    options: ["Cornelio", "Longinos", "Estéfano", "Marco"],
    correctAnswer: 1,
    difficulty: 'difícil',
    image: 'https://lasfuentes-alcaste.com/ssta/p30.jpg'
  }
];

export interface Score {
  id: number;
  name: string;
  score: number;
  difficulty: string;
  date: string;
}
