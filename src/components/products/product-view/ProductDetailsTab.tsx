
import React from "react";
import { 
  Tag, 
  DollarSign, 
  Package, 
  Info, 
  List, 
  Award,
  GanttChart 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/ProductTypes";

interface ProductDetailsTabProps {
  product: Product;
  brandName: string;
  categoryName: string;
  t: (key: string) => string;
}

const ProductDetailsTab: React.FC<ProductDetailsTabProps> = ({ 
  product, 
  brandName, 
  categoryName,
  t 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'draft':
        return 'bg-amber-500';
      case 'discontinued':
      case 'inactive':
        return 'bg-red-500';
      case 'archived':
        return 'bg-gray-500';  
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("sku")}</span>
          </div>
          <span className="text-lg font-medium">{product.sku}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("price")}</span>
          </div>
          <span className="text-lg font-medium">
            {product.price} {product.currency}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("brand")}</span>
          </div>
          <span className="text-lg font-medium">{brandName}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GanttChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("category")}</span>
          </div>
          <span className="text-lg font-medium">{categoryName}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("type")}</span>
          </div>
          <span className="text-lg font-medium">{t(product.product_type)}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("status")}</span>
          </div>
          <Badge className={getStatusColor(product.status)}>
            {t(product.status)}
          </Badge>
        </div>
      </div>
      
      {product.description && (
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("description")}</span>
          </div>
          <p className="text-sm">{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsTab;
