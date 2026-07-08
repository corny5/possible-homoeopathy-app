import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { orderedDiseases } from "@/lib/diseases";

export const Route = createFileRoute("/diseases/")({
  head: () => ({
    meta: [
      { title: "Conditions We Treat — Possible Homoeopathy" },
      {
        name: "description",
        content:
          "Explore 38+ chronic conditions treated with research-backed homeopathy at Possible Homoeopathy — from psoriasis and migraine to PCOD and thyroid disorders.",
      },
      { property: "og:title", content: "Conditions We Treat — Possible Homoeopathy" },
      { property: "og:url", content: "/diseases" },
    ],
    links: [{ rel: "canonical", href: "/diseases" }],
  }),
  component: DiseasesPage,
});

function DiseasesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      orderedDiseases.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Conditions We Treat
          </h1>
          <p className="mt-4 text-white/80">
            Research-backed homeopathic protocols for 38+ chronic conditions.
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conditions..."
              className="h-12 bg-card pl-11 text-foreground"
            />
          </div>
        </div>
      </section>

      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No conditions match "{query}". Try another search.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 4) * 60}>
                  <Link
                    to="/diseases/$slug"
                    params={{ slug: d.slug }}
                    className="group flex h-full items-start gap-3 rounded-xl border bg-card p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Stethoscope className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading font-semibold text-foreground">
                        {d.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{d.short}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Not sure which treatment is right for you?
            </h2>
            <p className="max-w-xl text-white/80">
              Book a consultation with Dr. Amar A Golder and get a personalised, research-backed
              treatment plan.
            </p>
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/contact">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
