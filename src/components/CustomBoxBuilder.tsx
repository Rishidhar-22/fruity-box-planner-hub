
import React, { useState, useEffect } from 'react';
import { Fruit, getFruits } from '@/services/fruitService';
import { addCustomBoxToCart } from '@/services/cartService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FruitList from './FruitList';

const CustomBoxBuilder = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [selectedFruits, setSelectedFruits] = useState<Map<string, number>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const loadFruits = async () => {
      const data = await getFruits();
      setFruits(data);
    };
    
    loadFruits();
  }, []);

  useEffect(() => {
    // Calculate total price
    let newTotal = 0;
    for (const [fruitId, quantity] of selectedFruits.entries()) {
      const fruit = fruits.find(f => f.id === fruitId);
      if (fruit) {
        newTotal += fruit.price * quantity;
      }
    }
    setTotal(newTotal);
  }, [selectedFruits, fruits]);

  const handleSelectFruit = (fruit: Fruit, quantity: number) => {
    const newSelected = new Map(selectedFruits);
    if (quantity <= 0) {
      newSelected.delete(fruit.id);
    } else {
      newSelected.set(fruit.id, quantity);
    }
    setSelectedFruits(newSelected);
  };

  const handleAddToCart = async () => {
    if (selectedFruits.size === 0) return;
    
    setIsLoading(true);
    
    const fruitsToAdd = Array.from(selectedFruits.entries()).map(([fruitId, quantity]) => ({
      fruitId,
      quantity
    }));
    
    await addCustomBoxToCart(fruitsToAdd);
    setSelectedFruits(new Map());
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">Create Your Custom Fruit Box</CardTitle>
      </CardHeader>
      <CardContent>
        <FruitList 
          fruits={fruits} 
          onSelectFruit={handleSelectFruit} 
          selectedFruits={selectedFruits}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
        </div>
        <Button 
          onClick={handleAddToCart} 
          disabled={selectedFruits.size === 0 || isLoading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? "Adding..." : "Add Custom Box to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomBoxBuilder;
