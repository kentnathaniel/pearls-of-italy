"use client";

import type * as prismic from "@prismicio/client";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  Icon,
  IconBedFilled,
  IconBus,
  IconHeartHandshake,
  IconProps,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import {
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
  useMemo,
} from "react";

import { ExpandAllButton } from "@/components/ui/expand-all-button";

import { useAccordion } from "@/lib/use-accordion";
import { cn } from "@/lib/utils";

import { ItineraryAccordionExperiences } from "./itinerary-accordion-experiences";
import { ItineraryAccordionHeader } from "./itinerary-accordion-header";

export type ItineraryProps = SliceComponentProps<Content.ItinerarySlice>;

export type ItineraryAccordionProps = {
  data: NonNullable<ItineraryProps["slice"]["primary"]["itinerary_list"][0]>;
  idx: number;
  isOpen: boolean;
  onToggleAccordion: () => void;
};

export type Highlights = {
  title: string;
  description: prismic.KeyTextField;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  condition?: string | null;
}[];

const ItineraryAccordion = (props: ItineraryAccordionProps): JSX.Element => {
  const { idx, data, isOpen } = props;

  const {
    accomodation,
    departure_transfer,
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
        title: "Departure Transfer",
        description: departure_transfer,
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
        condition: accomodation?.includes("/")
          ? "Your hotel will be dependent on your departure date"
          : null,
      },
      {
        title: "Included Meals",
        description: included_meals,
        icon: IconToolsKitchen2,
      },
    ],
    [
      arrival_transfer,
      accomodation,
      welcome,
      included_meals,
      departure_transfer,
    ]
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
              {highlights.map((highlight, idx) => (
                <Fragment key={idx}>
                  {!!highlight.description ? (
                    <div key={idx} className="flex gap-2">
                      <highlight.icon className="text-primary-500 h-6 w-6 shrink-0" />
                      <div>
                        <div className="xl:flex xl:gap-2">
                          <p className="text-nowrap font-semibold">
                            {highlight.title}
                          </p>
                          <p>{highlight.description}</p>
                        </div>
                        {!!highlight.condition && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {highlight.condition}
                          </p>
                        )}
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
                alt=""
                field={illustration}
                fill
                className="pointer-events-none select-none rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <ItineraryAccordionExperiences {...experiences} />
      </div>
    </div>
  );
};

const Itinerary = ({ slice }: ItineraryProps): JSX.Element => {
  const { isAllOpen, onToggleAccordion, onToggleAllAccordion, isOpen } =
    useAccordion({
      size: slice.primary.itinerary_list.length,
    });

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

      <ExpandAllButton
        isAllOpen={isAllOpen}
        onToggle={onToggleAllAccordion}
        className="mr-4 md:mr-0"
        text="all days"
      />
      <div className="grid md:gap-8">
        {slice.primary.itinerary_list.map((item, idx) => (
          <ItineraryAccordion
            data={item}
            key={idx}
            idx={idx}
            isOpen={isOpen(idx)}
            onToggleAccordion={() => onToggleAccordion(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Itinerary;
