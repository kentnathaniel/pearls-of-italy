"use client";

import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { IconCheck, IconZoomQuestion } from "@tabler/icons-react";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { ExperiencesDocumentData } from "../../../prismicio-types";

import { TaglineBadge } from "./tagline-badge";

import { ItineraryAccordionProps } from ".";

type ExperienceItem = NonNullable<
  ExperiencesDocumentData["experience_list"][0]
>;

type ItineraryAccordionExperiencesProps =
  ItineraryAccordionProps["data"]["experiences"];

export type ItineraryAccordionExperienceItemProps = ExperienceItem;

const SeeMoreDialog = (
  props: ItineraryAccordionExperienceItemProps
): JSX.Element => {
  const { description, picture, iconic, title, adult_pricing = 0 } = props;

  return (
    <Dialog>
      <DialogTrigger>
        <p className="mb-4 w-fit cursor-pointer border-b border-b-red-200 text-sm font-bold hover:border-b-red-500">
          See more
        </p>
      </DialogTrigger>
      <DialogContent className="!container max-h-screen overflow-y-auto lg:!max-w-[90vw] lg:!px-24">
        <DialogHeader className="items-center text-2xl font-extrabold md:items-start">
          Tour Highlights
        </DialogHeader>
        <DialogDescription className="-mt-4 flex flex-col items-center gap-2 text-lg md:flex-row">
          {title}
          <TaglineBadge className={cn(!iconic && "border")} {...props} />
        </DialogDescription>
        <div className="relative mx-auto mb-2 h-[30vh] w-full max-w-screen-md md:h-[50vh]">
          <PrismicNextImage
            alt=""
            field={picture}
            fill
            className="pointer-events-none select-none rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <div>
            <p className="text-xl font-bold">
              {iconic ? "Highlight Details" : "Experience Info"}
            </p>
            <p className="tracking-wide">{description}</p>
          </div>
          {!iconic && (
            <div className="w-full shrink-0 lg:w-[40%]">
              <p className="mb-4 text-xl font-bold">Pricing Info</p>
              <div>
                <p className="font-bold">Adults</p>
                <p className="text-xl font-bold">
                  € {adult_pricing?.toFixed(2) ?? "-"}
                </p>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-lg font-bold">How to book?</p>
                <p>
                  Optional Experiences are enhancements to your tour and can be
                  booked through your Travel Director while on tour.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
        <CarouselPrevious className="-top-12 left-[initial] right-12" />
        <CarouselNext className="-top-12 right-0" />
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
  const { picture, iconic, title, description } = props;
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
          {(isDescriptionClamped || !iconic) && <SeeMoreDialog {...props} />}
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
