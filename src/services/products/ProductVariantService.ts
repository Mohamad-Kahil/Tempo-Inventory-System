
import { supabase } from "@/integrations/supabase/client";
import { ProductVariant, VariantOption } from "@/types/ProductTypes";

export const fetchProductVariants = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as ProductVariant[];
};

export const saveProductVariant = async (variant: Partial<ProductVariant>) => {
  if (variant.id) {
    // Update existing variant
    const { error } = await supabase
      .from("product_variants")
      .update({
        variant_name: variant.variant_name
      })
      .eq("id", variant.id);

    if (error) throw error;
  } else {
    // Add new variant
    const { error } = await supabase
      .from("product_variants")
      .insert([{
        product_id: variant.product_id,
        variant_name: variant.variant_name
      }]);

    if (error) throw error;
  }
};

export const deleteProductVariant = async (variantId: string) => {
  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", variantId);

  if (error) throw error;
};

export const fetchVariantOptions = async (variantId: string) => {
  const { data, error } = await supabase
    .from("variant_options")
    .select("*")
    .eq("variant_id", variantId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as VariantOption[];
};

export const saveVariantOption = async (option: Partial<VariantOption>) => {
  if (option.id) {
    // Update existing option
    const { error } = await supabase
      .from("variant_options")
      .update({
        option_value: option.option_value
      })
      .eq("id", option.id);

    if (error) throw error;
  } else {
    // Add new option
    const { error } = await supabase
      .from("variant_options")
      .insert([{
        variant_id: option.variant_id,
        option_value: option.option_value
      }]);

    if (error) throw error;
  }
};

export const deleteVariantOption = async (optionId: string) => {
  const { error } = await supabase
    .from("variant_options")
    .delete()
    .eq("id", optionId);

  if (error) throw error;
};
