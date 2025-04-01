
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { ProductVariant, CategoryVariant } from "@/types/ProductTypes";
import { useApp } from "@/contexts/AppContext";

interface VariantsTabContentProps {
  variants: ProductVariant[];
  productId: string;
  variantsLoading: boolean;
  selectedVariantId: string | null;
  onVariantSelect: (variantId: string) => void;
  categoryVariants?: CategoryVariant[];
  categoryVariantsLoading?: boolean;
  onAddVariant: (variantName: string) => Promise<any>;
}

const VariantsTabContent: React.FC<VariantsTabContentProps> = ({
  variants,
  variantsLoading,
  selectedVariantId,
  onVariantSelect,
  categoryVariants = [],
  categoryVariantsLoading = false,
  onAddVariant
}) => {
  const { t } = useApp();
  const [newVariantName, setNewVariantName] = useState("");
  const [selectedPresetVariant, setSelectedPresetVariant] = useState<string>("");

  const handleAddCustomVariant = async () => {
    if (!newVariantName.trim()) return;
    await onAddVariant(newVariantName);
    setNewVariantName("");
  };

  const handleAddPresetVariant = async () => {
    if (!selectedPresetVariant) return;
    const selectedVariant = categoryVariants.find(v => v.id === selectedPresetVariant);
    if (selectedVariant) {
      await onAddVariant(selectedVariant.variant_name);
      setSelectedPresetVariant("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Variant Creation */}
      <div>
        <h3 className="text-lg font-medium mb-2">{t("createCustomVariant")}</h3>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label htmlFor="new-variant">{t("variantName")}</Label>
            <Input
              id="new-variant"
              placeholder={t("enterVariantName")}
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleAddCustomVariant} 
            disabled={!newVariantName.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("add")}
          </Button>
        </div>
      </div>

      {/* Preset Variant Selection */}
      {categoryVariants.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">{t("addFromCategoryVariants")}</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>{t("selectCategoryVariant")}</Label>
              <Select 
                value={selectedPresetVariant} 
                onValueChange={setSelectedPresetVariant}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategoryVariant")} />
                </SelectTrigger>
                <SelectContent>
                  {categoryVariants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.variant_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleAddPresetVariant} 
              disabled={!selectedPresetVariant}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("addFromPreset")}
            </Button>
          </div>
        </div>
      )}

      {/* Current Variants */}
      <div>
        <h3 className="text-lg font-medium mb-2">{t("currentVariants")}</h3>
        {variantsLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : variants.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">{t("noVariantsFound")}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("variantName")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow 
                  key={variant.id} 
                  className={selectedVariantId === variant.id ? "bg-muted/50" : ""}
                  onClick={() => onVariantSelect(variant.id)}
                >
                  <TableCell className="font-medium cursor-pointer">
                    {variant.variant_name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implement delete variant logic here if needed
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default VariantsTabContent;
