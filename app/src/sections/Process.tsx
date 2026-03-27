import { MousePointer, ListTodo, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <MousePointer className="w-6 h-6" />,
    title: 'Choose',
    description: 'Select your country and the service you need.',
  },
  {
    icon: <ListTodo className="w-6 h-6" />,
    title: 'Follow',
    description: 'Get a checklist, official links, and clear instructions.',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Launch',
    description: 'Complete tasks, track progress, and hit your deadline.',
  },
];

export default function Process() {
  return (
    <section className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold">
            <span className="text-lime">Pick a service.</span> Follow the steps. <span className="text-lime">Launch.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-lime">{step.icon}</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
