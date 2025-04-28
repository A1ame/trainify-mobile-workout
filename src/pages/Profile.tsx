
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
  const { userProfile, updateUserProfile } = useAppContext();
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setHeight(userProfile.height.toString());
      setWeight(userProfile.weight.toString());
      setAge(userProfile.age.toString());
    }
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current date for weight history
    const today = new Date().toISOString().split('T')[0];
    
    const weightHistory = userProfile?.weightHistory || [];
    const weightValue = parseFloat(weight);
    
    // Only add a new weight entry if it's different from the last one
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
  };

  // Format date for chart display
  const formatChartData = () => {
    return userProfile?.weightHistory.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      weight: entry.value
    })) || [];
  };

  return (
    <div className="pb-20">
      <Header title="Профиль" />
      
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-5">
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
        
        {userProfile && userProfile.weightHistory.length > 1 && (
          <Card>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-4">График веса</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formatChartData()}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#0066ff" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
