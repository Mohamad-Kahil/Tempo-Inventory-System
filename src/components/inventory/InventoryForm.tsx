
import React, { useState, useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InventoryItemType } from "./InventoryItem";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InventoryFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<InventoryItemType, "id">) => void;
  editItem?: InventoryItemType;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ open, onClose, onSave, editItem }) => {
  const { t } = useApp();
  const [item, setItem] = useState<Omit<InventoryItemType, "id">>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  useEffect(() => {
    if (editItem) {
      const { id, ...rest } = editItem;
      setItem(rest);
    } else {
      setItem({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
      });
    }
  }, [editItem, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editItem ? t("editItem") : t("addItem")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t("description")}</Label>
            <Textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t("price")}</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={item.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">{t("quantity")}</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                step="1"
                min="0"
                value={item.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t("category")}</Label>
            <Input
              id="category"
              name="category"
              value={item.category}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit">
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
