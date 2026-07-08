import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, GraduationCap, BookOpen, Trophy, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Dr. Amar A Golder — About | Possible Homoeopathy" },
      {
        name: "description",
        content:
          "Dr. Amar A Golder, BHMS, MD (Hom.), brings 13+ years of experience in chronic disease management through research-backed homeopathy.",
      },
      { property: "og:title", content: "Dr. Amar A Golder — About | Possible Homoeopathy" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Award className="h-4 w-4 text-gold" /> BHMS, MD (Hom.) · 13 Years
            </span>
            <h1 className="mt-5 font-heading text-4xl font-bold text-white sm:text-5xl">
              Dr. Amar A Golder
            </h1>
            <p className="mt-4 text-white/80">
              A dedicated homeopathic physician specializing in chronic disease management. Dr.
              Golder combines modern research with classical homeopathy to deliver quick symptom
              relief and long-term cure for over 5000 patients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-white/10 shadow-card">
            <img src="/images/doctor.svg" alt="Dr. Amar A Golder" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS */}
      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Qualifications & Specializations" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card icon={GraduationCap} title="Education & Credentials">
                <ul className="space-y-2">
                  {["BHMS — Bachelor of Homeopathic Medicine & Surgery", "MD (Hom.) — Doctor of Medicine in Homeopathy", "13+ years of clinical practice"].map(
                    (t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                        <span>{t}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </Reveal>
            <Reveal delay={120}>
              <Card icon={Award} title="Areas of Specialization">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {["Psoriasis", "Migraine", "Obesity", "Arthritis", "PCOD & Thyroid", "Psychiatric Disorders"].map(
                    (t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                        <span>{t}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESEARCH / AWARDS */}
      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card icon={BookOpen} title="Research & Publications">
                <p>
                  Dr. Golder actively contributes to homeopathic research with a focus on
                  evidence-based protocols for chronic conditions. (Publication list coming soon.)
                </p>
              </Card>
            </Reveal>
            <Reveal delay={120}>
              <Card icon={Trophy} title="Awards & Recognition">
                <p>
                  Recognised for excellence in chronic disease management and patient care.
                  (Detailed awards and certificates coming soon.)
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            title="Our Team of Doctors"
            subtitle="5 expert doctors dedicated to your healing journey"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Reveal key={n} delay={n * 80}>
                <div className="rounded-2xl border bg-card p-6 text-center shadow-md">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary">
                    <Users className="h-9 w-9" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                    Dr. Team Member {n}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">Homeopathic Consultant</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Award;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl border bg-card p-6 shadow-md sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="mt-4 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
