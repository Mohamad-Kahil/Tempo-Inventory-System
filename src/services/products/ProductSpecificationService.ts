import { supabase } from "@/integrations/supabase/client";
import { ProductSpecification } from "@/types/ProductTypes";

export const fetchProductSpecifications = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_specifications")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    throw error;
  }

  return data as ProductSpecification[];
};

export const saveProductSpecification = async (spec: Partial<ProductSpecification>) => {
  // Validate input
  if (!spec.product_id) {
    throw new Error("Product ID is required");
  }
  
  if (!spec.spec_name || !spec.spec_value) {
    throw new Error("Specification name and value are required");
  }

  try {
    const { data, error } = await supabase
      .from('product_specifications')
      .insert({
        product_id: spec.product_id,
        spec_name: spec.spec_name.trim(),
        spec_value: spec.spec_value.trim()
      })
      .select();

    if (error) {
      console.error("Error saving specification:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in saveProductSpecification:", error);
    throw error;
  }
};

export const deleteProductSpecification = async (specId: string) => {
  const { error } = await supabase
    .from("product_specifications")
    .delete()
    .eq("id", specId);

  if (error) throw error;
};
