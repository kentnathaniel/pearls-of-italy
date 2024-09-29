import "./globals.css";

import { PrismicPreview } from "@prismicio/next";
import { Manrope, Playfair_Display } from "next/font/google";

import { cn } from "@/lib/utils";
import { repositoryName } from "@/prismicio";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(manrope.variable, playfair.variable)}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
