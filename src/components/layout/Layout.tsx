
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useApp } from "../../contexts/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useApp();

  return (
    <div className={`flex min-h-screen bg-background ${direction === "rtl" ? "rtl" : "ltr"}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
