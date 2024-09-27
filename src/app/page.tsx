import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

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
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
    <div>
      <nav className="h-16 p-4 shadow-sm ">
        <div className="container mx-auto flex justify-between ">
          <p className="font-bold text-xl">Pearls of Italy</p>
          <ul className="flex gap-8">
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
