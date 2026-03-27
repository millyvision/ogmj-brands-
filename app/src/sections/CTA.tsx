import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { title: 'Self-service', description: 'You control the pace' },
  { title: 'Guided', description: 'Clear steps & links' },
  { title: 'Secure', description: 'Encrypted & private' },
];

export default function CTA() {
  return (
    <section className="w-full py-20 lg:py-32 bg-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/capabilities.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Ready When You Are
          </h2>
          <h3 className="text-lime text-2xl lg:text-3xl font-bold mb-6">
            Start Building
          </h3>
          <p className="text-white/70 text-lg mb-8">
            Choose a service. Follow the steps. Launch in days.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-lime text-black hover:bg-lime/90 font-semibold px-8 py-6 rounded-full group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Talk to Support
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-2xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <h4 className="text-white font-semibold text-sm lg:text-base mb-1">{benefit.title}</h4>
              <p className="text-white/50 text-xs lg:text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
