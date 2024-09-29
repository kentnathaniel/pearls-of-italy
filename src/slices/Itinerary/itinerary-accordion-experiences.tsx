"use client";

import { useRef } from "react";
import _ from "lodash";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { IconCheck, IconZoomQuestion } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ExperiencesDocumentData } from "../../../prismicio-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ItineraryAccordionProps } from ".";
import { TaglineBadge } from "./tagline-badge";

type ExperienceItem = NonNullable<
  ExperiencesDocumentData["experience_list"][0]
>;

type ItineraryAccordionExperiencesProps =
  ItineraryAccordionProps["data"]["experiences"];

export type ItineraryAccordionExperienceItemProps = ExperienceItem;

const ItineraryAccordionExperiences = (
  props: ItineraryAccordionExperiencesProps
): JSX.Element => {
  if (
    !isFilled.contentRelationship<
      "experiences",
      string,
      ExperiencesDocumentData
    >(props)
  )
    return <></>;

  return (
    <div className="my-12 w-full">
      <p className="mb-8 text-2xl font-bold">
        Included and optional experiences
      </p>

      <Carousel className="overflow-y-visible">
        <CarouselPrevious className="-right-16 -top-16 left-[initial]" />
        <CarouselNext className="-top-16 right-0" />
        <CarouselContent className="-ml-4 overflow-y-visible md:-ml-8">
          {props.data?.experience_list.map((experience, idx) => (
            <ItineraryAccordionExperienceItem key={idx} {...experience} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const ItineraryAccordionExperienceItem = (
  props: ItineraryAccordionExperienceItemProps
): JSX.Element => {
  const { picture, iconic, title, description, tagline } = props;
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isDescriptionClamped =
    descriptionRef?.current &&
    descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;

  return (
    <CarouselItem className="pl-4 md:basis-1/2 md:pl-8 xl:basis-1/3">
      <div className="relative flex h-full flex-col rounded-md border">
        <PrismicNextImage
          alt=""
          field={picture}
          fill={true}
          className="pointer-events-none !relative !h-[200px] !w-full select-none rounded-t-md object-cover"
        />
        <div className="absolute left-2 top-2">
          <TaglineBadge {...props} />
        </div>
        <div className="flex grow flex-col gap-4 p-4">
          <p className="font-bold">{title}</p>
          <p
            className="line-clamp-3 text-sm leading-relaxed"
            ref={descriptionRef}
          >
            {description}
          </p>
          {isDescriptionClamped && (
            <p className="mb-4 w-fit cursor-pointer border-b border-b-red-200 text-sm font-bold hover:border-b-red-500">
              See more
            </p>
          )}
          <p
            className={cn(
              "mt-auto inline-flex items-center gap-2 text-sm font-bold",
              !iconic && "w-full justify-between"
            )}
          >
            {iconic ? (
              <>
                <IconCheck />
                Included With Trip
              </>
            ) : (
              <>
                Additional cost applies
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                      <IconZoomQuestion />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="p-4">
                      <p className="mb-2 text-sm">Optional experiences</p>
                      <p className="text-xs font-normal">
                        Optional experiences are enhancements to your tour
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </p>
        </div>
      </div>
    </CarouselItem>
  );
};

export { ItineraryAccordionExperiences };
