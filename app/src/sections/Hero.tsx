import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Business registration guidance',
  'Document checklists & links',
  'Brand identity tools',
  'AI content & automation',
  'Global launch readiness',
  'Secure dashboard tracking',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-woman.jpg"
          alt="Professional businesswoman"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium">
                  Self-Service Platform
                </p>
              </div>

              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight">
                  BUILD
                  <br />
                  YOUR
                  <br />
                  <span className="text-lime">BRAND</span>
                </h1>
              </div>

              <p className="text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
                Register businesses, process documents, and launch globally—guided step by step.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-lime text-black hover:bg-lime/90 font-semibold px-6 py-6 rounded-full group">
                  Start Building
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-medium px-6 py-6 rounded-full"
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right Column - Glass Card */}
            <div className="lg:justify-self-end">
              <div className="glass-card rounded-2xl p-6 lg:p-8 max-w-md">
                <div className="space-y-6">
                  <div>
                    <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-medium mb-3">
                      OGMJ BRANDS
                    </p>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                      A self-service system for founders, creators, and teams. We map the steps, you move at your speed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-lime rounded-sm flex-shrink-0" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
