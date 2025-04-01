
import React from "react";
import { useApp } from "../../../contexts/AppContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/ProductTypes";

interface ProductDescriptionFieldProps {
  product: Partial<Product>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProductDescriptionField: React.FC<ProductDescriptionFieldProps> = ({
  product,
  handleChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="description">{t("description")}</Label>
      <Textarea
        id="description"
        name="description"
        value={product.description || ""}
        onChange={handleChange}
        rows={4}
      />
    </div>
  );
};

export default ProductDescriptionField;
