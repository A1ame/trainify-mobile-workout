
export interface UserProfile {
  id: string;
  name: string;
  height: number; // in cm
  weight: number; // in kg
  age: number;
  weightHistory: { date: string; value: number }[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  timeInMinutes: number;
  imageUrl?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  imageUrl?: string;
}

export interface CalendarDay {
  date: string;
  day: string;
  exercises: {
    id: string;
    exerciseId: string;
    name: string;
    completed: boolean;
  }[];
}

export interface NutritionPartner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
}
