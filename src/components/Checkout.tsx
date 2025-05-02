
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCartTotal } from '@/services/cartService';
import { toast } from '@/hooks/use-toast';

const Checkout = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    const loadCartTotal = async () => {
      const cartTotal = await getCartTotal();
      setTotal(cartTotal);
    };
    loadCartTotal();
  }, []);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, we would process payment here
    // For this demo, we'll just simulate a successful payment
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      setIsLoading(false);
      onFinish();
    }, 1500);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">
          {step === 1 ? 'Shipping Information' : 'Payment Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  required
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  required
                  value={shippingAddress.phone}
                  onChange={handleShippingChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                name="address"
                required
                value={shippingAddress.address}
                onChange={handleShippingChange}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  name="city"
                  required
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state"
                  name="state"
                  required
                  value={shippingAddress.state}
                  onChange={handleShippingChange}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input 
                  id="postalCode"
                  name="postalCode"
                  required
                  value={shippingAddress.postalCode}
                  onChange={handleShippingChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country"
                name="country"
                required
                value={shippingAddress.country}
                onChange={handleShippingChange}
              />
            </div>
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Continue to Payment
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber"
                name="cardNumber"
                required
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
              />
            </div>
            
            <div className="grid gap-4 grid-cols-2">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate"
                  name="expiryDate"
                  required
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv"
                  name="cvv"
                  required
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 text-sm text-gray-500">
        <span>All payments are secure and encrypted</span>
      </CardFooter>
    </Card>
  );
};

export default Checkout;
