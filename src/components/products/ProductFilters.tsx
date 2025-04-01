
import React from "react";
import { useApp } from "@/contexts/AppContext";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Brand, ProductStatus } from "@/types/ProductTypes";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brandId: string | null) => void;
  selectedStatus: ProductStatus | null;
  setSelectedStatus: (status: ProductStatus | null) => void;
  categories: Category[];
  brands: Brand[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedStatus,
  setSelectedStatus,
  categories,
  brands,
}) => {
  const { t } = useApp();

  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`${t("search")}...`}
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t("filters")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2">
            <p className="text-xs font-medium mb-2">{t("categories")}</p>
            <Select 
              value={selectedCategory || "null"} 
              onValueChange={(value) => setSelectedCategory(value === "null" ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("allCategories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">{t("allCategories")}</SelectItem>
                {categories?.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-2">
            <p className="text-xs font-medium mb-2">{t("brands")}</p>
            <Select 
              value={selectedBrand || "null"} 
              onValueChange={(value) => setSelectedBrand(value === "null" ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("allBrands")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">{t("allBrands")}</SelectItem>
                {brands?.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-2">
            <p className="text-xs font-medium mb-2">{t("status")}</p>
            <Select 
              value={selectedStatus || "null"} 
              onValueChange={(value) => {
                setSelectedStatus(value === "null" ? null : value as ProductStatus);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("allStatuses")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">{t("allStatuses")}</SelectItem>
                <SelectItem value="active">{t("active")}</SelectItem>
                <SelectItem value="inactive">{t("inactive")}</SelectItem>
                <SelectItem value="archived">{t("archived")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProductFilters;
