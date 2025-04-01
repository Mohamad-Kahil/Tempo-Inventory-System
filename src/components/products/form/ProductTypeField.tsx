
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
import { Product, ProductType } from "@/types/ProductTypes";

interface ProductTypeFieldProps {
  product: Partial<Product>;
  handleSelectChange: (name: string, value: string) => void;
}

const ProductTypeField: React.FC<ProductTypeFieldProps> = ({
  product,
  handleSelectChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="product_type">{t("Type")}</Label>
        <Select
          value={product.product_type}
          onValueChange={(value: ProductType) => handleSelectChange("product_type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base Product</SelectItem>
            <SelectItem value="variant">Variant Product</SelectItem>
            <SelectItem value="bundle">Bundle</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductTypeField;
