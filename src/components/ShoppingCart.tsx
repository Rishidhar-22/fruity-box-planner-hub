
import React, { useState, useEffect } from 'react';
import { 
  getCart, 
  updateCartItemQuantity, 
  removeCartItem, 
  CartItem as CartItemType 
} from '@/services/cartService';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItemType, 
  onUpdateQuantity: (id: string, quantity: number) => void, 
  onRemove: (id: string) => void 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h3 className="font-semibold">
          {item.is_custom ? 'Custom Box' : item.box?.name}
        </h3>
        {item.is_custom && item.custom_items && (
          <div className="mt-1 text-sm text-gray-600">
            {item.custom_items.map((customItem, index) => (
              <div key={index}>
                {customItem.quantity} {customItem.fruit.name}
              </div>
            ))}
          </div>
        )}
        <p className="mt-1 font-medium text-green-600">${item.total_price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md">
          <button 
            className="px-2 py-1 border-r"
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            -
          </button>
          <span className="px-3">{item.quantity}</span>
          <button 
            className="px-2 py-1 border-l"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        
        <button 
          className="p-2 text-red-500"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const ShoppingCart = ({ onCheckout }: { onCheckout: () => void }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const loadCart = async () => {
    setIsLoading(true);
    const { items: cartItems } = await getCart();
    setItems(cartItems);
    setTotal(cartItems.reduce((sum, item) => sum + item.total_price, 0));
    setIsLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    const success = await updateCartItemQuantity(itemId, quantity);
    if (success) {
      loadCart();
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const success = await removeCartItem(itemId);
    if (success) {
      loadCart();
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4 text-center">Loading cart...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <ScrollArea className="h-[350px]">
            {items.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex flex-col border-t p-4">
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
        </div>
        <Button 
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingCart;
