import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/sessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
