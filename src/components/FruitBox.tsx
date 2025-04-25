
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package2 } from "lucide-react";

interface FruitBoxProps {
  name: string;
  fruits: string[];
  price: number;
  stockLevel: number;
}

const FruitBox = ({ name, fruits, price, stockLevel }: FruitBoxProps) => {
  const getStockStatus = () => {
    if (stockLevel <= 0) return { color: "destructive", text: "Out of Stock" };
    if (stockLevel < 10) return { color: "yellow", text: "Low Stock" };
    return { color: "green", text: "In Stock" };
  };

  const status = getStockStatus();

  return (
    <Card className="w-full max-w-sm transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-6 w-6 text-green-500" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {fruits.map((fruit, index) => (
              <Badge key={index} variant="secondary">
                {fruit}
              </Badge>
            ))}
          </div>
          <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant={status.color as "default" | "destructive"}>{status.text}</Badge>
      </CardFooter>
    </Card>
  );
};

export default FruitBox;
