
import React from "react";
import { ProductFeature } from "@/types/ProductTypes";

interface ProductFeaturesTabProps {
  features: ProductFeature[];
  t: (key: string) => string;
}

const ProductFeaturesTab: React.FC<ProductFeaturesTabProps> = ({ features, t }) => {
  if (features.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t("noFeaturesFound")}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <div key={feature.id} className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{feature.feature_name}</span>
            <span className="bg-muted px-2 py-1 rounded-sm text-xs">
              {feature.feature_value}
            </span>
          </div>
          {feature.feature_description && (
            <p className="text-sm text-muted-foreground mt-2">
              {feature.feature_description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFeaturesTab;
