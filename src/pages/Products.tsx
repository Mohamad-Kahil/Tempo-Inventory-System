
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductForm from "../components/products/ProductForm";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import { fetchProducts, fetchCategories, fetchBrands, saveProduct, deleteProduct } from "../services/ProductsService";
import { Product, ProductStatus } from "@/types/ProductTypes";

const Products = () => {
  const { t } = useApp();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, selectedBrand, selectedStatus],
    queryFn: () => fetchProducts(selectedCategory, selectedBrand, selectedStatus)
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  // Fetch brands
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands
  });

  const filteredProducts = products?.filter(product => 
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("deleteItem") + " " + t("success"));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(t("deleteItem") + " " + t("failed"));
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      const operation = await saveProduct(
        productData, 
        !!editingProduct, 
        editingProduct?.id
      );
      
      setIsFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      if (operation === "update") {
        toast.success(t("editItem") + " " + t("success"));
      } else {
        toast.success(t("addItem") + " " + t("success"));
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(t("saveItem") + " " + t("failed"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">{t("products")}</h1>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            categories={categories}
            brands={brands}
          />
          
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addProduct")}
          </Button>
        </div>
      </div>

      <ProductTable 
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAdd={handleAddProduct}
      />

      <ProductForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        editProduct={editingProduct}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};

export default Products;
