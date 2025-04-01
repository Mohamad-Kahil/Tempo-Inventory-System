
import React, { useState, useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/ProductTypes";
import { ProductFormProps } from "@/types/ProductFormTypes";
import ProductBasicFields from "./form/ProductBasicFields";
import ProductSkuStatusFields from "./form/ProductSkuStatusFields";
import ProductPriceFields from "./form/ProductPriceFields";
import ProductTypeField from "./form/ProductTypeField";
import ProductCategoryBrandFields from "./form/ProductCategoryBrandFields";
import ProductDescriptionField from "./form/ProductDescriptionField";

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onClose,
  onSave,
  editProduct,
  categories,
  brands,
}) => {
  const { t } = useApp();
  const [product, setProduct] = useState<Partial<Product>>({
    product_name: "",
    sku: "",
    price: 0,
    currency: "USD",
    status: "active",
    product_type: "base",
    category_id: null,
    brand_id: null,
    description: "",
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    } else {
      setProduct({
        product_name: "",
        sku: "",
        price: 0,
        currency: "USD",
        status: "active",
        product_type: "base",
        category_id: null,
        brand_id: null,
        description: "",
      });
    }
  }, [editProduct, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editProduct ? t("editProduct") : t("addProduct")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProductBasicFields 
            product={product} 
            handleChange={handleChange} 
          />
          
          <ProductSkuStatusFields 
            product={product} 
            handleChange={handleChange} 
            handleSelectChange={handleSelectChange}
          />
          
          <ProductPriceFields 
            product={product} 
            handleChange={handleChange} 
            handleSelectChange={handleSelectChange}
          />

          <ProductTypeField 
            product={product} 
            handleSelectChange={handleSelectChange}
          />
          
          <ProductCategoryBrandFields 
            product={product} 
            categories={categories} 
            brands={brands}
            handleSelectChange={handleSelectChange}
          />
          
          <ProductDescriptionField 
            product={product} 
            handleChange={handleChange}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit">
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
