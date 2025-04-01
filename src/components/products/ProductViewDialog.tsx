
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/ProductTypes";
import { 
  fetchProductVariants, 
  fetchProductFeatures, 
  fetchProductSpecifications, 
  fetchProductMedia,
  fetchBrands,
  fetchCategories
} from "@/services/ProductsService";
import ProductImageGallery from "./product-view/ProductImageGallery";
import ProductTabsContent from "./product-view/ProductTabsContent";

interface ProductViewDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductViewDialog: React.FC<ProductViewDialogProps> = ({ open, onClose, product }) => {
  const { t } = useApp();
  
  const { data: variants = [] } = useQuery({
    queryKey: ["product-variants", product?.id],
    queryFn: () => fetchProductVariants(product!.id),
    enabled: open && !!product?.id,
  });
  
  const { data: features = [] } = useQuery({
    queryKey: ["product-features", product?.id],
    queryFn: () => fetchProductFeatures(product!.id),
    enabled: open && !!product?.id,
  });
  
  const { data: specifications = [] } = useQuery({
    queryKey: ["product-specifications", product?.id],
    queryFn: () => fetchProductSpecifications(product!.id),
    enabled: open && !!product?.id,
  });
  
  const { data: mediaItems = [] } = useQuery({
    queryKey: ["product-media", product?.id],
    queryFn: () => fetchProductMedia(product!.id),
    enabled: open && !!product?.id,
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: open && !!product?.category_id,
  });
  
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    enabled: open && !!product?.brand_id,
  });
  
  if (!product) {
    return null;
  }
  
  const categoryName = product.category_id 
    ? categories.find(cat => cat.id === product.category_id)?.category_name || "-" 
    : "-";
    
  const brandName = product.brand_id
    ? brands.find(brand => brand.id === product.brand_id)?.brand_name || "-"
    : "-";
    
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.product_name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ProductImageGallery mediaItems={mediaItems} />
          </div>
          
          <div className="md:col-span-2">
            <ProductTabsContent
              product={product}
              brandName={brandName}
              categoryName={categoryName}
              variants={variants}
              features={features}
              specifications={specifications}
              t={t}
            />
          </div>
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

export default ProductViewDialog;
