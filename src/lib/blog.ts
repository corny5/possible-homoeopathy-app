export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "managing-psoriasis-naturally",
    category: "Skin Health",
    title: "Managing Psoriasis Naturally with Homeopathy",
    excerpt:
      "Discover how research-backed homeopathic protocols can calm psoriasis flare-ups and heal skin from within.",
    date: "June 12, 2025",
    readTime: "5 min read",
  },
  {
    slug: "migraine-relief-without-painkillers",
    category: "Neurology",
    title: "Migraine Relief Without Painkillers",
    excerpt:
      "Frequent migraines? Learn how a personalised homeopathic approach reduces frequency and severity over time.",
    date: "June 2, 2025",
    readTime: "4 min read",
  },
  {
    slug: "understanding-pcod",
    category: "Women's Health",
    title: "Understanding PCOD: Causes & Natural Care",
    excerpt:
      "A simple guide to PCOD — what causes it and how homeopathy helps restore hormonal balance.",
    date: "May 24, 2025",
    readTime: "6 min read",
  },
  {
    slug: "thyroid-disorders-explained",
    category: "Endocrinology",
    title: "Thyroid Disorders Explained",
    excerpt:
      "Hypothyroid or hyperthyroid? Understand the signs and how natural treatment supports thyroid function.",
    date: "May 15, 2025",
    readTime: "5 min read",
  },
  {
    slug: "homeopathy-for-children",
    category: "Family Health",
    title: "Is Homeopathy Safe for Children?",
    excerpt:
      "Everything parents should know about safe, gentle homeopathic care for kids of all ages.",
    date: "May 4, 2025",
    readTime: "3 min read",
  },
  {
    slug: "beating-hair-fall",
    category: "Skin Health",
    title: "Beating Hair Fall the Natural Way",
    excerpt:
      "Stop the cycle of hair loss. Learn how addressing the root cause revives healthy hair growth.",
    date: "April 28, 2025",
    readTime: "4 min read",
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
