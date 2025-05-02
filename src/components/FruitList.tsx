
import React from 'react';
import { Fruit } from '@/services/fruitService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FruitListProps {
  fruits: Fruit[];
  onSelectFruit: (fruit: Fruit, quantity: number) => void;
  selectedFruits?: Map<string, number>;
}

const FruitList = ({ fruits, onSelectFruit, selectedFruits = new Map() }: FruitListProps) => {
  const handleQuantityChange = (fruit: Fruit, quantity: number) => {
    onSelectFruit(fruit, quantity);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {fruits.map((fruit) => (
        <Card key={fruit.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center justify-between">
              <span>{fruit.name}</span>
              <Badge variant="secondary">{fruit.unit}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-600">${fruit.price.toFixed(2)} / {fruit.unit}</span>
                <span className="text-sm text-gray-500">In stock: {fruit.stock_quantity}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button 
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => handleQuantityChange(fruit, Math.max(0, (selectedFruits.get(fruit.id) || 0) - 1))}
                >
                  -
                </button>
                <span className="w-10 text-center">{selectedFruits.get(fruit.id) || 0}</span>
                <button 
                  className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
                  onClick={() => handleQuantityChange(fruit, (selectedFruits.get(fruit.id) || 0) + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FruitList;
