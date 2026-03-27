import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import BusinessLaunch from './sections/BusinessLaunch';
import BrandingAI from './sections/BrandingAI';
import GlobalDashboard from './sections/GlobalDashboard';
import PricingSupport from './sections/PricingSupport';
import CTA from './sections/CTA';
import Capabilities from './sections/Capabilities';
import SocialBooster from './sections/SocialBooster';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BusinessLaunch />
        <BrandingAI />
        <GlobalDashboard />
        <PricingSupport />
        <CTA />
        <Capabilities />
        <SocialBooster />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
