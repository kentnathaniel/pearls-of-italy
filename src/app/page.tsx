import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ItalyFlag from "@/assets/italy-flag.png";
import Image from "next/image";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  const client = createClient();
  const home = await client.getSingle("page", {
    fetchLinks: "experiences.experience_list",
  });

  return (
    <div>
      <nav className="p-4 shadow-sm">
        <div className="mx-auto flex justify-between lg:container">
          <div className="relative">
            <Image
              alt="nav-logo"
              src={ItalyFlag}
              fill
              className="-z-10 opacity-15"
            />
            <p className="font-display text-2xl font-bold tracking-widest [text-shadow:_0_1px_0_rgb(0_0_0_/_50%)]">
              PEARLS OF ITALY
            </p>
          </div>
          <ul className="flex gap-8 font-semibold">
            <li>
              <a href="#home-section">Home</a>
            </li>
            <li>
              <a href="#itinerary-section">Itinerary</a>
            </li>
            <li>
              <a href="#about-section">About</a>
            </li>
            <li>
              <a href="#faq-section">FAQ</a>
            </li>
          </ul>
        </div>
      </nav>
      <SliceZone slices={home.data.slices} components={components} />;
    </div>
  );
}
