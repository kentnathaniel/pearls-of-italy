"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExpandAllButton } from "@/components/ui/expand-all-button";
import { useAccordion } from "@/lib/use-accordion";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  const {
    isAllOpen,
    onToggleAllAccordion,
    openAccordionIdx,
    onToggleAccordion,
  } = useAccordion({
    size: slice.primary.questions.length,
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto mb-16 px-4 pt-32 lg:container md:px-8"
      id="faq-section"
    >
      <h1 className="mb-12 text-3xl font-bold">{slice.primary.title}</h1>
      <ExpandAllButton isAllOpen={isAllOpen} onToggle={onToggleAllAccordion} />
      <Accordion
        type="multiple"
        value={openAccordionIdx.map((v) => v.toString())}
        onValueChange={(value) => {
          onToggleAccordion(value.map((v) => Number(v)));
        }}
      >
        {slice.primary.questions.map((question, idx) => (
          <AccordionItem key={idx} value={idx.toString()}>
            <AccordionTrigger className="text-left text-lg font-bold md:py-8">
              {question.question}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed lg:leading-loose">
              <PrismicRichText field={question.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
