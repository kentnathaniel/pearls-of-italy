"use client";

import { useMemo } from "react";
import _ from "lodash";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ExperiencesDocumentData } from "../../../prismicio-types";

import { TaglineBadge } from "./tagline-badge";
import { Highlights, ItineraryAccordionProps } from ".";

type ItineraryAccordionHeaderProps = Omit<ItineraryAccordionProps, "idx"> & {
  highlights: Highlights;
  day: number;
  data: ItineraryAccordionProps["data"];
};

const ItineraryAccordionHeader = ({
  onToggleAccordion,
  isOpen,
  highlights,
  data,
  day,
}: ItineraryAccordionHeaderProps): JSX.Element => {
  const { illustration, title, location, experiences } = data;
  const locations = location?.split(",") ?? [];

  const emphasizedHighlights = highlights.filter(
    (highlight) =>
      ["Arrival Transfer", "Welcome"].includes(highlight.title) &&
      highlight.description
  );

  const uniqueExperience = useMemo(() => {
    if (
      !isFilled.contentRelationship<
        "experiences",
        string,
        ExperiencesDocumentData
      >(experiences)
    ) {
      return null;
    }

    return experiences.data?.experience_list.find((v) => !!v.tagline);
  }, [experiences]);

  return (
    <div
      className="z-10 flex w-full cursor-pointer"
      onClick={onToggleAccordion}
    >
      <div
        className={cn(
          "hidden shrink-0 transition-all duration-500 md:block",
          isOpen ? "w-0 opacity-0" : "w-[200px] opacity-100"
        )}
      >
        <PrismicNextImage
          alt=""
          field={illustration}
          fill={true}
          className="pointer-events-none !relative !h-full !w-[200px] select-none object-cover"
        />
      </div>

      <div
        className={cn(
          "flex w-full p-4 transition-all duration-500 lg:p-8",
          isOpen ? "bg-neutral-100" : "bg-white"
        )}
      >
        <div className="w-full">
          <div className="mb-2 flex items-center gap-4">
            <p className="text-sm font-bold text-neutral-500">Day {day} </p>
            {!!uniqueExperience && <TaglineBadge {...uniqueExperience} />}
          </div>
          <div className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-0">
            <p className="mb-4 mr-2 text-base font-bold md:text-lg lg:mb-0">
              {title}
            </p>
            <div className="flex flex-wrap gap-1 text-neutral-500">
              {locations.map((v, idx) => (
                <p key={idx} className="inline-flex items-center text-sm">
                  {v}
                  {idx < locations.length - 1 && (
                    <IconArrowRight className="ml-1 h-4 w-4" />
                  )}
                </p>
              ))}
            </div>
          </div>
          {emphasizedHighlights.length > 0 && (
            <div className="mt-8 flex gap-4">
              {emphasizedHighlights.map((highlight, idx) => (
                <p
                  key={idx}
                  className="inline-flex items-center gap-2 text-sm text-neutral-500"
                >
                  <highlight.icon className="h-6 w-6 text-neutral-500" />
                  {highlight.title}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center">
          <p className="mr-2 hidden lg:block">
            {isOpen ? "See less" : "See more"}
          </p>
          <IconChevronDown
            className={cn(
              "transition-all duration-500",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { ItineraryAccordionHeader };
