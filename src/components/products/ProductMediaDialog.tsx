
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  fetchProductMedia, 
  saveProductMedia, 
  deleteProductMedia, 
  setMediaAsPrimary 
} from "@/services/ProductsService";
import MediaUploader from "./media/MediaUploader";
import MediaGrid from "./media/MediaGrid";

interface ProductMediaDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const ProductMediaDialog: React.FC<ProductMediaDialogProps> = ({ open, onClose, productId }) => {
  const { t } = useApp();
  const queryClient = useQueryClient();
  
  // State for uploads
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch media
  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ["product-media", productId],
    queryFn: () => fetchProductMedia(productId),
    enabled: open && !!productId,
  });

  // Mutations
  const addMediaMutation = useMutation({
    mutationFn: (file: File) => {
      console.log("Starting upload for file:", file.name);
      return saveProductMedia(
        productId,
        file,
        mediaItems.length === 0, // First image is primary
        mediaItems.length // Set order to current length
      );
    },
    onSuccess: (data) => {
      console.log("Upload success:", data);
      queryClient.invalidateQueries({ queryKey: ["product-media", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
      toast.success(t("mediaUploaded"));
      setIsUploading(false);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error(t("uploadMediaError"));
      setIsUploading(false);
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: deleteProductMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-media", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("mediaDeleted"));
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error(t("deleteMediaError"));
    },
  });
  
  const setPrimaryMediaMutation = useMutation({
    mutationFn: (mediaId: string) => setMediaAsPrimary(productId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-media", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("primaryMediaSet"));
    },
    onError: (error) => {
      console.error("Set primary error:", error);
      toast.error(t("setPrimaryMediaError"));
    },
  });

  // Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    console.log("Selected files:", selectedFiles.map(f => f.name));
    
    // Upload each file
    setIsUploading(true);
    selectedFiles.forEach(file => {
      addMediaMutation.mutate(file);
    });
    
    // Clear the input
    e.target.value = "";
  };

  const handleDeleteMedia = (mediaId: string) => {
    deleteMediaMutation.mutate(mediaId);
  };
  
  const handleSetPrimary = (mediaId: string) => {
    setPrimaryMediaMutation.mutate(mediaId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("productMedia")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <MediaUploader 
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
            t={t}
          />

          <MediaGrid 
            mediaItems={mediaItems}
            onDelete={handleDeleteMedia}
            onSetPrimary={handleSetPrimary}
            isLoading={isLoading}
            isUploading={isUploading}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductMediaDialog;
