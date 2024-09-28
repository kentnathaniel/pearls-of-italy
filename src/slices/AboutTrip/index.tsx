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
  bgColor: string;
  textColor: string;
  cta?: {
    instruction?: string | null;
    copy: string | null;
    link: string | null;
  };
  className?: HTMLAttributes<HTMLDivElement>["className"];
  icon: typeof IconMapPinFilled;
};

const Highlights = ({
  title,
  highlights,
  bgColor,
  textColor,
  cta,
  className,
  icon,
}: HighlightsProps) => {
  const Icon = icon;

  return (
    <div className={cn("mb-16 grid pb-16 md:grid-cols-[1fr_2fr]", className)}>
      <div className="mb-8 flex flex-col items-center md:items-start">
        <p
          className={cn(
            "text-center text-2xl font-bold md:mb-0 md:text-left",
            textColor
          )}
        >
          {title}
        </p>
        {cta?.instruction && (
          <p className="mt-2 text-sm text-neutral-500">{cta.instruction}</p>
        )}

        {cta?.link && cta?.copy && (
          <Link href={cta.link}>
            <Button
              className={`${bgColor} hover:${bgColor} mt-4 text-white hover:text-white`}
              variant="outline"
              size="lg"
            >
              {cta.copy}
            </Button>
          </Link>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex gap-2">
            <Icon className={cn("h-6 w-6 shrink-0 md:h-8 md:w-8", textColor)} />
            <p className="text-base">
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
      className="relative mx-auto px-8 pt-32 lg:container"
      id="about-section"
    >
      <h1 className="mb-12 text-center text-3xl font-bold md:text-left">
        {slice.primary.title}
      </h1>

      <Highlights
        title="Sightseeing highlights"
        highlights={slice.primary.sightseeing_highlights}
        bgColor="bg-green-700"
        textColor="text-green-700"
        className="border-b-2"
        icon={IconMapPinFilled}
      />
      <Highlights
        title="Travel highlights"
        highlights={slice.primary.travel_highlights}
        bgColor="bg-red-700"
        textColor="text-red-700"
        cta={{
          instruction: slice.primary.travel_cta_description,
          copy: slice.primary.travel_cta,
          link: slice.primary.travel_cta_link,
        }}
        icon={IconCheck}
      />
    </section>
  );
};

export default AboutTrip;
