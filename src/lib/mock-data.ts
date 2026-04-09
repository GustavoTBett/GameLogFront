export interface Game {
  id: string
  title: string
  cover: string
  description: string
  genres: string[]
  releaseYear: number
  averageRating: number
  totalReviews: number
  developer: string
  publisher: string
}

export interface Review {
  id: string
  gameId: string
  userId: string
  username: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
  likes: number
}

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  joinedAt: string
  totalReviews: number
  totalFavorites: number
  averageRating: number
}

export const genres = [
  "Ação",
  "Aventura",
  "RPG",
  "Estratégia",
  "Simulação",
  "Esportes",
  "Puzzle",
  "Terror",
  "Indie",
  "Multiplayer",
  "Plataforma",
  "Corrida",
]

export const mockGames: Game[] = [
  {
    id: "1",
    title: "The Legend of Zelda: Tears of the Kingdom",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
    description: "Uma aventura épica em um vasto mundo aberto onde você pode explorar, criar e descobrir segredos em cada canto de Hyrule.",
    genres: ["Aventura", "Ação", "RPG"],
    releaseYear: 2023,
    averageRating: 4.8,
    totalReviews: 1250,
    developer: "Nintendo EPD",
    publisher: "Nintendo"
  },
  {
    id: "2",
    title: "Elden Ring",
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
    description: "Um RPG de ação em mundo aberto criado por FromSoftware e George R.R. Martin.",
    genres: ["RPG", "Ação", "Aventura"],
    releaseYear: 2022,
    averageRating: 4.7,
    totalReviews: 2100,
    developer: "FromSoftware",
    publisher: "Bandai Namco"
  },
  {
    id: "3",
    title: "Baldur's Gate 3",
    cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop",
    description: "Um RPG de próxima geração baseado em Dungeons & Dragons com liberdade sem precedentes.",
    genres: ["RPG", "Estratégia", "Aventura"],
    releaseYear: 2023,
    averageRating: 4.9,
    totalReviews: 890,
    developer: "Larian Studios",
    publisher: "Larian Studios"
  },
  {
    id: "4",
    title: "Hades",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
    description: "Um roguelike de ação onde você desafia o deus dos mortos enquanto luta para escapar do submundo.",
    genres: ["Ação", "Indie", "RPG"],
    releaseYear: 2020,
    averageRating: 4.6,
    totalReviews: 1800,
    developer: "Supergiant Games",
    publisher: "Supergiant Games"
  },
  {
    id: "5",
    title: "Hollow Knight",
    cover: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=400&h=600&fit=crop",
    description: "Uma aventura metroidvania atmosférica através de um vasto reino em ruínas de insetos e heróis.",
    genres: ["Ação", "Aventura", "Indie", "Plataforma"],
    releaseYear: 2017,
    averageRating: 4.7,
    totalReviews: 2400,
    developer: "Team Cherry",
    publisher: "Team Cherry"
  },
  {
    id: "6",
    title: "Celeste",
    cover: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=600&fit=crop",
    description: "Um jogo de plataforma desafiador sobre escalar uma montanha e superar seus medos interiores.",
    genres: ["Plataforma", "Indie", "Aventura"],
    releaseYear: 2018,
    averageRating: 4.8,
    totalReviews: 1500,
    developer: "Extremely OK Games",
    publisher: "Matt Makes Games"
  },
  {
    id: "7",
    title: "Red Dead Redemption 2",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    description: "Uma épica história de aventura no coração da América em uma era de transição do Velho Oeste.",
    genres: ["Ação", "Aventura"],
    releaseYear: 2018,
    averageRating: 4.9,
    totalReviews: 3200,
    developer: "Rockstar Games",
    publisher: "Rockstar Games"
  },
  {
    id: "8",
    title: "Stardew Valley",
    cover: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=600&fit=crop",
    description: "Um RPG de simulação de fazenda onde você pode construir a vida rural dos seus sonhos.",
    genres: ["Simulação", "RPG", "Indie"],
    releaseYear: 2016,
    averageRating: 4.6,
    totalReviews: 2800,
    developer: "ConcernedApe",
    publisher: "ConcernedApe"
  },
  {
    id: "9",
    title: "God of War Ragnarök",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description: "Kratos e Atreus embarcam em uma jornada épica pelos Nove Reinos enquanto o Ragnarök se aproxima.",
    genres: ["Ação", "Aventura"],
    releaseYear: 2022,
    averageRating: 4.8,
    totalReviews: 1900,
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive"
  },
  {
    id: "10",
    title: "Disco Elysium",
    cover: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=600&fit=crop",
    description: "Um RPG revolucionário baseado em diálogo onde você é um detetive com um sistema de pensamento único.",
    genres: ["RPG", "Aventura", "Indie"],
    releaseYear: 2019,
    averageRating: 4.7,
    totalReviews: 1100,
    developer: "ZA/UM",
    publisher: "ZA/UM"
  },
  {
    id: "11",
    title: "Portal 2",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop&sat=-100",
    description: "Um puzzle em primeira pessoa com portais, humor ácido e uma história surpreendente.",
    genres: ["Puzzle", "Aventura"],
    releaseYear: 2011,
    averageRating: 4.9,
    totalReviews: 4500,
    developer: "Valve",
    publisher: "Valve"
  },
  {
    id: "12",
    title: "Dark Souls III",
    cover: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=600&fit=crop",
    description: "O capítulo final da trilogia Dark Souls, desafiador e atmosférico como nunca.",
    genres: ["Ação", "RPG"],
    releaseYear: 2016,
    averageRating: 4.6,
    totalReviews: 2200,
    developer: "FromSoftware",
    publisher: "Bandai Namco"
  },
]

export const mockReviews: Review[] = [
  {
    id: "r1",
    gameId: "1",
    userId: "u1",
    username: "GameMaster",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster",
    rating: 5,
    comment: "Uma obra-prima absoluta. A liberdade de exploração e as mecânicas de criação elevam a experiência a outro nível.",
    createdAt: "2024-01-15",
    likes: 45
  },
  {
    id: "r2",
    gameId: "1",
    userId: "u2",
    username: "ZeldaFan",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZeldaFan",
    rating: 5,
    comment: "Melhor jogo da série Zelda. As possibilidades são infinitas!",
    createdAt: "2024-01-10",
    likes: 32
  },
  {
    id: "r3",
    gameId: "2",
    userId: "u3",
    username: "SoulsVeteran",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SoulsVeteran",
    rating: 5,
    comment: "FromSoftware em sua melhor forma. O mundo aberto adiciona uma nova dimensão à fórmula Souls.",
    createdAt: "2024-01-08",
    likes: 67
  },
  {
    id: "r4",
    gameId: "3",
    userId: "u4",
    username: "RPGLover",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RPGLover",
    rating: 5,
    comment: "O melhor RPG que já joguei. As escolhas realmente importam e o combate por turnos é extremamente satisfatório.",
    createdAt: "2024-01-05",
    likes: 89
  },
  {
    id: "r5",
    gameId: "4",
    userId: "u5",
    username: "RoguelikePro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RoguelikePro",
    rating: 4,
    comment: "Narrativa incrível integrada ao gameplay. Cada morte faz sentido na história.",
    createdAt: "2024-01-03",
    likes: 28
  },
]

export const currentUser: User = {
  id: "current",
  username: "JogadorBR",
  email: "jogador@email.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JogadorBR",
  joinedAt: "2023-06-15",
  totalReviews: 12,
  totalFavorites: 8,
  averageRating: 4.2
}

export const favoriteGameIds = ["1", "3", "5", "7"]

export const userReviews: Review[] = [
  {
    id: "ur1",
    gameId: "1",
    userId: "current",
    username: "JogadorBR",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JogadorBR",
    rating: 5,
    comment: "Um dos melhores jogos que já joguei. A criatividade que o jogo permite é incrível!",
    createdAt: "2024-01-20",
    likes: 12
  },
  {
    id: "ur2",
    gameId: "5",
    userId: "current",
    username: "JogadorBR",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JogadorBR",
    rating: 4,
    comment: "Atmosfera única e gameplay desafiador. Recomendo para fãs de metroidvania.",
    createdAt: "2024-01-18",
    likes: 8
  },
]
