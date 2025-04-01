
import React from "react";
import { useApp } from "../contexts/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Building2, Car, Utensils, Briefcase } from "lucide-react";

const IndustrySelect = () => {
  const { industry, setIndustry, t } = useApp();

  const industries = [
    { id: "retail", name: t("retail"), icon: Store },
    { id: "real_estate", name: t("real_estate"), icon: Building2 },
    { id: "automotive", name: t("automotive"), icon: Car },
    { id: "restaurant", name: t("restaurant"), icon: Utensils },
    { id: "service", name: t("service"), icon: Briefcase },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("selectIndustry")}</CardTitle>
        <CardDescription>
          Choose the industry template to customize your inventory system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={industry} onValueChange={(value) => setIndustry(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectIndustry")} />
          </SelectTrigger>
          <SelectContent>
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <SelectItem key={ind.id} value={ind.id}>
                  <div className="flex items-center">
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{ind.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default IndustrySelect;
