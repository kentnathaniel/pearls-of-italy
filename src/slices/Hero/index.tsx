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
      className="container mt-8 relative mx-auto px-8"
    >
      <div className="flex w-full gap-16">
        {/* {isFilled.image(heroIllustration) && (
        <PrismicNextImage
        field={heroIllustration}
        alt=""
        fill={true}
        width={500}
        height={400}
        className="pointer-events-none select-none object-cover !w-[300px] !h-[400px] relative"
        />
        )} */}
        <div className="w-[500px] h-[600px] border rounded-md shrink-0 flex items-center justify-center">
          Placeholder
        </div>
        <div className="grid gap-8 h-fit">
          <h1 className="text-3xl font-bold ">{slice.primary.title}</h1>
          <p>{slice.primary.description}</p>

          <div className="grid gap-8 grid-cols-2 ">
            {keyFeatures.map((feature, idx) => (
              <div key={idx} className="grid gap-2">
                <div className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6 text-primary-500" />
                  <p className="font-bold">{feature.title}</p>
                </div>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          <button className="w-full text-left p-4 rounded-lg border flex items-center gap-4">
            <div>
              <p className="font-bold mb-2">
                Looking to book in a group of 15 or more
              </p>
              <p className="text-neutral-500">
                Deals, savings and exclusive private touring options available
                plus if you need a different date or itinerary change we can
                create a custom trip. Contact us for more details
              </p>
            </div>
            <IconChevronRight className="shrink-0 w-8 h-8" />
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
