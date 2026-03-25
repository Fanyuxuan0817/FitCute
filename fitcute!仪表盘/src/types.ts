export interface Task {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  time?: string;
}

export interface Meal {
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
  meals: Meal[];
  mood: string;
}
