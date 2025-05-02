export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          box_id: string | null
          cart_id: string
          created_at: string
          id: string
          is_custom: boolean
          quantity: number
          total_price: number
        }
        Insert: {
          box_id?: string | null
          cart_id: string
          created_at?: string
          id?: string
          is_custom?: boolean
          quantity?: number
          total_price: number
        }
        Update: {
          box_id?: string | null
          cart_id?: string
          created_at?: string
          id?: string
          is_custom?: boolean
          quantity?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "fruit_boxes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      custom_box_items: {
        Row: {
          cart_item_id: string
          created_at: string
          fruit_id: string
          id: string
          quantity: number
        }
        Insert: {
          cart_item_id: string
          created_at?: string
          fruit_id: string
          id?: string
          quantity: number
        }
        Update: {
          cart_item_id?: string
          created_at?: string
          fruit_id?: string
          id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "custom_box_items_cart_item_id_fkey"
            columns: ["cart_item_id"]
            isOneToOne: false
            referencedRelation: "cart_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_box_items_fruit_id_fkey"
            columns: ["fruit_id"]
            isOneToOne: false
            referencedRelation: "fruits"
            referencedColumns: ["id"]
          },
        ]
      }
      fruit_box_items: {
        Row: {
          box_id: string
          created_at: string
          fruit_id: string
          id: string
          quantity: number
        }
        Insert: {
          box_id: string
          created_at?: string
          fruit_id: string
          id?: string
          quantity: number
        }
        Update: {
          box_id?: string
          created_at?: string
          fruit_id?: string
          id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "fruit_box_items_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "fruit_boxes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fruit_box_items_fruit_id_fkey"
            columns: ["fruit_id"]
            isOneToOne: false
            referencedRelation: "fruits"
            referencedColumns: ["id"]
          },
        ]
      }
      fruit_boxes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      fruits: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
          stock_quantity: number
          unit: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price: number
          stock_quantity?: number
          unit?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
          stock_quantity?: number
          unit?: string
        }
        Relationships: []
      }
      order_item_contents: {
        Row: {
          created_at: string
          fruit_id: string
          fruit_name: string
          id: string
          order_item_id: string
          price_per_unit: number
          quantity: number
        }
        Insert: {
          created_at?: string
          fruit_id: string
          fruit_name: string
          id?: string
          order_item_id: string
          price_per_unit: number
          quantity: number
        }
        Update: {
          created_at?: string
          fruit_id?: string
          fruit_name?: string
          id?: string
          order_item_id?: string
          price_per_unit?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_item_contents_fruit_id_fkey"
            columns: ["fruit_id"]
            isOneToOne: false
            referencedRelation: "fruits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_contents_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          box_id: string | null
          created_at: string
          id: string
          is_custom: boolean
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          box_id?: string | null
          created_at?: string
          id?: string
          is_custom?: boolean
          order_id: string
          price: number
          quantity?: number
        }
        Update: {
          box_id?: string | null
          created_at?: string
          id?: string
          is_custom?: boolean
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "fruit_boxes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_intent_id: string | null
          shipping_address: Json | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          payment_intent_id?: string | null
          shipping_address?: Json | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payment_intent_id?: string | null
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
