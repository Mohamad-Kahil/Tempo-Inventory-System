
import React from "react";
import { Button } from "@/components/ui/button";
import { Image, Trash2, Star } from "lucide-react";
import { ProductMedia } from "@/types/ProductTypes";

interface MediaItemProps {
  media: ProductMedia;
  onDelete: (mediaId: string) => void;
  onSetPrimary: (mediaId: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ media, onDelete, onSetPrimary }) => {
  return (
    <div 
      key={media.id} 
      className={`relative rounded-md overflow-hidden border ${
        media.is_primary ? 'border-primary' : 'border-border'
      }`}
    >
      {media.media_type?.startsWith('image/') ? (
        <img 
          src={media.media_url} 
          alt="Product" 
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 bg-muted flex items-center justify-center">
          <Image className="h-16 w-16 opacity-50" />
        </div>
      )}
      <div className="absolute top-1 right-1 flex space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/80 hover:bg-background"
          onClick={() => onSetPrimary(media.id)}
          disabled={media.is_primary}
        >
          <Star className={`h-3 w-3 ${
            media.is_primary ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'
          }`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/80 hover:bg-background"
          onClick={() => onDelete(media.id)}
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default MediaItem;
