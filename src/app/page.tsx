import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrambleAnimation from "@/components/ScrambleAnimation";
import EcosystemSection from "@/components/EcosystemSection";
import ProductSection from "@/components/ProductSection";
import ProblemSection from "@/components/ProblemSection";
import LabSection from "@/components/LabSection";
import WorkflowSection from "@/components/WorkflowSection";
import IntegrationSection from "@/components/IntegrationSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CalculatorSection from "@/components/CalculatorSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EcosystemSection />
      <ProductSection />
      <ProblemSection />
      <LabSection />
      <WorkflowSection />
      <CalculatorSection />
      <IntegrationSection />
      <CtaSection />
      <Footer />
      <ScrambleAnimation />
</>
  );
}
