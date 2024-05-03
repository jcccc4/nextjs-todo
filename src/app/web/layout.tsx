import { Button } from "@/components/ui/button";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { CircleUser, Home, Menu, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" min-h-screen w-full ">
      <header className="h-14 border-b border-[#E4E4E7]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 ml-4 mt-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <CircleUser className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-5 w-5" />
                Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      {children}
    </main>
  );
};

export default layout;
