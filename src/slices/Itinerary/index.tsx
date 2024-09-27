"use client";

import { Fragment, useCallback, useState } from "react";
import _ from "lodash";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  IconArrowRight,
  IconBedFilled,
  IconBus,
  IconChevronDown,
  IconHeartHandshake,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type ItineraryProps = SliceComponentProps<Content.ItinerarySlice>;

const Itinerary = ({ slice }: ItineraryProps): JSX.Element => {
  const [openItinerary, setOpenItinerary] = useState<number[]>([]);

  const getHighlights = useCallback(
    (list: (typeof slice.primary.itinerary_list)[0]) => [
      {
        title: "Arrival Transfer",
        description: list?.arrival_transfer,
        icon: IconBus,
      },
      {
        title: "Welcome",
        description: list?.welcome,
        icon: IconHeartHandshake,
      },
      {
        title: "Accommodation",
        description: list?.accomodation,
        icon: IconBedFilled,
      },
      {
        title: "Included Meals",
        description: list?.included_meals,
        icon: IconToolsKitchen2,
      },
    ],
    [slice]
  );

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
        {slice.primary.itinerary_list.map((list, idx) => {
          const day = idx + 1;
          const locations = list.location?.split(",") ?? [];

          const highlights = getHighlights(list);
          const emphasizedHighlights = highlights.filter(
            (highlight) =>
              ["Arrival Transfer", "Welcome"].includes(highlight.title) &&
              highlight.description
          );

          const isOpen = openItinerary.includes(idx);

          return (
            <div
              key={idx}
              className="rounded-md border overflow-hidden relative"
            >
              <div
                className="flex w-full border-b cursor-pointer z-10"
                onClick={() => setOpenItinerary((prev) => _.xor(prev, [idx]))}
              >
                <div
                  className={cn(
                    "shrink-0 transition-all duration-500",
                    isOpen ? "w-0 opacity-0" : "w-[200px] opacity-100"
                  )}
                >
                  <PrismicNextImage
                    alt=""
                    field={list.illustration}
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
                    <p className="font-bold mb-2 text-sm text-neutral-500">
                      Day {day}
                    </p>
                    <div className="flex items-center mb-8">
                      <p className="font-bold text-xl mr-2">{list.title}</p>
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
                        <p
                          key={idx}
                          className="gap-2 inline-flex text-neutral-500"
                        >
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

              <div
                className={cn(
                  "flex gap-8 px-8 transition-all duration-500 overflow-hidden",
                  isOpen
                    ? "h-auto py-8 opacity-100 max-h-[5000px]"
                    : "py-0 opacity-0 max-h-0"
                )}
              >
                <div className="grow">
                  <p className="font-bold mb-2 text-sm text-neutral-500">
                    Day {idx + 1}
                  </p>
                  <div className="flex items-center mb-8">
                    <p className="font-bold text-2xl mr-2">{list.title}</p>
                  </div>

                  <p>{list.description}</p>

                  <div className="grid gap-8 mt-8 ml-4">
                    {highlights.map((v, idx) => (
                      <Fragment key={idx}>
                        {!!v.description ? (
                          <div key={idx} className="flex items-center gap-2">
                            <v.icon className="h-6 w-6 text-primary-500" />
                            <p className="font-bold">{v.title}</p>
                            <p>{v.description}</p>
                          </div>
                        ) : null}
                      </Fragment>
                    ))}
                  </div>
                </div>

                {isFilled.image(list.illustration) && (
                  <div
                    className={cn(
                      "w-[560px] shrink-0 h-fit duration-500 ",
                      isOpen ? 0 : "-translate-y-full"
                    )}
                  >
                    <PrismicNextImage
                      alt=""
                      field={list.illustration}
                      fill={true}
                      width={560}
                      height={320}
                      className="pointer-events-none select-none object-cover !w-full !relative rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Itinerary;
