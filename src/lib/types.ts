// Tipos compartilhados do aplicativo STRONGSIZE

export type UserRole = 'free' | 'premium' | 'admin';
export type Gender = 'masculino' | 'feminino';

export interface UserData {
  name: string;
  gender: Gender;
  role: UserRole;
  weight?: number;
  height?: number;
  age?: number;
  goal?: 'hipertrofia' | 'emagrecimento' | 'definicao' | 'forca';
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}
