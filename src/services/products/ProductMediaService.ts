import { supabase } from "@/integrations/supabase/client";
import { ProductMedia } from "@/types/ProductTypes";

export const fetchProductMedia = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_media")
    .select("*")
    .eq("product_id", productId)
    .order("media_order", { ascending: true });

  if (error) {
    console.error("Error fetching product media:", error);
    throw error;
  }

  return data as ProductMedia[];
};

export const saveProductMedia = async (
  productId: string, 
  file: File, 
  isPrimary: boolean = false,
  mediaOrder: number = 0
) => {
  try {
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Unsupported file type");
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error("File size exceeds 10MB");
    }

    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Date.now()}.${fileExt}`;
    const filePath = `product-media/${fileName}`;
    
    console.log("Generated file path:", filePath);
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('public')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw uploadError;
    }
    
    console.log("File uploaded successfully:", uploadData);
    
    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase
      .storage
      .from('public')
      .getPublicUrl(filePath);
    
    console.log("Got public URL:", publicUrlData.publicUrl);
    
    // Save media record to database
    const { data: dbData, error: dbError } = await supabase
      .from('product_media')
      .insert([{
        product_id: productId,
        media_url: publicUrlData.publicUrl,
        media_type: file.type,
        is_primary: isPrimary,
        media_order: mediaOrder
      }])
      .select();
      
    if (dbError) {
      console.error("Database insert error:", dbError);
      throw dbError;
    }
    
    console.log("Media record saved to database");
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in saveProductMedia:", error);
    throw error;
  }
};

export const updateProductMedia = async (mediaId: string, updates: Partial<ProductMedia>) => {
  console.log("Updating product media:", { mediaId, updates });
  
  const { error } = await supabase
    .from('product_media')
    .update(updates)
    .eq('id', mediaId);
    
  if (error) {
    console.error("Error updating product media:", error);
    throw error;
  }
};

export const deleteProductMedia = async (mediaId: string) => {
  console.log("Deleting product media:", mediaId);
  
  // First get the media record to find the file path
  const { data: mediaData, error: fetchError } = await supabase
    .from('product_media')
    .select('media_url')
    .eq('id', mediaId)
    .single();
    
  if (fetchError) {
    console.error("Error fetching media data:", fetchError);
    throw fetchError;
  }
  
  // Delete the database record
  const { error: dbError } = await supabase
    .from('product_media')
    .delete()
    .eq('id', mediaId);
    
  if (dbError) {
    console.error("Error deleting media record:", dbError);
    throw dbError;
  }
  
  // Try to delete the file if URL contains the path
  try {
    const url = new URL(mediaData.media_url);
    const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/([^\/]+)\/(.*)/);
    if (pathMatch) {
      const bucket = pathMatch[1];
      const path = pathMatch[2];
      
      console.log("Deleting file from storage:", { bucket, path });
      
      const { error: storageError } = await supabase
        .storage
        .from(bucket)
        .remove([path]);
        
      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
      }
    }
  } catch (e) {
    console.error("Failed to delete file from storage:", e);
  }
};

export const setMediaAsPrimary = async (productId: string, mediaId: string) => {
  console.log("Setting media as primary:", { productId, mediaId });
  
  // First reset all media for this product to non-primary
  const { error: resetError } = await supabase
    .from('product_media')
    .update({ is_primary: false })
    .eq('product_id', productId);
    
  if (resetError) {
    console.error("Error resetting primary media:", resetError);
    throw resetError;
  }
  
  // Then set the selected media as primary
  const { error: updateError } = await supabase
    .from('product_media')
    .update({ is_primary: true })
    .eq('id', mediaId);
    
  if (updateError) {
    console.error("Error updating primary media:", updateError);
    throw updateError;
  }
};
