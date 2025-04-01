
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { fetchProductSpecifications, saveProductSpecification, deleteProductSpecification } from "@/services/ProductsService";

interface ProductSpecificationsDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const ProductSpecificationsDialog: React.FC<ProductSpecificationsDialogProps> = ({ open, onClose, productId }) => {
  const { t } = useApp();
  const queryClient = useQueryClient();
  
  // State for new specification
  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");

  // Fetch specifications
  const { data: specifications = [], isLoading } = useQuery({
    queryKey: ["product-specifications", productId],
    queryFn: () => fetchProductSpecifications(productId),
    enabled: open && !!productId,
  });

  // Mutations
  const addSpecMutation = useMutation({
    mutationFn: saveProductSpecification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-specifications", productId] });
      setSpecName("");
      setSpecValue("");
      toast.success(t("specificationCreated"));
    },
    onError: (error) => {
      console.error("Error creating specification:", error);
      toast.error(t("createSpecificationError"));
    },
  });

  const deleteSpecMutation = useMutation({
    mutationFn: deleteProductSpecification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-specifications", productId] });
      toast.success(t("specificationDeleted"));
    },
    onError: (error) => {
      console.error("Error deleting specification:", error);
      toast.error(t("deleteSpecificationError"));
    },
  });

  // Handlers
  const handleAddSpec = () => {
    const trimmedName = specName.trim();
    const trimmedValue = specValue.trim();

    if (!trimmedName || !trimmedValue) {
      toast.error(t("specNameValueRequired"));
      return;
    }
    
    addSpecMutation.mutate({
      product_id: productId,
      spec_name: trimmedName,
      spec_value: trimmedValue
    });
  };

  const handleDeleteSpec = (specId: string) => {
    deleteSpecMutation.mutate(specId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("productSpecifications")}</DialogTitle>
          <DialogDescription>{t("manageProductSpecificationsDescription")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="spec_name">{t("specificationName")}</Label>
              <Input
                id="spec_name"
                placeholder={t("enterSpecName")}
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="spec_value">{t("specificationValue")}</Label>
              <Input
                id="spec_value"
                placeholder={t("enterSpecValue")}
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddSpec} 
            disabled={addSpecMutation.isPending || !specName.trim() || !specValue.trim()} 
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("addSpecification")}
          </Button>
        </div>

        <div className="border-t pt-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : specifications.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">{t("noSpecificationsFound")}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("specificationName")}</TableHead>
                  <TableHead>{t("specificationValue")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specifications.map((spec) => (
                  <TableRow key={spec.id}>
                    <TableCell>{spec.spec_name}</TableCell>
                    <TableCell>{spec.spec_value}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSpec(spec.id)}
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSpecificationsDialog;
