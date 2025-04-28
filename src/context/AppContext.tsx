
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserProfile, WorkoutPlan, CalendarDay, NutritionPartner, Exercise } from '../types';

interface AppContextType {
  userProfile: UserProfile | null;
  workoutPlans: WorkoutPlan[];
  calendar: CalendarDay[];
  nutritionPartners: NutritionPartner[];
  updateUserProfile: (profile: UserProfile) => void;
  markExerciseAsCompleted: (date: string, exerciseId: string) => void;
  addWorkoutToCalendar: (date: string, workout: WorkoutPlan) => void;
  showSuccessMessage: (message: string) => void;
}

const defaultContext: AppContextType = {
  userProfile: null,
  workoutPlans: [],
  calendar: [],
  nutritionPartners: [],
  updateUserProfile: () => {},
  markExerciseAsCompleted: () => {},
  addWorkoutToCalendar: () => {},
  showSuccessMessage: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [nutritionPartners, setNutritionPartners] = useState<NutritionPartner[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load mock data for demonstration
  useEffect(() => {
    // Mock workout plans
    const mockWorkouts: WorkoutPlan[] = [
      {
        id: '1',
        title: 'Кардио тренировка',
        description: 'Интенсивная кардио тренировка для сжигания жира',
        exercises: [
          { id: '1', name: 'Бег на месте', description: 'Бег на месте с высоким подниманием колен', sets: 3, reps: 20, timeInMinutes: 5 },
          { id: '2', name: 'Прыжки со скакалкой', description: 'Интенсивные прыжки со скакалкой', sets: 3, reps: 50, timeInMinutes: 5 },
          { id: '3', name: 'Берпи', description: 'Полноценное упражнение для всего тела', sets: 3, reps: 10, timeInMinutes: 5 },
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Кардио',
      },
      {
        id: '2',
        title: 'Силовая тренировка',
        description: 'Тренировка для укрепления мышц всего тела',
        exercises: [
          { id: '4', name: 'Отжимания', description: 'Классические отжимания от пола', sets: 3, reps: 15, timeInMinutes: 5 },
          { id: '5', name: 'Приседания', description: 'Приседания с собственным весом', sets: 3, reps: 20, timeInMinutes: 5 },
          { id: '6', name: 'Планка', description: 'Статическая планка на локтях', sets: 3, reps: 1, timeInMinutes: 1 },
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Силовая',
      },
      {
        id: '3',
        title: 'Гибкость и растяжка',
        description: 'Тренировка для улучшения гибкости и подвижности',
        exercises: [
          { id: '7', name: 'Наклоны к ногам', description: 'Наклоны вперед для растяжки задней поверхности бедра', sets: 1, reps: 10, timeInMinutes: 5 },
          { id: '8', name: 'Скручивания для спины', description: 'Скручивания для улучшения подвижности позвоночника', sets: 1, reps: 10, timeInMinutes: 5 },
          { id: '9', name: 'Растяжка квадрицепса', description: 'Растяжка передней поверхности бедра', sets: 1, reps: 10, timeInMinutes: 5 },
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Растяжка',
      },
    ];

    // Generate calendar data for the next 7 days
    const today = new Date();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const mockCalendar: CalendarDay[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayString = days[date.getDay()];
      
      const exercises = i % 2 === 0 ? [
        {
          id: `cal-ex-${i}-1`,
          exerciseId: mockWorkouts[0].exercises[0].id,
          name: mockWorkouts[0].exercises[0].name,
          completed: false,
        },
        {
          id: `cal-ex-${i}-2`,
          exerciseId: mockWorkouts[1].exercises[0].id,
          name: mockWorkouts[1].exercises[0].name,
          completed: false,
        }
      ] : [
        {
          id: `cal-ex-${i}-3`,
          exerciseId: mockWorkouts[2].exercises[0].id,
          name: mockWorkouts[2].exercises[0].name,
          completed: false,
        }
      ];
      
      mockCalendar.push({
        date: dateString,
        day: dayString,
        exercises,
      });
    }

    // Mock nutrition partners
    const mockPartners: NutritionPartner[] = [
      {
        id: '1',
        name: 'ЗдоровоЕда',
        description: 'Доставка здорового питания для спортсменов. Скидка 10% по промокоду TRAINIFY',
        logoUrl: 'https://via.placeholder.com/150x150?text=ЗдоровоЕда',
        websiteUrl: 'https://example.com/partner1',
      },
      {
        id: '2',
        name: 'FitFood',
        description: 'Правильное питание с расчетом БЖУ. Первый заказ со скидкой 15%',
        logoUrl: 'https://via.placeholder.com/150x150?text=FitFood',
        websiteUrl: 'https://example.com/partner2',
      },
      {
        id: '3',
        name: 'Спорт-Нутришн',
        description: 'Магазин спортивного питания и добавок. Бесплатная доставка от 2000 руб',
        logoUrl: 'https://via.placeholder.com/150x150?text=Спорт-Нутришн',
        websiteUrl: 'https://example.com/partner3',
      },
    ];

    setWorkoutPlans(mockWorkouts);
    setCalendar(mockCalendar);
    setNutritionPartners(mockPartners);
    
    // Check for saved user profile in localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const markExerciseAsCompleted = (date: string, exerciseId: string) => {
    setCalendar(prevCalendar => {
      return prevCalendar.map(day => {
        if (day.date === date) {
          return {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === exerciseId) {
                return { ...ex, completed: true };
              }
              return ex;
            }),
          };
        }
        return day;
      });
    });
  };

  const addWorkoutToCalendar = (date: string, workout: WorkoutPlan) => {
    setCalendar(prevCalendar => {
      return prevCalendar.map(day => {
        if (day.date === date) {
          const newExercises = [
            ...day.exercises,
            ...workout.exercises.map(ex => ({
              id: `${date}-${ex.id}-${Math.random().toString(36).substring(7)}`,
              exerciseId: ex.id,
              name: ex.name,
              completed: false,
            })),
          ];
          return {
            ...day,
            exercises: newExercises,
          };
        }
        return day;
      });
    });
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        workoutPlans,
        calendar,
        nutritionPartners,
        updateUserProfile,
        markExerciseAsCompleted,
        addWorkoutToCalendar,
        showSuccessMessage,
      }}
    >
      {children}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in max-w-xs text-center">
            {successMessage}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};
