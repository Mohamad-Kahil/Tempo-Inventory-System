
import React from "react";
import { useApp } from "../../../contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/ProductTypes";

interface ProductBasicFieldsProps {
  product: Partial<Product>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProductBasicFields: React.FC<ProductBasicFieldsProps> = ({
  product,
  handleChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product_name">{t("productName")}</Label>
        <Input
          id="product_name"
          name="product_name"
          value={product.product_name || ""}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{t("description")}</Label>
        <Textarea
          id="description"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          className="min-h-[100px]"
          placeholder={t("enterProductDescription")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="warranty_period">{t("warrantyPeriod")} ({t("inMonths")})</Label>
        <Input
          id="warranty_period"
          name="warranty_period"
          type="number"
          min="0"
          value={product.warranty_period || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ProductBasicFields;
