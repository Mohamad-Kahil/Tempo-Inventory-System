
import { Product, ProductStatus, ProductType, Category, Brand } from "@/types/ProductTypes";

export interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  editProduct?: Product;
  categories: Category[];
  brands: Brand[];
}

export const currencies = ["USD", "EUR", "GBP", "AED", "SAR", "JPY", "CNY"];

export interface ProductFormTabsProps {
  product: Partial<Product>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  categories: Category[];
  brands: Brand[];
}
