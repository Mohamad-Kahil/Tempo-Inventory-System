
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductStatus, ProductType } from "@/types/ProductTypes";

export const saveProduct = async (productData: Partial<Product>, isEditing: boolean, productId?: string) => {
  if (isEditing && productId) {
    // Update existing product
    const { error } = await supabase
      .from("products")
      .update({
        ...productData,
        product_type: productData.product_type as ProductType,
        status: productData.status as ProductStatus,
      })
      .eq("id", productId);
    
    if (error) throw error;
    return "update";
  } else {
    // Add new product
    const newProduct = {
      ...productData,
      product_type: (productData.product_type || 'base') as ProductType,
      status: (productData.status || 'active') as ProductStatus,
      price: productData.price || 0,
      currency: productData.currency || 'USD',
      product_name: productData.product_name || '',
      sku: productData.sku || '',
    };
    
    const { error } = await supabase
      .from("products")
      .insert([newProduct]);
    
    if (error) throw error;
    return "insert";
  }
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  
  if (error) throw error;
  return true;
};
