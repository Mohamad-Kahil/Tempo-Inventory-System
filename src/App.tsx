
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

// Placeholder pages
const Sales = () => <div>Sales Page</div>;
const Invoices = () => <div>Invoices Page</div>;
const Customers = () => <div>Customers Page</div>;
const Settings = () => <div>Settings Page</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/sales" element={<Layout><Sales /></Layout>} />
            <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
            <Route path="/customers" element={<Layout><Customers /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
