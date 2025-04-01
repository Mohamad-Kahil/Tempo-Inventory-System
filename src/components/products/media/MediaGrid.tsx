
import React from "react";
import { ProductMedia } from "@/types/ProductTypes";
import MediaItem from "./MediaItem";

interface MediaGridProps {
  mediaItems: ProductMedia[];
  onDelete: (mediaId: string) => void;
  onSetPrimary: (mediaId: string) => void;
  isLoading: boolean;
  isUploading: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ 
  mediaItems, 
  onDelete, 
  onSetPrimary, 
  isLoading, 
  isUploading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (mediaItems.length === 0 && !isUploading) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No media found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaItems.map((media) => (
        <MediaItem 
          key={media.id}
          media={media}
          onDelete={onDelete}
          onSetPrimary={onSetPrimary}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
