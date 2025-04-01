import { supabase } from "@/integrations/supabase/client";
import { Product, ProductStatus } from "@/types/ProductTypes";

export const fetchProducts = async (
  selectedCategory: string | null,
  selectedBrand: string | null,
  selectedStatus: ProductStatus | null
) => {
  let query = supabase
    .from("products")
    .select("*, product_media(media_url, is_primary)")
    .order("created_at", { ascending: false });
  
  if (selectedCategory) {
    query = query.eq("category_id", selectedCategory);
  }
  
  if (selectedBrand) {
    query = query.eq("brand_id", selectedBrand);
  }
  
  if (selectedStatus) {
    query = query.eq("status", selectedStatus);
  }

  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  // Process products to include media URL
  const processedProducts = data.map(product => {
    let mediaUrl = undefined;
    
    if (product.product_media && product.product_media.length > 0) {
      // First try to find primary image
      const primaryImage = product.product_media.find(media => media.is_primary);
      if (primaryImage) {
        mediaUrl = primaryImage.media_url;
      } else if (product.product_media[0]) {
        // Otherwise use the first image
        mediaUrl = product.product_media[0].media_url;
      }
    }
    
    return {
      ...product,
      media_url: mediaUrl
    };
  });
  
  return processedProducts as Product[];
};

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("category_name", { ascending: true });
  
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  
  return data;
};

export const fetchBrands = async () => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("brand_name", { ascending: true });
  
  if (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
  
  return data;
};
