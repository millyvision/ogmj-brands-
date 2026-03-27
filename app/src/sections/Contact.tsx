import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'ogmjbrandingagency@gmail.com',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'WhatsApp',
    value: '+234 810 972 0301',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+234 810 972 0301',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Global — Remote First',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full py-20 lg:py-32 bg-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/contact-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <h2 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Let's build your next move.
            </h2>
            <p className="text-white/60 text-lg mb-12">
              Tell us what you're launching. We'll map the fastest path.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lime">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white/70">Country</Label>
                <Input
                  id="country"
                  placeholder="Your country"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/70">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime resize-none"
                />
              </div>

              <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
