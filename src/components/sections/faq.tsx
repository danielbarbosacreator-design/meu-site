import { faq } from "@/content/copy";
import { SectionHeading, Em } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

/** 11 — FAQ (Radix accordion: keyboard + screen-reader accessible). */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-28 sm:py-40">
      <div className="container-cine grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Perguntas frequentes"
            title={
              <>
                Respostas <Em>diretas.</Em>
              </>
            }
            lead="Transparência sobre o que você recebe, o que precisa ter e o que a CINELANE não faz."
          />
        </div>
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-line">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
