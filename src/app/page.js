import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Home";
import InfoLayanan from "@/components/InfoLayanan";
import ProdukUnggulan from "@/components/ProdukUnggulan";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ProdukUnggulan />
      <InfoLayanan />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}
