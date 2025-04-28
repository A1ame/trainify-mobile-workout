
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-trainify-500 text-white py-4 px-5 sticky top-0 z-10">
      <h1 className="text-xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
    </div>
  );
};

export default Header;
