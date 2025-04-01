
import React from "react";
import { ImageIcon } from "lucide-react";
import { ProductMedia } from "@/types/ProductTypes";

interface ProductImageGalleryProps {
  mediaItems: ProductMedia[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ mediaItems }) => {
  // Find primary image
  const primaryImage = mediaItems.find(media => media.is_primary);
  const displayImage = primaryImage?.media_url || mediaItems[0]?.media_url;

  return (
    <div className="flex flex-col space-y-2">
      <div className="border rounded-md overflow-hidden h-60">
        {displayImage ? (
          <img 
            src={displayImage}
            alt="Product"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-16 w-16 opacity-20" />
          </div>
        )}
      </div>
      
      {mediaItems.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {mediaItems.slice(0, 4).map((media) => (
            <div 
              key={media.id} 
              className={`w-16 h-16 border rounded overflow-hidden ${
                media.is_primary ? 'border-primary' : ''
              }`}
            >
              {media.media_type?.startsWith('image/') ? (
                <img 
                  src={media.media_url} 
                  alt="Product thumbnail" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 opacity-50" />
                </div>
              )}
            </div>
          ))}
          {mediaItems.length > 4 && (
            <div className="w-16 h-16 border rounded bg-muted flex items-center justify-center text-muted-foreground">
              +{mediaItems.length - 4}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
