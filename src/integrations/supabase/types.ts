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
      brands: {
        Row: {
          brand_name: string
          created_at: string | null
          id: string
        }
        Insert: {
          brand_name: string
          created_at?: string | null
          id?: string
        }
        Update: {
          brand_name?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      category_variant_values: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          price_modifier: number | null
          price_modifier_type: string | null
          status: string | null
          updated_at: string | null
          value_name: string
          variant_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          price_modifier?: number | null
          price_modifier_type?: string | null
          status?: string | null
          updated_at?: string | null
          value_name: string
          variant_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          price_modifier?: number | null
          price_modifier_type?: string | null
          status?: string | null
          updated_at?: string | null
          value_name?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_variant_values_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "category_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      category_variants: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_multiple_choice: boolean | null
          is_required: boolean | null
          status: string | null
          updated_at: string | null
          variant_name: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_multiple_choice?: boolean | null
          is_required?: boolean | null
          status?: string | null
          updated_at?: string | null
          variant_name: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_multiple_choice?: boolean | null
          is_required?: boolean | null
          status?: string | null
          updated_at?: string | null
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_variants_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          location_name: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          location_name: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          location_name?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          category_name: string
          created_at: string | null
          id: string
          parent_id: string | null
          status: string | null
        }
        Insert: {
          category_name: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          status?: string | null
        }
        Update: {
          category_name?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_discounts: {
        Row: {
          active: boolean | null
          created_at: string | null
          discount_type: Database["public"]["Enums"]["discount_type"]
          discount_value: number
          end_date: string | null
          id: string
          product_id: string | null
          sku_id: string | null
          start_date: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          discount_type: Database["public"]["Enums"]["discount_type"]
          discount_value: number
          end_date?: string | null
          id?: string
          product_id?: string | null
          sku_id?: string | null
          start_date: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"]
          discount_value?: number
          end_date?: string | null
          id?: string
          product_id?: string | null
          sku_id?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_discounts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_discounts_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_features: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          feature_descri: string | null
          feature_description: string | null
          feature_name: string
          feature_value: string
          id: string
          name: string
          product_id: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          feature_descri?: string | null
          feature_description?: string | null
          feature_name: string
          feature_value: string
          id?: string
          name?: string
          product_id: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          feature_descri?: string | null
          feature_description?: string | null
          feature_name?: string
          feature_value?: string
          id?: string
          name?: string
          product_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_features_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_inventory: {
        Row: {
          created_at: string | null
          id: string
          location_id: string | null
          product_id: string | null
          quantity_available: number | null
          reorder_level: number | null
          sku: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          product_id?: string | null
          quantity_available?: number | null
          reorder_level?: number | null
          sku: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          product_id?: string | null
          quantity_available?: number | null
          reorder_level?: number | null
          sku?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          media_order: number | null
          media_type: string | null
          media_url: string
          product_id: string | null
          sku_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          media_order?: number | null
          media_type?: string | null
          media_url: string
          product_id?: string | null
          sku_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          media_order?: number | null
          media_type?: string | null
          media_url?: string
          product_id?: string | null
          sku_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_media_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_meta: {
        Row: {
          created_at: string | null
          id: string
          meta_key: string
          meta_value: string | null
          product_id: string | null
          sku_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meta_key: string
          meta_value?: string | null
          product_id?: string | null
          sku_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meta_key?: string
          meta_value?: string | null
          product_id?: string | null
          sku_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_meta_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_meta_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          rating: number
          review_text: string | null
          sku_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating: number
          review_text?: string | null
          sku_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number
          review_text?: string | null
          sku_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_shipping: {
        Row: {
          created_at: string | null
          delivery_time: string | null
          id: string
          product_id: string | null
          shipping_class: string
          shipping_cost: number
          sku_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_time?: string | null
          id?: string
          product_id?: string | null
          shipping_class: string
          shipping_cost: number
          sku_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_time?: string | null
          id?: string
          product_id?: string | null
          shipping_class?: string
          shipping_cost?: number
          sku_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_shipping_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_shipping_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_skus: {
        Row: {
          created_at: string | null
          final_cost: number
          final_price: number
          id: string
          price_modifier: number | null
          product_id: string | null
          product_name: string
          sku: string
          sku_cost_modifier: number | null
          status: string | null
          updated_at: string | null
          variant_combination: Json
          warranty_period: number | null
        }
        Insert: {
          created_at?: string | null
          final_cost: number
          final_price: number
          id?: string
          price_modifier?: number | null
          product_id?: string | null
          product_name: string
          sku: string
          sku_cost_modifier?: number | null
          status?: string | null
          updated_at?: string | null
          variant_combination?: Json
          warranty_period?: number | null
        }
        Update: {
          created_at?: string | null
          final_cost?: number
          final_price?: number
          id?: string
          price_modifier?: number | null
          product_id?: string | null
          product_name?: string
          sku?: string
          sku_cost_modifier?: number | null
          status?: string | null
          updated_at?: string | null
          variant_combination?: Json
          warranty_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_skus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_specifications: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          spec_name: string
          spec_value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          spec_name: string
          spec_value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          spec_name?: string
          spec_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_specifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tags: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          sku_id: string | null
          tag_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          sku_id?: string | null
          tag_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          sku_id?: string | null
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tags_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          variant_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          variant_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_cost: number | null
          brand_id: string | null
          category_id: string | null
          cost_currency: string | null
          created_at: string | null
          currency: string
          description: string | null
          id: string
          price: number
          product_name: string
          product_type: Database["public"]["Enums"]["product_type"]
          return_policy: string | null
          sku: string
          status: Database["public"]["Enums"]["product_status"]
          supplier_id: string | null
          tax_category_id: string | null
          updated_at: string | null
          warranty_period: number | null
        }
        Insert: {
          base_cost?: number | null
          brand_id?: string | null
          category_id?: string | null
          cost_currency?: string | null
          created_at?: string | null
          currency: string
          description?: string | null
          id?: string
          price: number
          product_name: string
          product_type: Database["public"]["Enums"]["product_type"]
          return_policy?: string | null
          sku: string
          status?: Database["public"]["Enums"]["product_status"]
          supplier_id?: string | null
          tax_category_id?: string | null
          updated_at?: string | null
          warranty_period?: number | null
        }
        Update: {
          base_cost?: number | null
          brand_id?: string | null
          category_id?: string | null
          cost_currency?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          price?: number
          product_name?: string
          product_type?: Database["public"]["Enums"]["product_type"]
          return_policy?: string | null
          sku?: string
          status?: Database["public"]["Enums"]["product_status"]
          supplier_id?: string | null
          tax_category_id?: string | null
          updated_at?: string | null
          warranty_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_tax_category_id_fkey"
            columns: ["tax_category_id"]
            isOneToOne: false
            referencedRelation: "tax_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      related_products: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          related_product_id: string
          relation_type: Database["public"]["Enums"]["relation_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          related_product_id: string
          relation_type: Database["public"]["Enums"]["relation_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          related_product_id?: string
          relation_type?: Database["public"]["Enums"]["relation_type"]
        }
        Relationships: [
          {
            foreignKeyName: "related_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_products_related_product_id_fkey"
            columns: ["related_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sku_features: {
        Row: {
          created_at: string | null
          feature_name: string
          feature_value: string
          id: string
          sku_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_name: string
          feature_value: string
          id?: string
          sku_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_name?: string
          feature_value?: string
          id?: string
          sku_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sku_features_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      sku_specifications: {
        Row: {
          created_at: string | null
          id: string
          sku_id: string | null
          spec_name: string
          spec_value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sku_id?: string | null
          spec_name: string
          spec_value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sku_id?: string | null
          spec_name?: string
          spec_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "sku_specifications_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "product_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          supplier_name: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          supplier_name: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          supplier_name?: string
        }
        Relationships: []
      }
      tax_categories: {
        Row: {
          created_at: string | null
          id: string
          region: string | null
          tax_name: string
          tax_rate: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          region?: string | null
          tax_name: string
          tax_rate: number
        }
        Update: {
          created_at?: string | null
          id?: string
          region?: string | null
          tax_name?: string
          tax_rate?: number
        }
        Relationships: []
      }
      variant_options: {
        Row: {
          created_at: string | null
          id: string
          option_value: string
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_value: string
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          option_value?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variant_options_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discount_type: "fixed" | "percentage" | "fixed_amount"
      product_status: "active" | "inactive" | "archived"
      product_type: "base" | "variant" | "bundle"
      relation_type: "upsell" | "cross-sell" | "related"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
