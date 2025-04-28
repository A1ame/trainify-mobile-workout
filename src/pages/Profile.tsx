import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
  const { userProfile, updateUserProfile } = useAppContext();
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setName(parsedProfile.name);
      setHeight(parsedProfile.height.toString());
      setWeight(parsedProfile.weight.toString());
      setAge(parsedProfile.age.toString());
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setHeight(userProfile.height.toString());
      setWeight(userProfile.weight.toString());
      setAge(userProfile.age.toString());
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      setShowForm(false);
    }
  }, [userProfile]);

  const calculateBMI = () => {
    const heightInMeters = parseInt(height) / 100;
    return (parseInt(weight) / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Недостаточный вес';
    if (bmi < 25) return 'Нормальный вес';
    if (bmi < 30) return 'Избыточный вес';
    return 'Ожирение';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    const weightHistory = userProfile?.weightHistory || [];
    const weightValue = parseFloat(weight);
    
    if (!weightHistory.length || weightHistory[weightHistory.length - 1].value !== weightValue) {
      weightHistory.push({
        date: today,
        value: weightValue,
      });
    }
    
    const updatedProfile: UserProfile = {
      id: userProfile?.id || uuidv4(),
      name,
      height: parseInt(height),
      weight: weightValue,
      age: parseInt(age),
      weightHistory,
    };
    
    updateUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setShowForm(false);
  };

  const formatChartData = () => {
    return userProfile?.weightHistory.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      weight: entry.value
    })) || [];
  };

  const healthData = [
    { name: 'ИМТ', value: userProfile ? parseFloat(calculateBMI()) : 0 },
    { name: 'Идеальный вес', value: userProfile ? ((userProfile.height - 100) * 0.9) : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="pb-20">
      <Header title="Профиль" />
      <div className="p-4 space-y-6">
        {!showForm && userProfile && (
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-4">Основные показатели</h3>
              <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">ИМТ</p>
                  <p className="text-xl font-semibold">{calculateBMI()}</p>
                  <p className="text-sm text-gray-500">{getBMICategory(parseFloat(calculateBMI()))}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Идеальный вес</p>
                  <p className="text-xl font-semibold">{((userProfile.height - 100) * 0.9).toFixed(1)} кг</p>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {healthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {showForm && (
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-4">Пожалуйста, заполните ваши данные</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="0"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Введите ваш рост"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Введите ваш вес"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      min="0"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Введите ваш возраст"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-trainify-500 hover:bg-trainify-600">
                    Сохранить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
