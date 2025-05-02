
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFruitBoxes } from '@/services/fruitService';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FruitBox from '@/components/FruitBox';
import InventoryDashboard from '@/components/InventoryDashboard';
import CustomBoxBuilder from '@/components/CustomBoxBuilder';
import ShoppingCart from '@/components/ShoppingCart';
import Checkout from '@/components/Checkout';
import { addBoxToCart } from '@/services/cartService';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("boxes");
  const [checkoutMode, setCheckoutMode] = useState<boolean>(false);
  
  const { 
    data: fruitBoxes = [], 
    isLoading: isLoadingBoxes,
    refetch: refetchBoxes
  } = useQuery({
    queryKey: ['fruitBoxes'],
    queryFn: getFruitBoxes
  });

  const handleAddToCart = async (boxId: string) => {
    await addBoxToCart(boxId);
    // If we're not on the cart tab, we don't need to refetch
    if (activeTab === "cart") {
      // Force a refresh of the cart
      setActiveTab("boxes");
      setTimeout(() => setActiveTab("cart"), 10);
    }
  };

  const handleCheckoutComplete = () => {
    setCheckoutMode(false);
    setActiveTab("boxes");
    // Refetch boxes to update inventory
    refetchBoxes();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-green-600">Fruit Box Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="boxes">Available Boxes</TabsTrigger>
          <TabsTrigger value="customize">Customize Box</TabsTrigger>
          <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="boxes" className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Predefined Boxes</h2>
            {isLoadingBoxes ? (
              <div>Loading fruit boxes...</div>
            ) : (
              <div className="grid gap-4">
                {fruitBoxes.map((box) => (
                  <div key={box.id} className="flex flex-col">
                    <FruitBox 
                      name={box.name} 
                      fruits={box.fruits?.map(f => f.name) || []} 
                      price={box.price} 
                      stockLevel={10} // This would come from the backend in a real app
                    />
                    <Button 
                      onClick={() => handleAddToCart(box.id)}
                      className="mt-2 bg-green-600 hover:bg-green-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Inventory Status</h2>
            <InventoryDashboard />
          </div>
        </TabsContent>
        
        <TabsContent value="customize">
          <CustomBoxBuilder />
        </TabsContent>
        
        <TabsContent value="cart">
          {checkoutMode ? (
            <Checkout onFinish={handleCheckoutComplete} />
          ) : (
            <ShoppingCart onCheckout={() => setCheckoutMode(true)} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
