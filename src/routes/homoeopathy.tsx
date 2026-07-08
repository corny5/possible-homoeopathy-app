import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, History, Beaker, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/homoeopathy")({
  head: () => ({
    meta: [
      { title: "What is Homoeopathy? — Possible Homoeopathy" },
      {
        name: "description",
        content:
          "Learn what homeopathy is, its history, how it works, and why it's a safe, natural system of medicine that treats the root cause of disease.",
      },
      { property: "og:title", content: "What is Homoeopathy? — Possible Homoeopathy" },
      { property: "og:url", content: "/homoeopathy" },
    ],
    links: [{ rel: "canonical", href: "/homoeopathy" }],
  }),
  component: HomoeopathyPage,
});

function HomoeopathyPage() {
  const faqs = [
    {
      q: "Is homeopathy safe for children and pregnant women?",
      a: "Yes. Homeopathic medicines are gentle and natural, making them safe for infants, children, pregnant women and the elderly when prescribed by a qualified doctor.",
    },
    {
      q: "Can I take homeopathy with my other medicines?",
      a: "In most cases, yes. Homeopathy can complement conventional treatment. Always inform your doctor about all medicines you are taking.",
    },
    {
      q: "How quickly will I see results?",
      a: "It depends on the condition and individual. Acute issues may respond within days, while chronic conditions follow a longer, steady protocol.",
    },
  ];

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Leaf className="h-7 w-7 text-gold" />
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold text-white sm:text-5xl">
            What is Homoeopathy?
          </h1>
          <p className="mt-4 text-white/80">
            A safe, natural and holistic system of medicine that treats the root cause of disease,
            not just its symptoms.
          </p>
        </div>
      </section>

      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
          <Reveal>
            <Info icon={Leaf} title="What is it?">
              Homeopathy is a 200-year-old system of medicine based on the principle of "like cures
              like." It uses highly individualised, natural remedies to stimulate the body's own
              healing response — treating the person as a whole, not just the disease.
            </Info>
          </Reveal>
          <Reveal>
            <Info icon={History} title="History">
              Founded by Dr. Samuel Hahnemann in the late 18th century, homeopathy has grown into one
              of the most widely used systems of medicine in the world, with millions of patients
              across India and beyond.
            </Info>
          </Reveal>
          <Reveal>
            <Info icon={Beaker} title="How it Works">
              Remedies are prepared through a precise process of dilution and potentisation. A
              homeopath studies your complete physical, mental and emotional picture to prescribe the
              remedy that best matches your unique pattern of symptoms.
            </Info>
          </Reveal>
          <Reveal>
            <Info icon={ShieldCheck} title="Why Choose It">
              Homeopathy is natural, non-addictive and free from side effects. It is especially
              effective for chronic conditions where it aims for lasting cure rather than temporary
              suppression.
            </Info>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8 w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Leaf;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-gold-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
