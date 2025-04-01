
// Barrel file to re-export all product services

// Product Query Services
export { 
  fetchProducts, 
  fetchCategories, 
  fetchBrands 
} from './products/ProductQueryService';

// Product CRUD Services
export { 
  saveProduct, 
  deleteProduct 
} from './products/ProductCrudService';

// Product Variant Services
export { 
  fetchProductVariants,
  saveProductVariant,
  deleteProductVariant,
  fetchVariantOptions,
  saveVariantOption,
  deleteVariantOption
} from './products/ProductVariantService';

// Product Feature Services
export {
  fetchProductFeatures,
  saveProductFeature,
  deleteProductFeature
} from './products/ProductFeatureService';

// Product Specification Services
export {
  fetchProductSpecifications,
  saveProductSpecification,
  deleteProductSpecification
} from './products/ProductSpecificationService';

// Product Media Services
export {
  fetchProductMedia,
  saveProductMedia,
  updateProductMedia,
  deleteProductMedia,
  setMediaAsPrimary
} from './products/ProductMediaService';

// Product Category Variant Services
export {
  fetchCategoryVariants,
  fetchCategoryVariantValues,
  saveCategoryVariantValue,
  deleteCategoryVariantValue
} from './products/ProductCategoryVariantService';
