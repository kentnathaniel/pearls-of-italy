import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import React, { HTMLAttributes } from "react";

const ExpandAllButton = ({
  isAllOpen,
  onToggle,
  className,
  text = "all",
}: {
  isAllOpen: boolean;
  onToggle: () => void;
  text?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mb-4 flex font-bold", className)}>
      <button className="ml-auto flex" onClick={onToggle}>
        {isAllOpen ? "Collapse" : "Expand"} {text}
        <IconChevronDown
          className={cn(
            "transition-all duration-500",
            isAllOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
    </div>
  );
};

export { ExpandAllButton };
