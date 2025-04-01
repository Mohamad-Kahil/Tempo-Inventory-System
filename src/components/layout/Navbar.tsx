
import React from "react";
import { useApp } from "../../contexts/AppContext";
import { Moon, Sun, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { theme, setTheme, language, setLanguage, t } = useApp();

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between">
      <div></div>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={theme === "dark" ? t("lightMode") : t("darkMode")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en")}>
              {t("english")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("ar")}>
              {t("arabic")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
