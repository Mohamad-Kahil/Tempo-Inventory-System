
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Check } from "lucide-react";
import { VariantOption, CategoryVariantValue } from "@/types/ProductTypes";
import { saveVariantOption, deleteVariantOption } from "@/services/ProductsService";

interface OptionsTabContentProps {
  variantOptions: VariantOption[];
  selectedVariantId: string | null;
  optionsLoading: boolean;
  categoryVariantValues?: CategoryVariantValue[];
  categoryVariantValuesLoading?: boolean;
  selectedCategoryVariantId?: string | null;
  onAddOption?: (optionValue: string) => Promise<any>; // Add this missing prop
}

const OptionsTabContent: React.FC<OptionsTabContentProps> = ({
  variantOptions,
  selectedVariantId,
  optionsLoading,
  categoryVariantValues = [],
  categoryVariantValuesLoading = false,
  selectedCategoryVariantId,
  onAddOption // Include the prop in destructuring
}) => {
  const { t } = useApp();
  const queryClient = useQueryClient();
  const [newOptionValue, setNewOptionValue] = useState("");

  const addOptionMutation = useMutation({
    mutationFn: saveVariantOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variant-options", selectedVariantId] });
      setNewOptionValue("");
      toast.success(t("optionCreated"));
    },
    onError: () => {
      toast.error(t("createOptionError"));
    },
  });

  const deleteOptionMutation = useMutation({
    mutationFn: deleteVariantOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variant-options", selectedVariantId] });
      toast.success(t("optionDeleted"));
    },
    onError: () => {
      toast.error(t("deleteOptionError"));
    },
  });

  const handleAddOption = () => {
    if (!selectedVariantId) {
      toast.error(t("selectVariantFirst"));
      return;
    }
    
    if (!newOptionValue.trim()) {
      toast.error(t("optionValueRequired"));
      return;
    }
    
    if (onAddOption) {
      // Use the provided onAddOption prop if it exists
      onAddOption(newOptionValue)
        .then(() => setNewOptionValue(""))
        .catch((err) => console.error("Error adding option:", err));
    } else {
      // Fall back to the mutation if no prop is provided
      addOptionMutation.mutate({
        variant_id: selectedVariantId,
        option_value: newOptionValue
      });
    }
  };

  const handleAddPresetOption = (value: string) => {
    if (!selectedVariantId) {
      toast.error(t("selectVariantFirst"));
      return;
    }

    if (onAddOption) {
      // Use the provided onAddOption prop if it exists
      onAddOption(value)
        .catch((err) => console.error("Error adding preset option:", err));
    } else {
      // Fall back to the mutation if no prop is provided
      addOptionMutation.mutate({
        variant_id: selectedVariantId,
        option_value: value
      });
    }
  };

  const handleDeleteOption = (optionId: string) => {
    deleteOptionMutation.mutate(optionId);
  };

  if (!selectedVariantId) {
    return (
      <div className="text-center p-4 text-muted-foreground">{t("selectVariantFirst")}</div>
    );
  }

  const existingOptionValues = variantOptions.map(opt => opt.option_value.toLowerCase());
  const filteredCategoryValues = categoryVariantValues.filter(
    val => !existingOptionValues.includes(val.value_name.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Manual option creation */}
      <div>
        <h3 className="text-lg font-medium mb-2">{t("addCustomOption")}</h3>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label htmlFor="new-option">{t("optionValue")}</Label>
            <Input
              id="new-option"
              placeholder={t("enterOptionValue")}
              value={newOptionValue}
              onChange={(e) => setNewOptionValue(e.target.value)}
            />
          </div>
          <Button onClick={handleAddOption} disabled={addOptionMutation.isPending}>
            <Plus className="h-4 w-4 mr-2" />
            {t("add")}
          </Button>
        </div>
      </div>

      {/* Preset option selection */}
      {selectedCategoryVariantId && categoryVariantValues && categoryVariantValues.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">{t("addFromCategoryVariantValues")}</h3>
          {categoryVariantValuesLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : filteredCategoryValues.length === 0 ? (
            <div className="text-muted-foreground">{t("allPresetValuesAdded")}</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredCategoryValues.map((value) => (
                <Button
                  key={value.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddPresetOption(value.value_name)}
                >
                  {value.value_name}
                  <Plus className="ml-2 h-3 w-3" />
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current options */}
      <div>
        <h3 className="text-lg font-medium mb-2">{t("currentOptions")}</h3>
        {optionsLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : variantOptions.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">{t("noOptionsFound")}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("optionValue")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variantOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell>{option.option_value}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteOption(option.id)}
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

export default OptionsTabContent;
