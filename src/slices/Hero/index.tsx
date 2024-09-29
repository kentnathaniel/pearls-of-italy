import { ForwardRefExoticComponent, RefAttributes } from "react";
import { isFilled } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  IconBedFilled,
  IconCalendarFilled,
  IconChevronRight,
  IconMap,
  IconToolsKitchen2,
  IconWallet,
  IconReceipt2,
  IconCalendarRepeat,
  Icon,
  IconProps,
} from "@tabler/icons-react";
import Link from "next/link";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const heroIcons: {
  [key: string]: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
} = {
  IconWallet: IconWallet,
  IconReceipt2: IconReceipt2,
  IconCalendarRepeat: IconCalendarRepeat,
  IconBedFilled: IconBedFilled,
  IconCalendarFilled: IconCalendarFilled,
  IconMap: IconMap,
  IconToolsKitchen2: IconToolsKitchen2,
};

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const heroIllustration = slice.primary.illustration;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto px-4 pt-8 lg:container lg:px-8 lg:pt-16"
      id="home-section"
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
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

          <div className="grid gap-8 pl-4 md:grid-cols-2 md:pl-0">
            {slice.primary.key_features.map((feature, idx) => {
              const Icon = heroIcons[feature.icon ?? ""];

              return (
                <div key={idx} className="grid gap-2">
                  <div className="flex items-center gap-2">
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                    <p className="font-bold">{feature.title}</p>
                  </div>
                  {feature.link ? (
                    <Link
                      href={feature.link}
                      className="inline w-fit border-b border-red-200 font-bold text-neutral-500 hover:border-red-500 hover:text-neutral-700"
                    >
                      <p>{feature.description}</p>
                    </Link>
                  ) : (
                    <p>{feature.description}</p>
                  )}
                </div>
              );
            })}
          </div>

          <button className="flex w-full items-center gap-4 rounded-lg border p-4 text-left">
            <div>
              <p className="mb-2 font-bold">{slice.primary.cta_book_title}</p>
              <p className="text-neutral-500">
                {slice.primary.cta_book_description}
              </p>
            </div>
            <IconChevronRight className="h-8 w-8 shrink-0" />
          </button>

          <p>
            <strong>Trip Code:</strong> {slice.primary.trip_code}
          </p>
        </div>
      </div>
      <div className="my-16 flex w-full">
        <div className="mx-auto grid grid-cols-3 gap-16">
          {slice.primary.guarantees.map((guarantee, idx) => {
            const Icon = heroIcons[guarantee.icon ?? ""];

            return (
              <div key={idx} className="flex items-center justify-center gap-4">
                <div className="w-fit shrink-0 rounded-full bg-neutral-100 p-3">
                  {Icon ? <Icon className="text-neutral-500" /> : null}
                </div>
                <p className="text-base font-bold">{guarantee.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {slice.primary.cta_book_local_currency && (
        <div className="w-full rounded-md bg-green-900 py-8 text-center text-white [&_a:hover]:border-red-500 [&_a]:border-b [&_a]:border-red-200">
          <PrismicRichText field={slice.primary.cta_book_local_currency} />
        </div>
      )}
    </section>
  );
};

export default Hero;
