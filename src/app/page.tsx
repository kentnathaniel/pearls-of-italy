import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";

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
  const client = createClient();
  const home = await client.getSingle("page", {
    fetchLinks: "experiences.experience_list",
  });

  return (
    <div>
      <Navbar />
      <SliceZone slices={home.data.slices} components={components} />;
    </div>
  );
}
