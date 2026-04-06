import Benefits from "@/components/benefits";
import ContactCTA from "@/components/contact";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#030712]">
      {/* Dot-grid texture */}
      <div className="landing-grid pointer-events-none fixed inset-0" />

      {/* Page content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
        <ContactCTA />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
