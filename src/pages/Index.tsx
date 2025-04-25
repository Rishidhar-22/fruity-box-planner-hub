
import React from 'react';
import FruitBox from '@/components/FruitBox';
import InventoryDashboard from '@/components/InventoryDashboard';

const Index = () => {
  // Example fruit boxes - in a real app, this would come from your backend
  const fruitBoxes = [
    {
      name: "Summer Mix Box",
      fruits: ["Strawberries", "Peaches", "Oranges"],
      price: 29.99,
      stockLevel: 15
    },
    {
      name: "Tropical Box",
      fruits: ["Mangoes", "Pineapple", "Bananas"],
      price: 34.99,
      stockLevel: 8
    },
    {
      name: "Berry Box",
      fruits: ["Strawberries", "Blueberries", "Raspberries"],
      price: 39.99,
      stockLevel: 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-green-600">Fruit Box Management</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Available Boxes</h2>
          <div className="grid gap-4">
            {fruitBoxes.map((box, index) => (
              <FruitBox key={index} {...box} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Inventory Status</h2>
          <InventoryDashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
