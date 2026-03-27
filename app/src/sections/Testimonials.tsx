import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'I went from idea to registered business in three days.',
    name: 'Amina K.',
    role: 'Founder',
    image: '/images/testimonial-1.jpg',
  },
  {
    quote: 'The document checklist saved me weeks of back-and-forth.',
    name: 'David O.',
    role: 'Consultant',
    image: '/images/testimonial-2.jpg',
  },
  {
    quote: 'Our brand finally looks consistent across every channel.',
    name: 'Priya S.',
    role: 'Creative Lead',
    image: '/images/testimonial-3.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Testimonials</h2>
          <p className="text-white/60 text-lg">Builders who moved fast.</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 lg:p-8 hover-lift"
            >
              <Quote className="w-8 h-8 text-lime mb-4" />
              <p className="text-white text-lg lg:text-xl font-medium mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
