import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { IconCheck, IconMapPinFilled } from "@tabler/icons-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

export type AboutTripProps = SliceComponentProps<Content.AboutTripSlice>;

type HighlightsProps = {
  highlights: AboutTripProps["slice"]["primary"]["sightseeing_highlights"];
  title: string;
  color: string;
  cta?: {
    instruction?: string | null;
    copy: string | null;
    link: string | null;
  };
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

const Highlights = ({
  title,
  highlights,
  color,
  cta,
  className,
}: HighlightsProps) => {
  const bgColor = `bg-${color}`;
  const textColor = `text-${color}`;

  return (
    <div className={cn("grid grid-cols-[1fr_2fr] pb-16 mb-16", className)}>
      <div>
        <p className={cn("font-bold text-2xl", textColor)}>{title}</p>
        {cta?.instruction && (
          <p className="text-sm text-neutral-500 mt-2">{cta.instruction}</p>
        )}

        {cta?.link && cta?.copy && (
          <Link href={cta.link}>
            <Button
              className={`${bgColor} hover:${bgColor}/80 text-white mt-4 hover:text-white`}
              variant="outline"
              size="lg"
            >
              {cta.copy}
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex gap-2">
            <IconMapPinFilled className={cn("shrink-0 w-8 h-8", textColor)} />
            <p>
              <strong>{highlight.title}</strong> {highlight.detail}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutTrip = ({ slice }: AboutTripProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mt-32 relative mx-auto px-8"
    >
      <h1 className="text-3xl font-bold mb-12">{slice.primary.title}</h1>

      <Highlights
        title="Sightseeing highlights"
        highlights={slice.primary.sightseeing_highlights}
        color="green-700"
        className="border-b-2"
      />
      <Highlights
        title="Travel highlights"
        highlights={slice.primary.travel_highlights}
        color="red-700"
        cta={{
          instruction: slice.primary.travel_cta_description,
          copy: slice.primary.travel_cta,
          link: slice.primary.travel_cta_link,
        }}
      />
    </section>
  );
};

export default AboutTrip;
