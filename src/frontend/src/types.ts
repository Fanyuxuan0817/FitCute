export type ViewType = 'login' | 'dashboard' | 'training' | 'diet' | 'analysis' | 'settings' | 'help';

export interface User {
  name: string;
  avatar: string;
  level: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  sets: number;
  reps?: string;
  duration?: string;
  image: string;
  description: string;
  difficulty: number;
}

export interface Meal {
  id: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  time: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  image: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  time?: string;
}

export interface MealSimple {
  id: string;
  name: string;
  calories: number;
  description: string;
  image: string;
}

export interface UserStats {
  weight: number;
  bodyFat: number;
  muscleMass: number;
  waterIntake: number;
  targetCalories: number;
  consumedCalories: number;
}

export interface AppState {
  progress: number;
  stats: UserStats;
  tasks: Task[];
  meals: MealSimple[];
  mood: string;
}