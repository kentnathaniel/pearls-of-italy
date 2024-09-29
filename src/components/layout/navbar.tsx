"use client";

import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import ItalyFlag from "@/assets/italy-flag.png";
import { cn } from "@/lib/utils";

const Navigation = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <nav className={cn("hidden gap-8 font-semibold md:flex", className)}>
      <a href="#home-section">Home</a>
      <a href="#itinerary-section">Itinerary</a>
      <a href="#about-section">About</a>
      <a href="#faq-section">FAQ</a>
    </nav>
  );
};

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setShowHeader(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed z-10 w-full bg-white p-4 shadow-sm transition-all duration-500",
        showHeader || window.scrollY < 40
          ? "translate-y-0"
          : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex items-center justify-between lg:container">
        <div className="relative">
          <div className="absolute h-full w-[100px]">
            <Image
              alt="nav-logo"
              src={ItalyFlag}
              fill
              className="-z-10 opacity-15"
            />
          </div>
          <p className="ml-8 font-display text-xl font-bold tracking-widest [text-shadow:_0_1px_0_rgb(0_0_0_/_50%)] md:text-2xl">
            PEARLS OF ITALY
          </p>
        </div>
        <Navigation />

        <Sheet>
          <SheetTrigger asChild>
            <div className="cursor-pointer rounded-md border border-neutral-200 p-1 md:hidden">
              <IconMenu2 />
            </div>
          </SheetTrigger>
          <SheetContent>
            <Navigation className="flex flex-col" />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export { Navbar };
