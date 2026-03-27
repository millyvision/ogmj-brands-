import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Music2,
  Zap,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'YouTube',
    icon: <Youtube className="w-6 h-6" />,
    color: 'bg-red-600',
    services: [
      { name: 'Subscribers', price: '$50 per 1K' },
      { name: 'Views', price: '$25 per 10K' },
      { name: 'Likes', price: '$15 per 1K' },
      { name: 'Watch Hours', price: '$100 per 1K' },
    ],
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    services: [
      { name: 'Followers', price: '$40 per 1K' },
      { name: 'Likes', price: '$10 per 1K' },
      { name: 'Views', price: '$8 per 10K' },
      { name: 'Comments', price: '$30 per 100' },
    ],
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-6 h-6" />,
    color: 'bg-blue-600',
    services: [
      { name: 'Page Likes', price: '$35 per 1K' },
      { name: 'Post Likes', price: '$12 per 1K' },
      { name: 'Views', price: '$10 per 10K' },
      { name: 'Shares', price: '$25 per 100' },
    ],
  },
  {
    name: 'Twitter/X',
    icon: <Twitter className="w-6 h-6" />,
    color: 'bg-black border border-white/20',
    services: [
      { name: 'Followers', price: '$45 per 1K' },
      { name: 'Likes', price: '$15 per 1K' },
      { name: 'Retweets', price: '$20 per 100' },
      { name: 'Impressions', price: '$30 per 100K' },
    ],
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'bg-blue-700',
    services: [
      { name: 'Connections', price: '$60 per 500' },
      { name: 'Post Likes', price: '$20 per 1K' },
      { name: 'Views', price: '$15 per 10K' },
      { name: 'Endorsements', price: '$40 per 100' },
    ],
  },
  {
    name: 'TikTok',
    icon: <Music2 className="w-6 h-6" />,
    color: 'bg-black border border-white/20',
    services: [
      { name: 'Followers', price: '$35 per 1K' },
      { name: 'Likes', price: '$12 per 1K' },
      { name: 'Views', price: '$10 per 10K' },
      { name: 'Shares', price: '$18 per 1K' },
    ],
  },
];

const howItWorks = [
  { step: '01', title: 'Select Platform', description: 'Choose the social media platform you want to boost.' },
  { step: '02', title: 'Enter Details', description: 'Provide your account URL and select the service package.' },
  { step: '03', title: 'Auto-Boost', description: 'Our system automatically starts boosting your account instantly.' },
];

const guarantees = [
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Delivery' },
  { icon: <Users className="w-5 h-5" />, title: 'Real Engagement' },
  { icon: <Clock className="w-5 h-5" />, title: '24/7 Support' },
  { icon: <Shield className="w-5 h-5" />, title: 'Money Back Guarantee' },
];

export default function SocialBooster() {
  return (
    <section id="social-booster" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            Social Media Auto-Booster
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Boost your social media accounts automatically. Select your platform, enter your details, and watch your engagement grow — no manual intervention required.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 hover-lift"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center`}>
                  <span className="text-white">{platform.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
              </div>

              <div className="space-y-2 mb-4">
                {platform.services.map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">{service.name}</span>
                    <span className="text-lime text-sm font-medium">{service.price}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold rounded-full">
                <Zap className="w-4 h-4 mr-2" />
                Boost {platform.name}
              </Button>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-white text-2xl font-bold text-center mb-8">How Auto-Boost Works</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lime text-xl font-bold">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-lime">{guarantee.icon}</span>
              <span className="text-white/70 text-sm font-medium">{guarantee.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
