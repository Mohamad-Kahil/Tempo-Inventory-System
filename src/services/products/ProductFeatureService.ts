
import { supabase } from "@/integrations/supabase/client";
import { ProductFeature } from "@/types/ProductTypes";

export const fetchProductFeatures = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_features")
    .select("*")
    .eq("product_id", productId)
    .order("display_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data as ProductFeature[];
};

export const saveProductFeature = async (feature: Partial<ProductFeature>) => {
  if (feature.id) {
    // Update existing feature
    const { error } = await supabase
      .from("product_features")
      .update({
        feature_name: feature.feature_name,
        feature_value: feature.feature_value,
        feature_description: feature.feature_description,
        display_order: feature.display_order || 0
      })
      .eq("id", feature.id);

    if (error) throw error;
  } else {
    // Add new feature
    const { error } = await supabase
      .from("product_features")
      .insert([{
        product_id: feature.product_id,
        feature_name: feature.feature_name,
        feature_value: feature.feature_value,
        feature_description: feature.feature_description,
        display_order: feature.display_order || 0
      }]);

    if (error) throw error;
  }
};

export const deleteProductFeature = async (featureId: string) => {
  const { error } = await supabase
    .from("product_features")
    .delete()
    .eq("id", featureId);

  if (error) throw error;
};
