
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Fruit, FruitBox } from "./fruitService";
import { v4 as uuidv4 } from "uuid";

export interface CartItem {
  id: string;
  box_id: string | null;
  is_custom: boolean;
  quantity: number;
  total_price: number;
  box?: FruitBox;
  custom_items?: {
    fruit: Fruit;
    quantity: number;
  }[];
}

let sessionId: string;

// Get or create a session ID for the current user
function getSessionId(): string {
  if (sessionId) return sessionId;
  
  let storedId = localStorage.getItem("fruit_box_session_id");
  if (!storedId) {
    storedId = uuidv4();
    localStorage.setItem("fruit_box_session_id", storedId);
  }
  sessionId = storedId;
  return sessionId;
}

// Set session ID header for all Supabase requests
supabase.functions.setAuth(getSessionId());

export async function getCart() {
  try {
    // First check if a cart exists for this session
    const { data: carts, error: cartError } = await supabase
      .from("carts")
      .select("*")
      .eq("session_id", getSessionId())
      .maybeSingle();

    if (cartError) throw cartError;

    // If no cart exists, create one
    let cartId;
    if (!carts) {
      const { data: newCart, error: createError } = await supabase
        .from("carts")
        .insert({ session_id: getSessionId() })
        .select("*")
        .single();

      if (createError) throw createError;
      cartId = newCart.id;
    } else {
      cartId = carts.id;
    }

    // Fetch cart items
    const { data: cartItems, error: itemsError } = await supabase
      .from("cart_items")
      .select(`
        *,
        box:box_id (*)
      `)
      .eq("cart_id", cartId);

    if (itemsError) throw itemsError;

    // Initialize custom_items as an empty array for each cart item
    const typedCartItems: CartItem[] = cartItems.map(item => ({
      ...item,
      custom_items: []
    }));

    // For custom boxes, fetch the custom items
    for (const item of typedCartItems) {
      if (item.is_custom) {
        const { data: customItems, error: customError } = await supabase
          .from("custom_box_items")
          .select(`
            quantity,
            fruit:fruit_id (*)
          `)
          .eq("cart_item_id", item.id);

        if (!customError && customItems) {
          item.custom_items = customItems.map((customItem: any) => ({
            fruit: customItem.fruit,
            quantity: customItem.quantity
          }));
        }
      }
    }

    return { cartId, items: typedCartItems };
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    toast({
      title: "Error fetching cart",
      description: error.message,
      variant: "destructive",
    });
    return { cartId: null, items: [] };
  }
}

export async function addBoxToCart(boxId: string, quantity: number = 1) {
  try {
    // Get cart ID
    const { cartId } = await getCart();
    if (!cartId) throw new Error("Could not get cart");

    // Get box price
    const { data: boxData, error: boxError } = await supabase
      .from("fruit_boxes")
      .select("price")
      .eq("id", boxId)
      .single();

    if (boxError) throw boxError;

    // Add item to cart
    const totalPrice = boxData.price * quantity;
    
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cartId,
        box_id: boxId,
        is_custom: false,
        quantity,
        total_price: totalPrice
      })
      .select("*")
      .single();

    if (error) throw error;

    toast({
      title: "Added to cart",
      description: "The fruit box has been added to your cart."
    });

    return data;
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    toast({
      title: "Error adding to cart",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function addCustomBoxToCart(fruits: { fruitId: string; quantity: number }[], quantity: number = 1) {
  try {
    // Get cart ID
    const { cartId } = await getCart();
    if (!cartId) throw new Error("Could not get cart");

    // Calculate total price
    let totalPrice = 0;
    for (const item of fruits) {
      const { data: fruitData, error: fruitError } = await supabase
        .from("fruits")
        .select("price")
        .eq("id", item.fruitId)
        .single();

      if (fruitError) throw fruitError;
      totalPrice += fruitData.price * item.quantity;
    }
    
    totalPrice *= quantity;

    // Add custom box to cart
    const { data: cartItem, error: cartItemError } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cartId,
        is_custom: true,
        quantity,
        total_price: totalPrice
      })
      .select("*")
      .single();

    if (cartItemError) throw cartItemError;

    // Add fruits to the custom box
    const customItems = fruits.map(fruit => ({
      cart_item_id: cartItem.id,
      fruit_id: fruit.fruitId,
      quantity: fruit.quantity
    }));

    const { error: customItemsError } = await supabase
      .from("custom_box_items")
      .insert(customItems);

    if (customItemsError) throw customItemsError;

    toast({
      title: "Added to cart",
      description: "Your custom fruit box has been added to your cart."
    });

    return cartItem;
  } catch (error: any) {
    console.error("Error adding custom box to cart:", error);
    toast({
      title: "Error adding to cart",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    // Get the cart item to update
    const { data: cartItem, error: itemError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("id", itemId)
      .single();

    if (itemError) throw itemError;

    // Calculate the new total price
    const pricePerUnit = cartItem.total_price / cartItem.quantity;
    const newTotalPrice = pricePerUnit * quantity;

    // Update the quantity
    const { error } = await supabase
      .from("cart_items")
      .update({ 
        quantity, 
        total_price: newTotalPrice 
      })
      .eq("id", itemId);

    if (error) throw error;

    toast({
      title: "Cart updated",
      description: "The quantity has been updated."
    });
    
    return true;
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    toast({
      title: "Error updating cart",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
}

export async function removeCartItem(itemId: string) {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) throw error;

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
    
    return true;
  } catch (error: any) {
    console.error("Error removing cart item:", error);
    toast({
      title: "Error removing item",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
}

export async function getCartTotal() {
  const { items } = await getCart();
  return items.reduce((total, item) => total + item.total_price, 0);
}
