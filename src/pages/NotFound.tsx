
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="text-4xl font-bold text-trainify-500">404</h1>
      <p className="mt-2 mb-6 text-lg">Страница не найдена</p>
      <Link to="/">
        <Button className="bg-trainify-500 hover:bg-trainify-600">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
