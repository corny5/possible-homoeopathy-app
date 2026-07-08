import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Phone,
  Award,
  HelpCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { getDisease } from "@/lib/diseases";
import { PHONE, WHATSAPP_URL } from "@/lib/site-data";

export const Route = createFileRoute("/diseases/$slug")({
  loader: ({ params }) => {
    const disease = getDisease(params.slug);
    if (!disease) throw notFound();
    return { disease };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.disease.name ?? "Condition";
    return {
      meta: [
        { title: `${name} Homoeopathic Treatment — Possible Homoeopathy` },
        {
          name: "description",
          content: `Effective, research-backed homeopathic treatment for ${name}. Personalised care by Dr. Amar A Golder at Possible Homoeopathy.`,
        },
        { property: "og:title", content: `${name} Homoeopathic Treatment` },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/diseases/${loaderData?.disease.slug}` },
      ],
      links: [{ rel: "canonical", href: `/diseases/${loaderData?.disease.slug}` }],
    };
  },
  component: DiseasePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Condition not found</h1>
      <p className="mt-3 text-muted-foreground">This condition page doesn't exist.</p>
      <Button asChild className="mt-6">
        <Link to="/diseases">View all conditions</Link>
      </Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Something went wrong</h1>
      <Button asChild className="mt-6">
        <Link to="/diseases">Back to conditions</Link>
      </Button>
    </div>
  ),
});

function DiseasePage() {
  const { disease } = Route.useLoaderData();

  const faqs = [
    {
      q: `Is homeopathy effective for ${disease.name}?`,
      a: `Yes. Our research-backed protocols treat ${disease.name} by addressing its root cause, offering both symptom relief and long-term improvement.`,
    },
    {
      q: "How long does the treatment take?",
      a: "Duration varies by individual and severity. Many patients notice improvement within a few weeks, with full protocols spanning a few months.",
    },
    {
      q: "Are there any side effects?",
      a: "Homeopathic medicines are natural and gentle, making them safe for all ages with no known side effects when prescribed correctly.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-1 text-sm text-white/60">
            <Link to="/diseases" className="hover:text-gold">
              Conditions
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{disease.name}</span>
          </nav>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
            {disease.name} Homoeopathic Treatment
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">{disease.short}</p>
          <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </section>

      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
          {/* MAIN */}
          <div className="space-y-10">
            <Reveal>
              <Block title="Overview">
                <p>
                  {disease.name} is a chronic condition that can significantly affect daily life
                  when left untreated. At Possible Homoeopathy, we approach {disease.name} with a
                  detailed case study and a treatment plan tailored to your unique constitution,
                  history and lifestyle.
                </p>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="Common Symptoms">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Persistent discomfort",
                    "Recurring flare-ups",
                    "Impact on daily activities",
                    "Slow response to conventional care",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="Causes">
                <p>
                  The causes of {disease.name} are often multi-factorial — including genetic
                  predisposition, lifestyle, stress and environmental triggers. Our doctors identify
                  your specific triggers to build an effective, lasting treatment plan.
                </p>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="Our Homoeopathic Approach">
                <p>
                  We combine modern research with classical homeopathy. Your protocol is designed to
                  deliver quick symptom relief while working toward a long-term cure — without the
                  side effects of conventional medication.
                </p>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="Success Stories">
                <div className="rounded-xl bg-secondary p-6">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-5 w-5" fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-3 italic text-muted-foreground">
                    "After struggling with {disease.name} for years, the personalised treatment here
                    finally gave me lasting relief. Highly recommended."
                  </p>
                  <p className="mt-3 font-semibold text-foreground">— Verified Patient</p>
                </div>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="Frequently Asked Questions">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5 shrink-0 text-gold" />
                          {f.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Block>
            </Reveal>

            <div className="flex flex-col items-center gap-4 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
              <h2 className="font-heading text-2xl font-bold text-white">
                Start Your {disease.name} Treatment Today
              </h2>
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/contact">
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-card p-6 text-center shadow-card">
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-secondary">
                <img src="/images/doctor.svg" alt="Dr. Amar A Golder" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Dr. Amar A Golder
              </h3>
              <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                <Award className="h-4 w-4" /> BHMS, MD (Hom.)
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                13+ years treating chronic conditions. 5000+ patients.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="font-heading text-lg font-bold text-foreground">Quick Appointment</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get help for {disease.name} today.
              </p>
              <div className="mt-4 grid gap-3">
                <Button asChild>
                  <Link to="/contact" search={{ concern: disease.name }}>
                    Request Appointment
                  </Link>
                </Button>
                <Button asChild className="bg-whatsapp text-white hover:bg-whatsapp/90">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary"
                >
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
