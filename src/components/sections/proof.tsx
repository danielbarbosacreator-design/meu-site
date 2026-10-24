import { testimonials } from "@/content/copy";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/** Social proof — renders nothing until real, authorised testimonials are added. */
export function ProofSection() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="proof-title" className="py-28 sm:py-36">
      <div className="container-cine">
        <SectionHeading id="proof-title" eyebrow="Quem já usa" title="Fotógrafos que automatizaram o processo" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.name} delay={i * 80} className="flex flex-col rounded-[22px] border border-line bg-graphite/50 p-7">
              <blockquote className="editorial flex-1 text-2xl leading-snug text-cream">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                {t.photo && <img src={t.photo} alt="" className="size-10 rounded-full object-cover" loading="lazy" />}
                <span>
                  <span className="block text-sm font-medium text-ivory">{t.name}</span>
                  <span className="block text-xs text-stone">
                    {t.role}
                    {t.city ? ` · ${t.city}` : ""}
                  </span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
