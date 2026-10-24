import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckoutNotice, ConsentBanner, StickyCta } from "@/components/layout/overlays";
import { HeroVideo } from "@/components/sections/hero-video";
import { SculptureSection } from "@/components/sections/sculpture";
import { PainSection } from "@/components/sections/pain";
import { PipelineSection } from "@/components/sections/pipeline";
import { IdentitySection } from "@/components/sections/identity";
import { RevenueSection } from "@/components/sections/revenue";
import { DemoSection } from "@/components/sections/demo";
import { NotGeneratorSection } from "@/components/sections/not-generator";
import { ProofSection } from "@/components/sections/proof";
import { IncludedSection } from "@/components/sections/included";
import { OfferSection } from "@/components/sections/offer";
import { FaqSection } from "@/components/sections/faq";
import { ClosingSection } from "@/components/sections/closing";

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-terracotta focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <HeroVideo />
        <SculptureSection />
        <PainSection />
        <PipelineSection />
        <IdentitySection />
        <RevenueSection />
        <DemoSection />
        <NotGeneratorSection />
        <ProofSection />
        <IncludedSection />
        <OfferSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <Footer />
      <StickyCta />
      <CheckoutNotice />
      <ConsentBanner />
    </>
  );
}
