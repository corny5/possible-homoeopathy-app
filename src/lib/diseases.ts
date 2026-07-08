export interface Disease {
  slug: string;
  name: string;
  short: string;
}

// All 38 conditions treated at Possible Homoeopathy.
export const diseases: Disease[] = [
  { slug: "acne", name: "Acne", short: "Clear, healthy skin from the inside out." },
  { slug: "allergic-rhinitis", name: "Allergic Rhinitis", short: "Lasting relief from sneezing and congestion." },
  { slug: "anaemia", name: "Anaemia", short: "Restore energy by treating the root cause." },
  { slug: "anxiety", name: "Anxiety", short: "Calm the mind with gentle, natural care." },
  { slug: "arthritis", name: "Arthritis", short: "Ease joint pain and improve mobility." },
  { slug: "asthma", name: "Asthma", short: "Breathe easier with safe, long-term treatment." },
  { slug: "backache", name: "Backache", short: "Relieve chronic back and spine discomfort." },
  { slug: "bph", name: "BPH", short: "Manage prostate enlargement naturally." },
  { slug: "cancer", name: "Cancer Support", short: "Supportive care alongside your treatment." },
  { slug: "colitis", name: "Colitis", short: "Soothe inflammation in the digestive tract." },
  { slug: "diabetes", name: "Diabetes", short: "Better sugar control and overall wellbeing." },
  { slug: "ed", name: "Erectile Dysfunction", short: "Confidential, effective and natural care." },
  { slug: "epilepsy", name: "Epilepsy", short: "Reduce frequency of seizures gently." },
  { slug: "fatty-liver", name: "Fatty Liver", short: "Restore liver health and function." },
  { slug: "fibroids", name: "Fibroids", short: "Manage uterine fibroids without surgery." },
  { slug: "gall-stone", name: "Gall Stone", short: "Relief from gall bladder stones naturally." },
  { slug: "hair-loss", name: "Hair Loss", short: "Reduce fall and revive healthy growth." },
  { slug: "ibs", name: "IBS", short: "Settle a sensitive, irritable gut." },
  { slug: "insomnia", name: "Insomnia", short: "Sleep deeply without dependency." },
  { slug: "kidney-diseases", name: "Kidney Diseases", short: "Support kidney function safely." },
  { slug: "kidney-stone", name: "Kidney Stone", short: "Dissolve and prevent painful stones." },
  { slug: "liver-diseases", name: "Liver Diseases", short: "Comprehensive care for liver disorders." },
  { slug: "lipoma", name: "Lipoma", short: "Shrink fatty lumps without surgery." },
  { slug: "migraine", name: "Migraine", short: "Fewer, milder headaches over time." },
  { slug: "obesity", name: "Obesity", short: "Sustainable, healthy weight management." },
  { slug: "pcod", name: "PCOD", short: "Balance hormones and restore cycles." },
  { slug: "piles", name: "Piles", short: "Gentle relief without surgery." },
  { slug: "psychiatric-disorders", name: "Psychiatric Disorders", short: "Compassionate mental health support." },
  { slug: "psoriasis", name: "Psoriasis", short: "Calm flare-ups and heal skin deeply." },
  { slug: "sinusitis", name: "Sinusitis", short: "Clear chronic sinus problems for good." },
  { slug: "thyroid-disorders", name: "Thyroid Disorders", short: "Regulate thyroid function naturally." },
  { slug: "tonsillitis", name: "Tonsillitis", short: "Stop recurring throat infections." },
  { slug: "urticaria", name: "Urticaria", short: "Lasting relief from hives and itching." },
  { slug: "varicose-veins", name: "Varicose Veins", short: "Improve circulation and reduce swelling." },
  { slug: "vitiligo", name: "Vitiligo", short: "Restore skin pigmentation gradually." },
  { slug: "warts", name: "Warts", short: "Remove warts gently, without scarring." },
  { slug: "kidney-failure", name: "Kidney Failure", short: "Supportive care to protect kidney health." },
  { slug: "depression", name: "Depression", short: "Lift mood with holistic, caring treatment." },
];

export const getDisease = (slug: string) => diseases.find((d) => d.slug === slug);

// Top conditions pinned to the top of the conditions list (in this order).
export const pinnedSlugs = [
  "migraine",
  "obesity",
  "psoriasis",
  "insomnia",
  "allergic-rhinitis",
  "arthritis",
];

// Diseases ordered with the pinned conditions first, then the rest alphabetically.
export const orderedDiseases: Disease[] = [
  ...pinnedSlugs
    .map((slug) => diseases.find((d) => d.slug === slug))
    .filter((d): d is Disease => Boolean(d)),
  ...[...diseases]
    .filter((d) => !pinnedSlugs.includes(d.slug))
    .sort((a, b) => a.name.localeCompare(b.name)),
];

// Conditions featured on the home page grid (12) — pinned first.
export const featuredConditionSlugs = [
  "migraine",
  "obesity",
  "psoriasis",
  "insomnia",
  "allergic-rhinitis",
  "arthritis",
  "hair-loss",
  "pcod",
  "thyroid-disorders",
  "kidney-diseases",
  "anxiety",
  "diabetes",
];
