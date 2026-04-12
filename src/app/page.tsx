import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrambleAnimation from "@/components/ScrambleAnimation";
import EcosystemSection from "@/components/EcosystemSection";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import LabSection from "@/components/LabSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import IntegrationSection from "@/components/IntegrationSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EcosystemSection />
      <ProductSection />
      <FeaturesSection />
      <LabSection />
      <WorkflowSection />
      <PricingSection />
      <IntegrationSection />
      <CtaSection />
      <Footer />
      <ScrambleAnimation />
</>
  );
}
