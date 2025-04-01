
import React from "react";
import { useApp } from "../../../contexts/AppContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category, Brand } from "@/types/ProductTypes";

interface ProductCategoryBrandFieldsProps {
  product: Partial<Product>;
  categories: Category[];
  brands: Brand[];
  handleSelectChange: (name: string, value: string) => void;
}

const ProductCategoryBrandFields: React.FC<ProductCategoryBrandFieldsProps> = ({
  product,
  categories,
  brands,
  handleSelectChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="category_id">{t("category")}</Label>
        <Select
          value={product.category_id || "null"}
          onValueChange={(value) => handleSelectChange("category_id", value === "null" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectCategory")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">{t("none")}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="brand_id">{t("brand")}</Label>
        <Select
          value={product.brand_id || "null"}
          onValueChange={(value) => handleSelectChange("brand_id", value === "null" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectBrand")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">{t("none")}</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.brand_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductCategoryBrandFields;
