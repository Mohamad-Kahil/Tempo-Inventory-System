
import React, { createContext, useContext, useEffect, useState } from "react";

type Direction = "ltr" | "rtl";
type Language = "en" | "ar";
type Theme = "dark" | "light";
type Industry = "retail" | "real_estate" | "automotive" | "restaurant" | "service";
type Country = "us" | "ae" | "sa" | "uk" | "eg";
type Currency = "USD" | "AED" | "SAR" | "GBP" | "EGP";

interface AppContextType {
  direction: Direction;
  language: Language;
  theme: Theme;
  industry: Industry;
  country: Country;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setIndustry: (industry: Industry) => void;
  setCountry: (country: Country) => void;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory",
    sales: "Sales",
    invoices: "Invoices",
    customers: "Customers",
    settings: "Settings",
    logout: "Logout",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    addItem: "Add Item",
    editItem: "Edit Item",
    deleteItem: "Delete Item",
    name: "Name",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    category: "Category",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
    retail: "Retail",
    real_estate: "Real Estate",
    automotive: "Automotive",
    restaurant: "Restaurant",
    service: "Service",
    selectIndustry: "Select Industry",
    products: "Products",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    productName: "Product Name",
    sku: "SKU",
    currency: "Currency",
    status: "Status",
    active: "Active",
    draft: "Draft",
    discontinued: "Discontinued",
    search: "Search",
    filters: "Filters",
    brand: "Brand",
    categories: "Categories",
    brands: "Brands",
    allCategories: "All Categories",
    allBrands: "All Brands",
    allStatuses: "All Statuses",
    selectStatus: "Select Status",
    selectCategory: "Select Category",
    selectBrand: "Select Brand",
    selectCurrency: "Select Currency",
    none: "None",
    noProducts: "No products found",
    success: "Successful",
    failed: "Failed",
    country: "Country",
    unitedStates: "United States",
    unitedArabEmirates: "United Arab Emirates",
    saudiArabia: "Saudi Arabia",
    unitedKingdom: "United Kingdom",
    egypt: "Egypt",
    delete: "Delete",
    edit: "Edit",
  },
  ar: {
    dashboard: "لوحة التحكم",
    inventory: "المخزون",
    sales: "المبيعات",
    invoices: "الفواتير",
    customers: "العملاء",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    addItem: "إضافة عنصر",
    editItem: "تعديل عنصر",
    deleteItem: "حذف عنصر",
    name: "الاسم",
    description: "الوصف",
    price: "السعر",
    quantity: "الكمية",
    category: "الفئة",
    actions: "الإجراءات",
    save: "حفظ",
    cancel: "إلغاء",
    retail: "التجزئة",
    real_estate: "العقارات",
    automotive: "السيارات",
    restaurant: "المطاعم",
    service: "الخدمات",
    selectIndustry: "اختر الصناعة",
    products: "المنتجات",
    addProduct: "إضافة منتج",
    editProduct: "تعديل منتج",
    deleteProduct: "حذف منتج",
    productName: "اسم المنتج",
    sku: "رمز المنتج",
    currency: "العملة",
    status: "الحالة",
    active: "نشط",
    draft: "مسودة",
    discontinued: "متوقف",
    search: "بحث",
    filters: "تصفية",
    brand: "العلامة التجارية",
    categories: "الفئات",
    brands: "العلامات التجارية",
    allCategories: "جميع الفئات",
    allBrands: "جميع العلامات التجارية",
    allStatuses: "جميع الحالات",
    selectStatus: "اختر الحالة",
    selectCategory: "اختر الفئة",
    selectBrand: "اختر العلامة التجارية",
    selectCurrency: "اختر العملة",
    none: "لا شيء",
    noProducts: "لم يتم العثور على منتجات",
    success: "تم بنجاح",
    failed: "فشل",
    country: "البلد",
    unitedStates: "الولايات المتحدة",
    unitedArabEmirates: "الإمارات العربية المتحدة",
    saudiArabia: "المملكة العربية السعودية",
    unitedKingdom: "المملكة المتحدة",
    egypt: "مصر",
    delete: "حذف",
    edit: "تعديل",
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [direction, setDirection] = useState<Direction>("ltr");
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [industry, setIndustryState] = useState<Industry>("retail");
  const [country, setCountryState] = useState<Country>("us");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // Function to set language and update direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", lang);
  };

  // Function to set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Function to set industry
  const setIndustry = (newIndustry: Industry) => {
    setIndustryState(newIndustry);
    localStorage.setItem("industry", newIndustry);
  };

  // Function to set country
  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    localStorage.setItem("country", newCountry);
    
    // Automatically update currency based on country if needed
    switch (newCountry) {
      case "us":
        setCurrency("USD");
        break;
      case "ae":
        setCurrency("AED");
        break;
      case "sa":
        setCurrency("SAR");
        break;
      case "uk":
        setCurrency("GBP");
        break;
      case "eg":
        setCurrency("EGP");
        break;
      default:
        break;
    }
  };

  // Function to set currency
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  // Initialize settings from localStorage
  useEffect(() => {
    // Set language from localStorage or default to English
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Set theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") as Theme;
    setTheme(savedTheme || "dark");

    // Set industry from localStorage or default to retail
    const savedIndustry = localStorage.getItem("industry") as Industry;
    if (savedIndustry) {
      setIndustry(savedIndustry);
    }

    // Set country from localStorage or default to US
    const savedCountry = localStorage.getItem("country") as Country;
    if (savedCountry) {
      setCountryState(savedCountry);
    }

    // Set currency from localStorage or default based on country
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  // Set direction attribute on body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  return (
    <AppContext.Provider
      value={{
        direction,
        language,
        theme,
        industry,
        country,
        currency,
        setLanguage,
        setTheme,
        setIndustry,
        setCountry,
        setCurrency,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
