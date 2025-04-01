
import React from "react";
import { ProductVariant } from "@/types/ProductTypes";

interface ProductVariantsTabProps {
  variants: ProductVariant[];
  t: (key: string) => string;
}

const ProductVariantsTab: React.FC<ProductVariantsTabProps> = ({ variants, t }) => {
  if (variants.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t("noVariantsFound")}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.id} className="border rounded-md p-3">
          <h3 className="font-medium">{variant.variant_name}</h3>
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">
              {t("clickVariantsButtonToManage")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariantsTab;
