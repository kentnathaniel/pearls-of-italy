import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { IconArrowRight, IconToolsKitchen2 } from "@tabler/icons-react";
import { Fragment, useCallback } from "react";

export type ItineraryProps = SliceComponentProps<Content.ItinerarySlice>;

const Itinerary = ({ slice }: ItineraryProps): JSX.Element => {
  const getHighlights = useCallback(
    (list: (typeof slice.primary.itinerary_list)[0]) => [
      {
        title: "Arrival Transfer",
        description: list?.arrival_transfer,
        icon: IconToolsKitchen2,
      },
      {
        title: "Welcome",
        description: list?.welcome,
        icon: IconToolsKitchen2,
      },
      {
        title: "Accommodation",
        description: list?.accomodation,
        icon: IconToolsKitchen2,
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
          const locations = list.location?.split(",") ?? [];

          return (
            <div key={idx} className="rounded-md p-12 border">
              <div className="flex gap-8">
                <div className="grow">
                  <p className="font-bold mb-2 text-sm text-neutral-500">
                    Day {idx + 1}
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
                  <p>{list.description}</p>
                  <div className="grid gap-8 mt-8 ml-4">
                    {getHighlights(list).map((v, idx) => (
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
                  <PrismicNextImage
                    alt=""
                    field={list.illustration}
                    fill={true}
                    width={560}
                    height={320}
                    className="pointer-events-none select-none object-cover !w-[560px] !h-[320px] !relative rounded-md"
                  />
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
