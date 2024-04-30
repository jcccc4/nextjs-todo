import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import {
  Badge,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid min-h-screen w-full ">
      {children}
    </main>
  );
};

export default layout;
