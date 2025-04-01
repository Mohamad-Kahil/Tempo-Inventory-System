
// Define product status type based on the Supabase enum
export type ProductStatus = "active" | "inactive" | "archived";
export type ProductType = "base" | "variant" | "bundle";

export interface Product {
  id: string;
  product_name: string;
  sku: string;
  price: number;
  currency: string;
  status: ProductStatus;
  product_type: ProductType;
  category_id: string | null;
  brand_id: string | null;
  description: string | null;
  warranty_period: number | null;
  created_at: string;
  media_url?: string; // Added for product thumbnail
}

export interface Category {
  id: string;
  category_name: string;
}

export interface Brand {
  id: string;
  brand_name: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  created_at: string;
}

export interface VariantOption {
  id: string;
  variant_id: string;
  option_value: string;
  created_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature_name: string;
  feature_value: string;
  feature_description: string | null;
  display_order: number | null;
  created_at: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_name: string;
  spec_value: string;
  created_at: string;
}

export interface ProductMedia {
  id: string;
  product_id: string | null;
  sku_id: string | null;
  media_url: string;
  media_type: string | null;
  is_primary: boolean | null;
  media_order: number | null;
  created_at: string | null;
}

// New interfaces for category variants
export interface CategoryVariant {
  id: string;
  category_id: string;
  variant_name: string;
  description: string | null;
  is_required: boolean;
  is_multiple_choice: boolean;
  display_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryVariantValue {
  id: string;
  variant_id: string;
  value_name: string;
  price_modifier: number;
  price_modifier_type: string;
  display_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}
