import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mt-32 relative mx-auto px-8 mb-64"
    >
      <h1 className="text-3xl font-bold mb-12">{slice.primary.title}</h1>
      <Accordion type="multiple">
        {slice.primary.questions.map((question, idx) => (
          <AccordionItem key={idx} value={idx.toString()}>
            <AccordionTrigger>{question.question}</AccordionTrigger>
            <AccordionContent>
              <PrismicRichText field={question.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
