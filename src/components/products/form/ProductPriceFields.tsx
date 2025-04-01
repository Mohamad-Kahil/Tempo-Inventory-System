
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
import { Product } from "@/types/ProductTypes";
import { currencies } from "@/types/ProductFormTypes";

interface ProductPriceFieldsProps {
  product: Partial<Product>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ProductPriceFields: React.FC<ProductPriceFieldsProps> = ({
  product,
  handleChange,
  handleSelectChange,
}) => {
  const { t } = useApp();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="price">{t("price")}</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="currency">{t("currency")}</Label>
        <Select
          value={product.currency}
          onValueChange={(value) => handleSelectChange("currency", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectCurrency")} />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductPriceFields;
