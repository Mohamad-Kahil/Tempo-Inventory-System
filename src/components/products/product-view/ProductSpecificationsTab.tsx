
import React from "react";
import { ProductSpecification } from "@/types/ProductTypes";

interface ProductSpecificationsTabProps {
  specifications: ProductSpecification[];
  t: (key: string) => string;
}

const ProductSpecificationsTab: React.FC<ProductSpecificationsTabProps> = ({ 
  specifications, 
  t
}) => {
  if (specifications.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t("noSpecificationsFound")}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {specifications.map((spec) => (
        <div key={spec.id} className="flex justify-between border-b pb-2">
          <span className="font-medium">{spec.spec_name}</span>
          <span>{spec.spec_value}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecificationsTab;
