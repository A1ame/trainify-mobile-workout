
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Nutrition = () => {
  const partners = [
    {
      id: 1,
      name: "Fresh & Fit",
      description: "Занимаются подбором питания с возможностью заказа.",
      logoUrl: "/nutrition-logo.png",
      websiteUrl: "#"
    },
    {
      id: 2,
      name: "Скоро",
      description: "Здесь будет информация о новом партнере",
      logoUrl: "/placeholder.svg",
      websiteUrl: "#"
    },
    {
      id: 3,
      name: "Скоро",
      description: "Здесь будет информация о новом партнере",
      logoUrl: "/placeholder.svg",
      websiteUrl: "#"
    }
  ];

  return (
    <div className="pb-20">
      <Header title="Питание" subtitle="Наши партнеры помогут вам питаться правильно" />
      
      <div className="p-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 min-w-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{partner.name}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
              
              <Button 
                className="w-full bg-trainify-500 hover:bg-trainify-600"
                onClick={() => window.open(partner.websiteUrl, '_blank')}
              >
                Перейти на сайт <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
