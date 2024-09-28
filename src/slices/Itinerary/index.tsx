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
      className="flex w-full border-b cursor-pointer z-10"
      onClick={onToggleAccordion}
    >
      <div
        className={cn(
          "shrink-0 transition-all duration-500",
          isOpen ? "w-0 opacity-0" : "w-[200px] opacity-100"
        )}
      >
        <PrismicNextImage
          alt=""
          field={illustration}
          fill={true}
          className="pointer-events-none select-none object-cover !w-[200px] !h-full !relative"
        />
      </div>

      <div
        className={cn(
          "flex p-8 w-full transition-all duration-500",
          isOpen ? "bg-neutral-100" : "bg-white"
        )}
      >
        <div className="w-full">
          <p className="font-bold mb-2 text-sm text-neutral-500">Day {day}</p>
          <div className="flex items-center mb-8">
            <p className="font-bold text-xl mr-2">{title}</p>
            <div className="flex text-neutral-500 gap-1">
              {locations.map((v, idx) => (
                <p key={idx} className="inline-flex items-center">
                  {v}
                  {idx < locations.length - 1 && (
                    <IconArrowRight className="w-4 h-4 ml-1" />
                  )}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {emphasizedHighlights.map((highlight, idx) => (
              <p key={idx} className="gap-2 inline-flex text-neutral-500">
                <highlight.icon className="text-neutral-500" />
                {highlight.title}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <p className="mr-2">{isOpen ? "See less" : "See more"}</p>
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
    <div className="w-full my-12">
      <p className="mb-8 font-bold text-2xl">
        Included and optional experiences
      </p>

      <Carousel className="overflow-y-visible">
        <CarouselPrevious className="-top-16 left-[initial] -right-16" />
        <CarouselNext className="-top-16 right-0" />
        <CarouselContent className="-ml-4 md:-ml-8 overflow-y-visible">
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
    <CarouselItem className="basis-1/3 pl-4 md:pl-8">
      <div className="border h-full rounded-md flex flex-col relative">
        <PrismicNextImage
          alt=""
          field={picture}
          fill={true}
          className="pointer-events-none select-none object-cover !h-[200px] !w-full !relative rounded-t-md"
        />
        <Badge
          variant="outline"
          className={cn(
            "absolute top-2 left-2 rounded-sm font-bold border-0",
            iconic ? "bg-orange-950 text-white" : "bg-white text-black"
          )}
        >
          {iconic ? "Iconic Experience" : "Optional Experience"}
        </Badge>
        <div className="flex flex-col grow p-4 gap-4">
          <p className="font-bold">{title}</p>
          <p
            className="text-sm line-clamp-3 leading-relaxed"
            ref={descriptionRef}
          >
            {description}
          </p>
          {isDescriptionClamped && (
            <p className="mb-4 text-sm font-bold border-b border-b-red-200 w-fit cursor-pointer hover:border-b-red-500">
              See more
            </p>
          )}
          <p
            className={cn(
              "mt-auto text-sm inline-flex gap-2 items-center font-bold",
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
                      <p className="text-sm mb-2">Optional experiences</p>
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
    <div key={idx} className="rounded-md border overflow-hidden relative">
      <ItineraryAccordionHeader day={day} highlights={highlights} {...props} />

      <div
        className={cn(
          "px-8 transition-all duration-500 overflow-hidden",
          isOpen
            ? "h-auto py-8 opacity-100 max-h-[5000px]"
            : "py-0 opacity-0 max-h-0"
        )}
      >
        <div className="flex gap-8">
          <div className="grow">
            <p className="font-bold mb-2 text-sm text-neutral-500">Day {day}</p>
            <div className="flex items-center mb-8">
              <p className="font-bold text-2xl mr-2">{title}</p>
            </div>

            <p>{description}</p>

            <div className="grid gap-8 mt-8 ml-4">
              {highlights.map((v, idx) => (
                <Fragment key={idx}>
                  {!!v.description ? (
                    <div key={idx} className="flex gap-2">
                      <v.icon className="h-6 w-6 text-primary-500" />
                      <p className="font-semibold text-nowrap">{v.title}</p>
                      <p>{v.description}</p>
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>

          {isFilled.image(illustration) && (
            <div
              className={cn(
                "w-[560px] shrink-0 h-fit duration-500 ",
                isOpen ? 0 : "-translate-y-full"
              )}
            >
              <PrismicNextImage
                alt=""
                field={illustration}
                fill={true}
                width={560}
                height={320}
                className="pointer-events-none select-none object-cover !w-full !relative rounded-md"
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
      className="container pt-32 relative mx-auto px-8"
      id="itinerary-section"
    >
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">{slice.primary.title}</h1>
        <p className="text-neutral-500">{slice.primary.caption}</p>
      </div>

      <div className="grid gap-8">
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
