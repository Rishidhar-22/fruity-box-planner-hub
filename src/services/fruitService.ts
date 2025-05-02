
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Fruit {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  unit: string;
}

export interface FruitBox {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  fruits?: Fruit[];
}

export async function getFruits() {
  try {
    const { data, error } = await supabase
      .from("fruits")
      .select("*")
      .order("name");

    if (error) throw error;
    return data as Fruit[];
  } catch (error: any) {
    console.error("Error fetching fruits:", error);
    toast({
      title: "Error fetching fruits",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
}

export async function getFruitBoxes() {
  try {
    const { data, error } = await supabase
      .from("fruit_boxes")
      .select("*");

    if (error) throw error;

    const fruitBoxes = data as FruitBox[];
    
    // For each box, fetch the fruits it contains
    for (const box of fruitBoxes) {
      const { data: boxItems, error: boxItemsError } = await supabase
        .from("fruit_box_items")
        .select(`
          quantity,
          fruits:fruit_id (
            id, name, price, unit
          )
        `)
        .eq("box_id", box.id);
      
      if (!boxItemsError && boxItems) {
        box.fruits = boxItems.map((item: any) => ({
          ...item.fruits,
          quantity: item.quantity
        }));
      }
    }

    return fruitBoxes;
  } catch (error: any) {
    console.error("Error fetching fruit boxes:", error);
    toast({
      title: "Error fetching fruit boxes",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
}
