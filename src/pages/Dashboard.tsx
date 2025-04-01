
import React from "react";
import { useApp } from "../contexts/AppContext";
import IndustrySelect from "../components/IndustrySelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Receipt, Users } from "lucide-react";

const Dashboard = () => {
  const { t, industry } = useApp();

  // Mock stats for demonstration
  const stats = [
    {
      title: t("inventory"),
      value: "124",
      icon: Package,
      description: "items in stock",
    },
    {
      title: t("sales"),
      value: "$12,453",
      icon: ShoppingCart,
      description: "in last 30 days",
    },
    {
      title: t("invoices"),
      value: "23",
      icon: Receipt,
      description: "pending",
    },
    {
      title: t("customers"),
      value: "45",
      icon: Users,
      description: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
      </div>

      {/* Industry selector */}
      <div className="flex justify-center my-8">
        <IndustrySelect />
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
