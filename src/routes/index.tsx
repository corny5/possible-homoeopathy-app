import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Target,
  HeartHandshake,
  MessageCircle,
  Award,
  Sparkles,
  Brain,
  Wind,
  Activity,
  Scale,
  Flower2,
  Droplets,
  Stethoscope,
  CircleDot,
  Bone,
  Syringe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentForm } from "@/components/AppointmentForm";
import { diseases, featuredConditionSlugs, getDisease } from "@/lib/diseases";
import {
  stats,
  howItWorks,
  testimonials,
  WHATSAPP_URL,
  PHONE,
} from "@/lib/site-data";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Possible Homoeopathy — Research-Backed Healing, Personalised Care" },
      {
        name: "description",
        content:
          "Chronic disease treatment with research-backed homeopathy. 13+ years, 5000+ patients. Clinics in Nagpur, Pune, Mumbai & online across India.",
      },
      { property: "og:title", content: "Possible Homoeopathy — Research-Backed Healing" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const conditionIcons: Record<string, LucideIcon> = {
  psoriasis: Sparkles,
  migraine: Brain,
  obesity: Scale,
  "hair-loss": Flower2,
  pcod: CircleDot,
  "thyroid-disorders": Activity,
  "kidney-diseases": Droplets,
  anxiety: Brain,
  asthma: Wind,
  piles: Stethoscope,
  arthritis: Bone,
  diabetes: Syringe,
};

function HomePage() {
  const featured = featuredConditionSlugs
    .map((slug) => getDisease(slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.svg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <Sparkles className="h-4 w-4 text-gold" /> Research-Backed Healing. Personalised Care.
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Chronic Disease Care, the Homeopathic Way
            </h1>
            <p className="mt-5 text-lg text-white/80">
              Individualized treatment protocols backed by research. Trusted by 5000+ patients
              across India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" fill="currentColor" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-16 hidden w-full justify-center sm:flex">
            <ChevronDown className="h-7 w-7 animate-bounce text-white/70" />
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="bg-background py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="rounded-xl border-t-4 border-gold bg-card p-6 text-center shadow-md">
                <div className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED CONDITIONS */}
      <section className="bg-section py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            title="Conditions We Treat"
            subtitle="Research-backed homeopathic protocols for 38+ chronic conditions"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => {
              const Icon = conditionIcons[c.slug] ?? ShieldCheck;
              return (
                <Reveal key={c.slug} delay={(i % 3) * 80}>
                  <Link
                    to="/diseases/$slug"
                    params={{ slug: c.slug }}
                    className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                      {c.name}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/diseases">
                View All 38 Conditions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            title="Your Journey to Better Health"
            subtitle="A simple, supportive path from first consultation to lasting recovery"
          />
          <div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border md:block" />
            {howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold font-heading text-xl font-bold text-gold-foreground shadow-md ring-8 ring-background">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT DOCTOR */}
      <section className="bg-section py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-primary/10 shadow-card">
              <img
                src="/images/doctor.svg"
                alt="Dr. Amar A Golder"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-card px-4 py-2 shadow-md">
                <div className="font-heading text-sm font-bold text-primary">BHMS, MD (Hom.)</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Meet Dr. Amar A Golder
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                <Award className="h-4 w-4 text-gold" /> BHMS, MD (Hom.)
              </div>
              <p className="mt-5 text-muted-foreground">
                Dr. Amar A Golder specializes in chronic disease management including psoriasis,
                migraine, obesity, arthritis and psychiatric disorders. His approach combines modern
                research with classical homeopathy — focusing on quick symptom relief and long-term
                cure.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["13 Years Experience", "5000+ Patients", "Chronic Disease Expert"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY HOMOEOPATHY */}
      <section className="bg-primary py-16 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Why Choose Homoeopathy?" light />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "No Side Effects",
                desc: "Natural medicine that is safe for all ages, from infants to the elderly.",
              },
              {
                icon: Target,
                title: "Treats Root Cause",
                desc: "We address the underlying cause, not just temporary symptom suppression.",
              },
              {
                icon: HeartHandshake,
                title: "Personalised Care",
                desc: "Every treatment plan is unique and tailored to you as an individual.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                    <f.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link to="/homoeopathy">
                Learn More About Homoeopathy <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="What Our Patients Say" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl border bg-card p-7 shadow-md">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-5 w-5" fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 italic text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-5 border-t pt-4">
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.city} · {t.condition}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 font-semibold text-gold hover:underline"
            >
              Read More Stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section id="book" className="bg-section py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            title="Book Your Consultation"
            subtitle="Fill in your details. Our team will reach out within 24 hours."
          />
          <div className="mt-10">
            <AppointmentForm />
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Or call us directly at{" "}
            <a href={`tel:${PHONE}`} className="font-semibold text-gold">
              {PHONE}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
