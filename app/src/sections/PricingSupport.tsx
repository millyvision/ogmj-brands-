import { ArrowRight, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSupport() {
  return (
    <section id="pricing" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Pricing Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/pricing.jpg"
                alt="Pricing"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Pricing</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Pay for Progress</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  One-time service purchases
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Bundles that save time
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Subscriptions for growth
                </li>
              </ul>
              <Button className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn">
                View Pricing
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Support Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/support.jpg"
                alt="Support"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Headphones className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Support</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Help When You Need It</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Guided answers, not guesses
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  AI assistant + email support
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Clear next steps always
                </li>
              </ul>
              <Button className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn">
                Contact Support
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
