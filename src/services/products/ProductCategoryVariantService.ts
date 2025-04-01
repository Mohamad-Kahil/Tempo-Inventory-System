
import { supabase } from "@/integrations/supabase/client";
import { CategoryVariant, CategoryVariantValue } from "@/types/ProductTypes";

export const fetchCategoryVariants = async (categoryId: string | null) => {
  if (!categoryId) return [];
  
  const { data, error } = await supabase
    .from("category_variants")
    .select("*")
    .eq("category_id", categoryId)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching category variants:", error);
    throw error;
  }

  return data as CategoryVariant[];
};

export const fetchCategoryVariantValues = async (variantId: string | null) => {
  if (!variantId) return [];
  
  const { data, error } = await supabase
    .from("category_variant_values")
    .select("*")
    .eq("variant_id", variantId)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching category variant values:", error);
    throw error;
  }

  return data as CategoryVariantValue[];
};

export const saveCategoryVariantValue = async (value: Partial<CategoryVariantValue>) => {
  if (value.id) {
    // Update existing option
    const { error } = await supabase
      .from("category_variant_values")
      .update({
        value_name: value.value_name,
        price_modifier: value.price_modifier,
        price_modifier_type: value.price_modifier_type,
        display_order: value.display_order
      })
      .eq("id", value.id);

    if (error) throw error;
  } else {
    // Add new option
    const { error } = await supabase
      .from("category_variant_values")
      .insert([{
        variant_id: value.variant_id,
        value_name: value.value_name,
        price_modifier: value.price_modifier || 0,
        price_modifier_type: value.price_modifier_type || 'fixed',
        display_order: value.display_order || 0
      }]);

    if (error) throw error;
  }
};

export const deleteCategoryVariantValue = async (valueId: string) => {
  const { error } = await supabase
    .from("category_variant_values")
    .delete()
    .eq("id", valueId);

  if (error) throw error;
};
