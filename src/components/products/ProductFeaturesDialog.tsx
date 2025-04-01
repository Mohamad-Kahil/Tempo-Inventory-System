
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { ProductFeature } from "@/types/ProductTypes";
import { fetchProductFeatures, saveProductFeature, deleteProductFeature } from "@/services/ProductsService";

interface ProductFeaturesDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

interface NewFeatureForm {
  feature_name: string;
  feature_value: string;
  feature_description: string;
}

const ProductFeaturesDialog: React.FC<ProductFeaturesDialogProps> = ({ open, onClose, productId }) => {
  const { t } = useApp();
  const queryClient = useQueryClient();
  
  // Initial form state
  const initialForm: NewFeatureForm = {
    feature_name: "",
    feature_value: "",
    feature_description: ""
  };
  
  // State for new feature
  const [form, setForm] = useState<NewFeatureForm>(initialForm);

  // Fetch features
  const { data: features = [], isLoading } = useQuery({
    queryKey: ["product-features", productId],
    queryFn: () => fetchProductFeatures(productId),
    enabled: open && !!productId,
  });

  // Mutations
  const addFeatureMutation = useMutation({
    mutationFn: saveProductFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-features", productId] });
      setForm(initialForm);
      toast.success(t("featureCreated"));
    },
    onError: () => {
      toast.error(t("createFeatureError"));
    },
  });

  const updateFeatureMutation = useMutation({
    mutationFn: saveProductFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-features", productId] });
      toast.success(t("featureUpdated"));
    },
    onError: () => {
      toast.error(t("updateFeatureError"));
    },
  });

  const deleteFeatureMutation = useMutation({
    mutationFn: deleteProductFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-features", productId] });
      toast.success(t("featureDeleted"));
    },
    onError: () => {
      toast.error(t("deleteFeatureError"));
    },
  });

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (!form.feature_name.trim() || !form.feature_value.trim()) {
      toast.error(t("featureNameValueRequired"));
      return;
    }
    
    addFeatureMutation.mutate({
      product_id: productId,
      feature_name: form.feature_name,
      feature_value: form.feature_value,
      feature_description: form.feature_description || null,
      display_order: features.length
    });
  };

  const handleDeleteFeature = (featureId: string) => {
    deleteFeatureMutation.mutate(featureId);
  };

  const handleMoveFeature = (feature: ProductFeature, direction: 'up' | 'down') => {
    const currentIndex = features.findIndex(f => f.id === feature.id);
    
    if ((direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === features.length - 1)) {
      return;
    }
    
    const newDisplayOrder = direction === 'up' 
      ? features[currentIndex - 1].display_order 
      : features[currentIndex + 1].display_order;
    
    const otherFeature = direction === 'up' 
      ? features[currentIndex - 1] 
      : features[currentIndex + 1];
    
    // Update the current feature
    updateFeatureMutation.mutate({
      ...feature,
      display_order: newDisplayOrder
    });
    
    // Update the other feature
    updateFeatureMutation.mutate({
      ...otherFeature,
      display_order: feature.display_order
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("productFeatures")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="feature_name">{t("featureName")}</Label>
              <Input
                id="feature_name"
                name="feature_name"
                placeholder={t("enterFeatureName")}
                value={form.feature_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="feature_value">{t("featureValue")}</Label>
              <Input
                id="feature_value"
                name="feature_value"
                placeholder={t("enterFeatureValue")}
                value={form.feature_value}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="feature_description">{t("featureDescription")}</Label>
            <Textarea
              id="feature_description"
              name="feature_description"
              placeholder={t("enterFeatureDescription")}
              value={form.feature_description}
              onChange={handleInputChange}
              rows={2}
            />
          </div>
          <Button onClick={handleAddFeature} disabled={addFeatureMutation.isPending} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {t("addFeature")}
          </Button>
        </div>

        <div className="border-t pt-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : features.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">{t("noFeaturesFound")}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("order")}</TableHead>
                  <TableHead>{t("featureName")}</TableHead>
                  <TableHead>{t("featureValue")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("description")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature, index) => (
                  <TableRow key={feature.id}>
                    <TableCell>{feature.display_order !== null ? feature.display_order : index + 1}</TableCell>
                    <TableCell>{feature.feature_name}</TableCell>
                    <TableCell>{feature.feature_value}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {feature.feature_description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveFeature(feature, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveFeature(feature, 'down')}
                          disabled={index === features.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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

export default ProductFeaturesDialog;
