
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetailsTab from "./ProductDetailsTab";
import ProductSpecificationsTab from "./ProductSpecificationsTab";
import ProductFeaturesTab from "./ProductFeaturesTab";
import ProductVariantsTab from "./ProductVariantsTab";
import { Product, ProductFeature, ProductSpecification, ProductVariant } from "@/types/ProductTypes";

interface ProductTabsContentProps {
  product: Product;
  brandName: string;
  categoryName: string;
  variants: ProductVariant[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
  t: (key: string) => string;
}

const ProductTabsContent: React.FC<ProductTabsContentProps> = ({
  product,
  brandName,
  categoryName,
  variants,
  features,
  specifications,
  t
}) => {
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <Tabs defaultValue="details" onValueChange={setActiveTab} value={activeTab}>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="details">{t("details")}</TabsTrigger>
        <TabsTrigger value="specs">{t("specifications")}</TabsTrigger>
        <TabsTrigger value="features">{t("features")}</TabsTrigger>
        <TabsTrigger value="variants">{t("variants")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <ProductDetailsTab 
          product={product} 
          brandName={brandName} 
          categoryName={categoryName} 
          t={t} 
        />
      </TabsContent>
      
      <TabsContent value="specs">
        <ProductSpecificationsTab 
          specifications={specifications} 
          t={t} 
        />
      </TabsContent>
      
      <TabsContent value="features">
        <ProductFeaturesTab 
          features={features} 
          t={t} 
        />
      </TabsContent>
      
      <TabsContent value="variants">
        <ProductVariantsTab 
          variants={variants} 
          t={t} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabsContent;
