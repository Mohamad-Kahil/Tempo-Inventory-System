
import React from "react";
import { useApp } from "../../contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

export interface InventoryItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface InventoryItemProps {
  item: InventoryItemType;
  onEdit: (item: InventoryItemType) => void;
  onDelete: (id: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onEdit, onDelete }) => {
  const { t } = useApp();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{t("price")}:</span> ${item.price.toFixed(2)}
              </p>
              <p className="text-sm">
                <span className="font-medium">{t("quantity")}:</span> {item.quantity}
              </p>
              <p className="text-sm">
                <span className="font-medium">{t("category")}:</span> {item.category}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:text-destructive" 
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryItem;
