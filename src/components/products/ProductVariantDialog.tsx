
import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  fetchProductVariants,
  fetchVariantOptions,
  fetchCategoryVariants,
  fetchCategoryVariantValues,
  saveProductVariant,
  saveVariantOption
} from "@/services/ProductsService";
import VariantsTabContent from "./variants/VariantsTabContent";
import OptionsTabContent from "./variants/OptionsTabContent";

interface ProductVariantDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  categoryId?: string | null;
}

const ProductVariantDialog: React.FC<ProductVariantDialogProps> = ({ 
  open, 
  onClose, 
  productId,
  categoryId 
}) => {
  const { t } = useApp();
  const queryClient = useQueryClient();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedCategoryVariantId, setSelectedCategoryVariantId] = useState<string | null>(null);

  // Fetch product variants
  const { data: variants = [], isLoading: variantsLoading } = useQuery({
    queryKey: ["product-variants", productId],
    queryFn: () => fetchProductVariants(productId),
    enabled: open && !!productId,
  });

  // Fetch options for the selected variant
  const { data: variantOptions = [], isLoading: optionsLoading } = useQuery({
    queryKey: ["variant-options", selectedVariantId],
    queryFn: () => fetchVariantOptions(selectedVariantId!),
    enabled: open && !!selectedVariantId,
  });

  // Fetch category variants if categoryId is provided
  const { data: categoryVariants = [], isLoading: categoryVariantsLoading } = useQuery({
    queryKey: ["category-variants", categoryId],
    queryFn: () => fetchCategoryVariants(categoryId!),
    enabled: open && !!categoryId,
  });

  // Fetch category variant values
  const { data: categoryVariantValues = [], isLoading: categoryVariantValuesLoading } = useQuery({
    queryKey: ["category-variant-values", selectedCategoryVariantId],
    queryFn: () => fetchCategoryVariantValues(selectedCategoryVariantId!),
    enabled: open && !!selectedCategoryVariantId,
  });

  // Auto-select first variant when loaded
  useEffect(() => {
    if (variants.length > 0 && !selectedVariantId) {
      setSelectedVariantId(variants[0].id);
    }
  }, [variants, selectedVariantId]);

  const handleAddProductVariant = async (variantName: string) => {
    try {
      const newVariant = await saveProductVariant({
        product_id: productId,
        variant_name: variantName
      });
      queryClient.invalidateQueries({ queryKey: ["product-variants", productId] });
      return newVariant;
    } catch (error) {
      console.error("Error adding variant:", error);
      // Handle error (e.g., show toast)
    }
  };

  const handleAddVariantOption = async (optionValue: string) => {
    if (!selectedVariantId) return;
    
    try {
      const newOption = await saveVariantOption({
        variant_id: selectedVariantId,
        option_value: optionValue
      });
      queryClient.invalidateQueries({ queryKey: ["variant-options", selectedVariantId] });
      return newOption;
    } catch (error) {
      console.error("Error adding variant option:", error);
      // Handle error (e.g., show toast)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("productVariants")}</DialogTitle>
          <DialogDescription>{t("manageProductVariantsDescription")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="variants" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variants">{t("variants")}</TabsTrigger>
            <TabsTrigger value="options" disabled={!selectedVariantId}>
              {t("variantOptions")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="variants">
            <VariantsTabContent
              variants={variants}
              productId={productId}
              variantsLoading={variantsLoading}
              selectedVariantId={selectedVariantId}
              onVariantSelect={setSelectedVariantId}
              categoryVariants={categoryVariants}
              categoryVariantsLoading={categoryVariantsLoading}
              onAddVariant={handleAddProductVariant}
            />
          </TabsContent>

          <TabsContent value="options">
            <OptionsTabContent
              variantOptions={variantOptions}
              selectedVariantId={selectedVariantId}
              optionsLoading={optionsLoading}
              categoryVariantValues={categoryVariantValues}
              categoryVariantValuesLoading={categoryVariantValuesLoading}
              selectedCategoryVariantId={selectedCategoryVariantId}
              onAddOption={handleAddVariantOption} // Pass the prop with proper typing
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariantDialog;
