
import React from "react";
import { useApp } from "../../../contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, ProductStatus } from "@/types/ProductTypes";

interface ProductSkuStatusFieldsProps {
  product: Partial<Product>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ProductSkuStatusFields: React.FC<ProductSkuStatusFieldsProps> = ({
  product,
  handleChange,
  handleSelectChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="sku">{t("sku")}</Label>
        <Input
          id="sku"
          name="sku"
          value={product.sku || ""}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">{t("status")}</Label>
        <Select
          value={product.status}
          onValueChange={(value: ProductStatus) => handleSelectChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t("active")}</SelectItem>
            <SelectItem value="inactive">{t("inactive")}</SelectItem>
            <SelectItem value="archived">{t("archived")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSkuStatusFields;
