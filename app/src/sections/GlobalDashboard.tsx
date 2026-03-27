import { ArrowRight, Globe, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalDashboard() {
  return (
    <section id="dashboard" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Global Coverage Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/cta-bg.jpg"
                alt="Global Coverage"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Global Coverage</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Worldwide Ready</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Multi-country guidance
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Local requirements mapped
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  One dashboard, many markets
                </li>
              </ul>
              <Button className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn">
                View Countries
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/dashboard.jpg"
                alt="Dashboard"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <LayoutDashboard className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Dashboard</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Track Everything</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Service progress at a glance
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Files, notes, and deadlines
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Renewal reminders
                </li>
              </ul>
              <Button className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn">
                See Dashboard
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
