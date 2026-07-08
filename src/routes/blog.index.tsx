import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Health Blog — Possible Homoeopathy" },
      {
        name: "description",
        content:
          "Read articles on chronic disease care, natural remedies and homeopathic health tips from Possible Homoeopathy.",
      },
      { property: "og:title", content: "Health Blog — Possible Homoeopathy" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">Health Blog</h1>
          <p className="mt-4 text-white/80">
            Insights, tips and stories on natural healing and chronic disease care.
          </p>
        </div>
      </section>

      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary to-green">
                    <span className="font-heading text-xl font-bold text-white/90">
                      Possible Homoeopathy
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                      {p.category}
                    </span>
                    <h2 className="mt-3 font-heading text-lg font-bold text-foreground">
                      {p.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {p.readTime}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
