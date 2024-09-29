import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ItineraryAccordionExperienceItemProps } from "./itinerary-accordion-experiences";

const TaglineBadge = ({
  iconic,
  tagline,
  tagline_badge_color,
}: Partial<ItineraryAccordionExperienceItemProps>): JSX.Element => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-sm border-0 font-bold",
        iconic ? "bg-orange-950 text-white" : "bg-white text-black"
      )}
      style={{
        ...(tagline_badge_color && {
          backgroundColor: tagline_badge_color,
        }),
      }}
    >
      {!!tagline
        ? tagline
        : iconic
          ? "Iconic Experience"
          : "Optional Experience"}
    </Badge>
  );
};

export { TaglineBadge };
