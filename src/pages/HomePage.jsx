import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ProductCategoriesSection from "../components/home/ProductCategoriesSection";
import IndustriesSection from "../components/home/IndustriesSection";
import CaseStudiesSection from "../components/home/CaseStudiesSection";
import FinalCTASection from "../components/home/FinalCTASection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProductCategoriesSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <FinalCTASection />
    </>
  );
}

export default HomePage;