
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2 } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
}

const InventoryDashboard = () => {
  // Example inventory data - in a real app, this would come from your backend
  const inventory: InventoryItem[] = [
    { id: '1', name: 'Apples', stock: 150, unit: 'kg' },
    { id: '2', name: 'Bananas', stock: 100, unit: 'kg' },
    { id: '3', name: 'Oranges', stock: 80, unit: 'kg' },
    { id: '4', name: 'Strawberries', stock: 45, unit: 'boxes' },
  ];

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
            {inventory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.stock} {item.unit}
                  </p>
                </div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    item.stock > 100
                      ? "bg-green-500"
                      : item.stock > 50
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
