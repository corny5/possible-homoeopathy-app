import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: [
        { title: `${post?.title ?? "Article"} — Possible Homoeopathy` },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:title", content: post?.title ?? "Article" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post?.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${post?.slug}` }],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Article not found</h1>
      <Button asChild className="mt-6">
        <Link to="/blog">Back to blog</Link>
      </Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Something went wrong</h1>
      <Button asChild className="mt-6">
        <Link to="/blog">Back to blog</Link>
      </Button>
    </div>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <section className="bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="flex items-center gap-1 text-sm text-white/60">
            <Link to="/blog" className="hover:text-gold">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{post.category}</span>
          </nav>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <article className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-green">
            <span className="font-heading text-2xl font-bold text-white/90">
              Possible Homoeopathy
            </span>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p className="text-lg text-foreground">{post.excerpt}</p>
            <p>
              At Possible Homoeopathy, we believe that lasting health comes from treating the root
              cause of a condition rather than suppressing its symptoms. This article explores a
              practical, research-backed perspective on {post.title.toLowerCase()}.
            </p>
            <h2 className="font-heading text-2xl font-bold text-foreground">Understanding the Condition</h2>
            <p>
              Every patient is unique. Our doctors take the time to understand your complete
              physical, mental and emotional picture before designing a personalised treatment plan.
              This is the foundation of effective homeopathic care.
            </p>
            <h2 className="font-heading text-2xl font-bold text-foreground">The Homeopathic Approach</h2>
            <p>
              Natural remedies, prescribed precisely for your constitution, stimulate the body's own
              healing response — safely and without side effects. Combined with lifestyle guidance,
              this approach delivers both relief and long-term improvement.
            </p>
            <p className="italic">
              This is placeholder content. Full articles will be published soon.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-secondary px-6 py-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Have questions about your health?
            </h2>
            <Button asChild size="lg">
              <Link to="/contact">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
