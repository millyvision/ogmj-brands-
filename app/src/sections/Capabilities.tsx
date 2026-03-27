import { 
  Target, 
  Fingerprint, 
  Globe, 
  PenTool, 
  Share2, 
  Building,
  Settings,
  TrendingUp
} from 'lucide-react';

const capabilities = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Brand Strategy Development',
    description: 'Complete brand positioning, voice development, and market analysis.',
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: 'Logo & Brand Identity',
    description: 'Professional logo design, brand guidelines, and visual identity systems.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Website Design',
    description: 'Custom business websites, landing pages, and e-commerce solutions.',
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: 'Content Creation',
    description: 'High-quality content for all platforms including graphics, copy, and video.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Social Media Management',
    description: 'Full-service social media strategy, scheduling, and community management.',
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: 'Business Registration',
    description: 'Company incorporation, CAC registration, and compliance documentation.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Business Management',
    description: 'Operational systems, workflow optimization, and business consulting.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Business Strategies',
    description: 'Growth planning, market entry strategies, and competitive analysis.',
  },
];

export default function Capabilities() {
  return (
    <section className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold">
            Capabilities
          </h2>
          <p className="text-white/60 text-lg mt-4">
            Everything you need to launch and grow
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group glass-card rounded-xl p-6 hover-lift cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-lime/10 flex items-center justify-center mb-4 group-hover:bg-lime/20 transition-colors">
                <span className="text-lime">{capability.icon}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{capability.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
