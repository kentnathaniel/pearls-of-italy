import { isFilled } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  IconBedFilled,
  IconCalendarFilled,
  IconChevronRight,
  IconMap,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import { useMemo } from "react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const heroIllustration = slice.primary.illustration;

  const keyFeatures = useMemo(
    () => [
      {
        title: "Travel",
        description: slice.primary.travel,
        icon: IconCalendarFilled,
      },
      {
        title: "Accommodation",
        description: slice.primary.accomodation,
        icon: IconBedFilled,
      },
      {
        title: "Meals",
        description: slice.primary.meals,
        icon: IconToolsKitchen2,
      },
      {
        title: "Itinerary",
        description: slice.primary.itinerary,
        icon: IconMap,
      },
    ],
    [slice]
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto px-4 pt-16 lg:container md:px-8"
      id="home-section"
    >
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        <div className="relative h-[400px] w-[100%] shrink-0 overflow-hidden rounded-md lg:h-auto lg:w-[40%]">
          {isFilled.image(heroIllustration) && (
            <PrismicNextImage
              field={heroIllustration}
              alt=""
              fill
              className="pointer-events-none select-none object-cover"
            />
          )}
        </div>
        <div className="grid h-fit gap-8">
          <h1 className="text-3xl font-bold lg:font-extrabold lg:tracking-wide">
            {slice.primary.title}
          </h1>
          <p className="lg:leading-relaxed lg:tracking-wide">
            {slice.primary.description}
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {keyFeatures.map((feature, idx) => (
              <div key={idx} className="grid gap-2">
                <div className="flex items-center gap-2">
                  <feature.icon className="text-primary-500 h-6 w-6" />
                  <p className="font-bold">{feature.title}</p>
                </div>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          <button className="flex w-full items-center gap-4 rounded-lg border p-4 text-left">
            <div>
              <p className="mb-2 font-bold">
                Looking to book in a group of 15 or more
              </p>
              <p className="text-neutral-500">
                Deals, savings and exclusive private touring options available
                plus if you need a different date or itinerary change we can
                create a custom trip. Contact us for more details
              </p>
            </div>
            <IconChevronRight className="h-8 w-8 shrink-0" />
          </button>

          <p>
            <strong>Trip Code:</strong> {slice.primary.trip_code}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
