
import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PenBox, 
  Trash, 
  Layers, 
  Star, 
  ImageIcon, 
  Box, 
  Eye
} from "lucide-react";
import { Product } from "@/types/ProductTypes";
import ProductVariantDialog from "./ProductVariantDialog";
import ProductFeaturesDialog from "./ProductFeaturesDialog";
import ProductSpecificationsDialog from "./ProductSpecificationsDialog";
import ProductMediaDialog from "./ProductMediaDialog";
import ProductViewDialog from "./ProductViewDialog";
import { Avatar } from "@/components/ui/avatar";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onAdd
}) => {
  const { t } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [featuresDialogOpen, setFeaturesDialogOpen] = useState(false);
  const [specificationsDialogOpen, setSpecificationsDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

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

  const handleOpenDialog = (product: Product, dialog: string) => {
    setSelectedProduct(product);
    switch (dialog) {
      case 'variant':
        setVariantDialogOpen(true);
        break;
      case 'features':
        setFeaturesDialogOpen(true);
        break;
      case 'specs':
        setSpecificationsDialogOpen(true);
        break;
      case 'media':
        setMediaDialogOpen(true);
        break;
      case 'view':
        setViewDialogOpen(true);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">{t("noProducts")}</p>
        <Button onClick={onAdd} className="mt-4">
          <span className="mr-2">+</span>
          {t("addProduct")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("productName")}</TableHead>
              <TableHead>{t("sku")}</TableHead>
              <TableHead>{t("price")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {product.media_url ? (
                        <img 
                          src={product.media_url} 
                          alt={product.product_name}
                          className="aspect-square object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <ImageIcon className="h-4 w-4 opacity-50" />
                        </div>
                      )}
                    </Avatar>
                    <span className="font-medium">{product.product_name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>
                  {product.price} {product.currency}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className={getStatusColor(product.status)}>
                    {t(product.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("view")}
                      onClick={() => handleOpenDialog(product, 'view')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("variants")}
                      onClick={() => handleOpenDialog(product, 'variant')}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("features")}
                      onClick={() => handleOpenDialog(product, 'features')}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("specifications")}
                      onClick={() => handleOpenDialog(product, 'specs')}
                    >
                      <Box className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("media")}
                      onClick={() => handleOpenDialog(product, 'media')}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("edit")}
                      onClick={() => onEdit(product)}
                    >
                      <PenBox className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t("delete")}
                      className="text-destructive hover:text-destructive" 
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {selectedProduct && (
        <>
          <ProductVariantDialog
            open={variantDialogOpen}
            onClose={() => setVariantDialogOpen(false)}
            productId={selectedProduct.id}
          />
          <ProductFeaturesDialog
            open={featuresDialogOpen}
            onClose={() => setFeaturesDialogOpen(false)}
            productId={selectedProduct.id}
          />
          <ProductSpecificationsDialog
            open={specificationsDialogOpen}
            onClose={() => setSpecificationsDialogOpen(false)}
            productId={selectedProduct.id}
          />
          <ProductMediaDialog
            open={mediaDialogOpen}
            onClose={() => setMediaDialogOpen(false)}
            productId={selectedProduct.id}
          />
          <ProductViewDialog
            open={viewDialogOpen}
            onClose={() => setViewDialogOpen(false)}
            product={selectedProduct}
          />
        </>
      )}
    </>
  );
};

export default ProductTable;
