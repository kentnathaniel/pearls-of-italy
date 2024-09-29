"use client";

import type * as prismic from "@prismicio/client";
import {
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  Icon,
  IconArrowRight,
  IconBedFilled,
  IconBus,
  IconCheck,
  IconChevronDown,
  IconHeartHandshake,
  IconProps,
  IconQuestionMark,
  IconToolsKitchen2,
  IconZoomQuestion,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ExperiencesDocumentData } from "../../../prismicio-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Highlights = {
  title: string;
  description: prismic.KeyTextField;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}[];

type ItineraryAccordionProps = {
  data: NonNullable<ItineraryProps["slice"]["primary"]["itinerary_list"][0]>;
  idx: number;
  isOpen: boolean;
  onToggleAccordion: () => void;
};

type ItineraryAccordionHeaderProps = Omit<ItineraryAccordionProps, "idx"> & {
  highlights: Highlights;
  day: number;
};

const ItineraryAccordionHeader = ({
  onToggleAccordion,
  isOpen,
  highlights,
  data,
  day,
}: ItineraryAccordionHeaderProps): JSX.Element => {
  const { illustration, title, location } = data;
  const locations = location?.split(",") ?? [];

  const emphasizedHighlights = highlights.filter(
    (highlight) =>
      ["Arrival Transfer", "Welcome"].includes(highlight.title) &&
      highlight.description
  );

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
          <p className="mb-2 text-sm font-bold text-neutral-500">Day {day}</p>
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

type ItineraryAccodionExperiencesProps =
  ItineraryAccordionProps["data"]["experiences"];

const ItineraryAccodionExperiences = (
  props: ItineraryAccodionExperiencesProps
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

const ItineraryAccordionExperienceItem = ({
  picture,
  iconic,
  title,
  description,
}: NonNullable<ExperiencesDocumentData["experience_list"][0]>): JSX.Element => {
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
        <Badge
          variant="outline"
          className={cn(
            "absolute left-2 top-2 rounded-sm border-0 font-bold",
            iconic ? "bg-orange-950 text-white" : "bg-white text-black"
          )}
        >
          {iconic ? "Iconic Experience" : "Optional Experience"}
        </Badge>
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

const ItineraryAccordion = (props: ItineraryAccordionProps): JSX.Element => {
  const { idx, data, isOpen } = props;

  const {
    accomodation,
    arrival_transfer,
    description,
    experiences,
    illustration,
    included_meals,
    title,
    welcome,
  } = data;

  const day = idx + 1;

  const highlights: Highlights = useMemo(
    () => [
      {
        title: "Arrival Transfer",
        description: arrival_transfer,
        icon: IconBus,
      },
      {
        title: "Welcome",
        description: welcome,
        icon: IconHeartHandshake,
      },
      {
        title: "Accommodation",
        description: accomodation,
        icon: IconBedFilled,
      },
      {
        title: "Included Meals",
        description: included_meals,
        icon: IconToolsKitchen2,
      },
    ],
    [arrival_transfer, accomodation, welcome, included_meals]
  );

  return (
    <div
      key={idx}
      className="relative overflow-hidden border-b md:rounded-md md:border"
    >
      <ItineraryAccordionHeader day={day} highlights={highlights} {...props} />

      <div
        className={cn(
          "overflow-hidden px-4 transition-all duration-500 md:px-8",
          isOpen
            ? "h-auto max-h-[5000px] py-8 opacity-100"
            : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="flex flex-col-reverse gap-8 lg:flex-row">
          <div className="grow">
            <p className="mb-2 text-sm font-bold text-neutral-500">Day {day}</p>
            <div className="mb-8 flex items-center">
              <p className="mr-2 text-2xl font-bold">{title}</p>
            </div>

            <p className="text-base leading-7 tracking-wide">{description}</p>

            <div className="mt-8 grid gap-8 xl:ml-4">
              {highlights.map((v, idx) => (
                <Fragment key={idx}>
                  {!!v.description ? (
                    <div key={idx} className="flex gap-2">
                      <v.icon className="text-primary-500 h-6 w-6 shrink-0" />
                      <div className="xl:flex xl:gap-2">
                        <p className="text-nowrap font-semibold">{v.title}</p>
                        <p>{v.description}</p>
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>

          {isFilled.image(illustration) && (
            <div
              className={cn(
                "relative mx-auto h-[25vh] w-[100%] shrink-0 duration-500 lg:h-auto lg:max-h-[360px] lg:w-[45%] xl:w-[40%]",
                isOpen ? 0 : "-translate-y-full"
              )}
            >
              <PrismicNextImage
                field={illustration}
                fill
                className="pointer-events-none select-none rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <ItineraryAccodionExperiences {...experiences} />
      </div>
    </div>
  );
};

export type ItineraryProps = SliceComponentProps<Content.ItinerarySlice>;

const Itinerary = ({ slice }: ItineraryProps): JSX.Element => {
  const [openItinerary, setOpenItinerary] = useState<number[]>([]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto pt-32 lg:container md:px-4 lg:px-8"
      id="itinerary-section"
    >
      <div className="mb-12 px-4 text-center md:px-0 md:text-left">
        <h1 className="mb-2 text-3xl font-bold">{slice.primary.title}</h1>
        <p className="text-neutral-500">{slice.primary.caption}</p>
      </div>

      <div className="grid md:gap-8">
        {slice.primary.itinerary_list.map((item, idx) => (
          <ItineraryAccordion
            data={item}
            key={idx}
            idx={idx}
            isOpen={openItinerary.includes(idx)}
            onToggleAccordion={() =>
              setOpenItinerary((prev) => _.xor(prev, [idx]))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Itinerary;
