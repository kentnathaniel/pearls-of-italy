"use client";

import _ from "lodash";
import { useState } from "react";

const useAccordion = ({ size }: { size: number }) => {
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number[]>([]);
  const isAllOpen = openAccordionIdx.length === size;

  const onToggleAllAccordion = () => {
    setOpenAccordionIdx((prev) =>
      isAllOpen ? [] : Array.from({ length: size }, (_, i) => i)
    );
  };

  const onToggleAccordion = (idx: number | number[]) => {
    setOpenAccordionIdx((prev) =>
      Array.isArray(idx) ? idx : _.xor(prev, [idx])
    );
  };

  const isOpen = (idx: number) => openAccordionIdx.includes(idx);

  return {
    onToggleAccordion,
    onToggleAllAccordion,
    isAllOpen,
    isOpen,
    openAccordionIdx,
  };
};

export { useAccordion };
