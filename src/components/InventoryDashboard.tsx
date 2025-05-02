
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getFruits, Fruit } from '@/services/fruitService';

const InventoryDashboard = () => {
  const { data: fruits = [], isLoading } = useQuery({
    queryKey: ['fruits'],
    queryFn: getFruits
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-green-500" />
            Inventory Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center">Loading inventory data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-6 w-6 text-green-500" />
          Inventory Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {fruits.map((fruit) => (
              <div
                key={fruit.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{fruit.name}</h3>
                  <p className="text-sm text-gray-500">
                    {fruit.stock_quantity} {fruit.unit}
                  </p>
                </div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    fruit.stock_quantity > 50
                      ? "bg-green-500"
                      : fruit.stock_quantity > 20
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InventoryDashboard;
