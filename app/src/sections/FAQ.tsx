import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is this a government service?',
    answer: 'No. We provide guided steps and official links. Final approval comes from the relevant authority.',
  },
  {
    question: 'Can I track my progress?',
    answer: 'Yes. Your dashboard shows tasks, uploads, and next steps.',
  },
  {
    question: 'What countries are supported?',
    answer: 'We cover major markets worldwide and add new guides regularly.',
  },
  {
    question: 'How do payments work?',
    answer: 'Pay per service or choose a bundle. Subscriptions are available for ongoing brand growth.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Encryption, secure storage, and strict access controls.',
  },
];

export default function FAQ() {
  return (
    <section className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">FAQ</h2>
            <p className="text-white/60 text-lg">Common questions</p>
            <p className="text-white/40 text-sm mt-2">
              Everything you need to know about our self-service platform.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border-none px-6"
              >
                <AccordionTrigger className="text-white text-left font-medium hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
