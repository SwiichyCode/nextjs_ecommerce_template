import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Next.js Ecommerce Template",
  description: "A Next.js 14 template for building a modern ecommerce website.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth bg-white antialiased",
        inter.variable,
      )}
    >
      <body className="flex h-full flex-col">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
