
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WorkoutPlan } from '../types';

const Workouts = () => {
  const { workoutPlans, showSuccessMessage, addWorkoutToCalendar, calendar } = useAppContext();
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleWorkoutClick = (workout: WorkoutPlan) => {
    setSelectedWorkout(workout);
    setShowWorkoutDetails(true);
  };
  
  const handleAddToCalendar = () => {
    if (selectedWorkout) {
      setShowWorkoutDetails(false);
      setShowDatePicker(true);
    }
  };
  
  const handleSelectDate = (date: string) => {
    if (selectedWorkout) {
      addWorkoutToCalendar(date, selectedWorkout);
      showSuccessMessage(`Тренировка добавлена на ${new Date(date).toLocaleDateString('ru-RU')}`);
      setShowDatePicker(false);
    }
  };

  return (
    <div className="pb-20">
      <Header title="Тренировки" subtitle="Выберите тренировку" />
      
      <div className="p-4">
        <div className="grid gap-4">
          {workoutPlans.map((workout) => (
            <Card key={workout.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100">
                {workout.imageUrl && (
                  <img 
                    src={workout.imageUrl} 
                    alt={workout.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/cardio.jpg";
                    }}
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-1">{workout.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                <p className="text-sm mb-3">
                  <span className="font-medium">{workout.exercises.length}</span> упражнений
                </p>
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-trainify-500 hover:bg-trainify-600"
                    onClick={() => handleWorkoutClick(workout)}
                  >
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Workout Details Dialog */}
      <Dialog open={showWorkoutDetails} onOpenChange={setShowWorkoutDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedWorkout?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">{selectedWorkout?.description}</p>
            
            <h4 className="font-medium">Упражнения:</h4>
            {selectedWorkout?.exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardContent className="p-4">
                  <h5 className="font-medium mb-1">{exercise.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                  <div className="flex text-sm text-gray-500">
                    <div className="mr-4"><span className="font-medium">{exercise.sets}</span> подходов</div>
                    <div className="mr-4"><span className="font-medium">{exercise.reps}</span> повторений</div>
                    <div><span className="font-medium">{exercise.timeInMinutes}</span> мин</div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="pt-4">
              <Button 
                onClick={handleAddToCalendar} 
                className="w-full bg-trainify-500 hover:bg-trainify-600"
              >
                <Calendar size={18} className="mr-2" /> Добавить в календарь
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Date Picker Dialog */}
      <Dialog open={showDatePicker} onOpenChange={setShowDatePicker}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выберите дату</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">Выберите день для добавления тренировки</p>
            
            <div className="grid gap-2">
              {calendar.map((day) => (
                <Button
                  key={day.date}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSelectDate(day.date)}
                >
                  <div className="flex justify-between w-full">
                    <span>{day.day}, {new Date(day.date).toLocaleDateString('ru-RU')}</span>
                    <span className="text-gray-500">{day.exercises.length} упр.</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
