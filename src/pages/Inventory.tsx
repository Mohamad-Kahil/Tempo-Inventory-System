
import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import InventoryItem, { InventoryItemType } from "../components/inventory/InventoryItem";
import InventoryForm from "../components/inventory/InventoryForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

const Inventory = () => {
  const { t, industry } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItemType | undefined>(undefined);
  
  // Mock inventory data (would come from Supabase in real app)
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([
    {
      id: "1",
      name: "Sample Product",
      description: "This is a sample product description.",
      price: 29.99,
      quantity: 50,
      category: "Electronics",
    },
    {
      id: "2",
      name: "Another Product",
      description: "Description for another product.",
      price: 19.99,
      quantity: 30,
      category: "Clothing",
    },
  ]);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: InventoryItemType) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setInventoryItems(items => items.filter(item => item.id !== id));
    toast.success(t("deleteItem") + " " + t("success"));
  };

  const handleSaveItem = (itemData: Omit<InventoryItemType, "id">) => {
    if (editingItem) {
      // Update existing item
      setInventoryItems(items =>
        items.map(item =>
          item.id === editingItem.id ? { ...itemData, id: item.id } : item
        )
      );
      toast.success(t("editItem") + " " + t("success"));
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: Math.random().toString(36).substring(2, 9),
      };
      setInventoryItems(items => [...items, newItem]);
      toast.success(t("addItem") + " " + t("success"));
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">{t("inventory")}</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`${t("search")}...`}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addItem")}
          </Button>
        </div>
      </div>

      {inventoryItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">{t("noItems")}</p>
          <Button onClick={handleAddItem} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            {t("addItem")}
          </Button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">{t("noSearchResults")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}

      <InventoryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveItem}
        editItem={editingItem}
      />
    </div>
  );
};

export default Inventory;
