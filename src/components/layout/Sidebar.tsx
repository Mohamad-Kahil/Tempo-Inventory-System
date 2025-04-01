
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Receipt,
  Users,
  Settings,
  LogOut,
  Box
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { t } = useApp();
  const location = useLocation();

  // Sidebar navigation items
  const navItems = [
    { name: t("dashboard"), icon: LayoutDashboard, path: "/" },
    { name: t("inventory"), icon: Package, path: "/inventory" },
    { name: t("products"), icon: Box, path: "/products" },
    { name: t("sales"), icon: ShoppingCart, path: "/sales" },
    { name: t("invoices"), icon: Receipt, path: "/invoices" },
    { name: t("customers"), icon: Users, path: "/customers" },
    { name: t("settings"), icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="bg-sidebar w-64 h-screen sticky top-0 flex flex-col border-r border-sidebar-border py-6">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold text-white">EcoInventory</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="me-3 h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="px-3 mt-6">
        <button
          className="flex w-full items-center px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="me-3 h-5 w-5" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
