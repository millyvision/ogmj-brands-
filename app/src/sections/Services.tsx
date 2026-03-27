import { FileText, Briefcase, Palette } from 'lucide-react';

const services = [
  {
    title: 'Documents & Certificates',
    description: 'Passports • IDs • Business certs • Verifications',
    image: '/images/documents-certs.jpg',
  },
  {
    title: 'Business',
    description: 'Launch & Compliance',
    image: '/images/business-launch.jpg',
  },
  {
    title: 'Branding',
    description: 'Identity & Growth',
    image: '/images/branding.jpg',
  },
];

const serviceIcons = [
  <FileText className="w-5 h-5" />,
  <Briefcase className="w-5 h-5" />,
  <Palette className="w-5 h-5" />,
];

export default function Services() {
  return (
    <section id="services" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl hover-lift cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lime">{serviceIcons[index]}</span>
                  <h3 className="text-white text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-lime/30 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
