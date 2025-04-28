
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Check } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDay } from '../types';

const Calendar = () => {
  const { calendar, markExerciseAsCompleted, showSuccessMessage } = useAppContext();
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [showExercises, setShowExercises] = useState(false);
  const today = new Date();
  
  // Get the current day index in our calendar data
  const currentDayIndex = calendar.findIndex(
    day => day.date === today.toISOString().split('T')[0]
  );
  
  // Default to showing current day and 2 next days, or first 3 if current not found
  const startIndex = currentDayIndex >= 0 ? currentDayIndex : 0;
  const [visibleDays, setVisibleDays] = useState(calendar.slice(startIndex, startIndex + 3));
  
  const handlePreviousDays = () => {
    const firstVisibleDayIndex = calendar.findIndex(day => day.date === visibleDays[0].date);
    if (firstVisibleDayIndex > 0) {
      const newStartIndex = Math.max(0, firstVisibleDayIndex - 3);
      setVisibleDays(calendar.slice(newStartIndex, newStartIndex + 3));
    }
  };
  
  const handleNextDays = () => {
    const lastVisibleDayIndex = calendar.findIndex(day => day.date === visibleDays[visibleDays.length - 1].date);
    if (lastVisibleDayIndex < calendar.length - 1) {
      const newStartIndex = lastVisibleDayIndex + 1;
      setVisibleDays(calendar.slice(newStartIndex, Math.min(newStartIndex + 3, calendar.length)));
    }
  };
  
  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
    setShowExercises(true);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };
  
  const handleCompleteExercise = (exerciseId: string) => {
    if (selectedDay) {
      markExerciseAsCompleted(selectedDay.date, exerciseId);
      showSuccessMessage("Молодец, упражнение выполнено!");
    }
  };

  return (
    <div className="pb-20">
      <Header title="Календарь тренировок" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button 
            onClick={handlePreviousDays} 
            variant="outline" 
            className="px-3"
            disabled={calendar.findIndex(day => day.date === visibleDays[0].date) <= 0}
          >
            &lt;
          </Button>
          <h2 className="text-lg font-medium">Тренировки</h2>
          <Button 
            onClick={handleNextDays} 
            variant="outline" 
            className="px-3"
            disabled={calendar.findIndex(day => day.date === visibleDays[visibleDays.length - 1].date) >= calendar.length - 1}
          >
            &gt;
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {visibleDays.map((day) => {
            const date = new Date(day.date);
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <div 
                key={day.date} 
                className={`text-center cursor-pointer`}
                onClick={() => handleDayClick(day)}
              >
                <div className="mb-1 text-sm font-medium">{day.day}</div>
                <div 
                  className={`flex items-center justify-center h-12 w-12 rounded-full mx-auto 
                    ${isToday ? 'bg-trainify-500 text-white' : 'bg-gray-100'}`}
                >
                  {formatDate(day.date)}
                </div>
                <div className="mt-1 text-xs">
                  {day.exercises.length} упр.
                </div>
              </div>
            );
          })}
        </div>
        
        {visibleDays.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-md font-medium mb-3">Обзор тренировок</h3>
              
              {visibleDays.map((day) => (
                <div key={day.date} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                    </h4>
                    <span className="text-sm text-gray-500">{day.exercises.length} упражнений</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {day.exercises.slice(0, 2).map((ex, i) => (
                      <div key={ex.id} className="flex items-center gap-2 mb-1">
                        {ex.completed ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        <span>{ex.name}</span>
                      </div>
                    ))}
                    {day.exercises.length > 2 && (
                      <div className="text-trainify-500 text-xs mt-1">+ еще {day.exercises.length - 2} упражнений</div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-4">
                <Button 
                  variant="outline" 
                  className="text-trainify-500 border-trainify-500 hover:bg-trainify-50"
                  onClick={() => handleDayClick(visibleDays[0])}
                >
                  Посмотреть подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Dialog open={showExercises} onOpenChange={setShowExercises}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Тренировки на {selectedDay ? new Date(selectedDay.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) : ''}
              </DialogTitle>
            </DialogHeader>
            
            {selectedDay && (
              <div className="mt-4 space-y-4">
                {selectedDay.exercises.length > 0 ? (
                  selectedDay.exercises.map((exercise) => (
                    <Card key={exercise.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{exercise.name}</h3>
                            {exercise.completed ? (
                              <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Выполнено
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                className="bg-trainify-500 hover:bg-trainify-600"
                                onClick={() => handleCompleteExercise(exercise.id)}
                              >
                                Отметить
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Нет запланированных тренировок на этот день</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
