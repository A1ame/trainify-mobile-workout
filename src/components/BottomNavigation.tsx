
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Calendar, Utensils, Dumbbell } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-10">
      <Link to="/profile" className={`bottom-tab ${isActive('/profile') ? 'active' : ''}`}>
        <User size={24} />
        <span className="bottom-tab-text">Профиль</span>
      </Link>
      
      <Link to="/calendar" className={`bottom-tab ${isActive('/calendar') ? 'active' : ''}`}>
        <Calendar size={24} />
        <span className="bottom-tab-text">Календарь</span>
      </Link>
      
      <Link to="/nutrition" className={`bottom-tab ${isActive('/nutrition') ? 'active' : ''}`}>
        <Utensils size={24} />
        <span className="bottom-tab-text">Питание</span>
      </Link>
      
      <Link to="/workouts" className={`bottom-tab ${isActive('/') || isActive('/workouts') ? 'active' : ''}`}>
        <Dumbbell size={24} />
        <span className="bottom-tab-text">Тренировки</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
