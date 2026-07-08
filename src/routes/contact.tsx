import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentForm } from "@/components/AppointmentForm";
import { clinics, PHONE, EMAIL, WHATSAPP_URL } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    concern: typeof search.concern === "string" ? search.concern : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact & Book Appointment — Possible Homoeopathy" },
      {
        name: "description",
        content:
          `Book your homeopathic consultation at Possible Homoeopathy. Clinics in Nagpur, Pune & Mumbai, plus online consultations across India. Call ${PHONE}.`,
      },
      { property: "og:title", content: "Contact & Book Appointment — Possible Homoeopathy" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { concern } = Route.useSearch();

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-white/80">
            Book a consultation or visit one of our clinics. We're here to help you heal.
          </p>
        </div>
      </section>

      <section className="bg-section py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading
              title="Book Your Consultation"
              subtitle="Fill in your details. Our team will reach out within 24 hours."
              className="!text-left !mx-0"
            />
            <div className="mt-8">
              <AppointmentForm defaultConcern={concern ?? ""} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="font-heading text-lg font-bold text-foreground">Contact Details</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-foreground hover:text-gold">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Phone className="h-4 w-4" />
                    </span>
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-gold">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  Mon–Sat: 11 AM–2 PM &amp; 6–9 PM
                </li>
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 font-semibold text-white hover:bg-whatsapp/90"
              >
                <MessageCircle className="h-5 w-5" fill="currentColor" /> Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Our Clinics" subtitle="Visit us in Nagpur, Pune or Mumbai" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {clinics.map((c, i) => (
              <Reveal key={c.city} delay={i * 100}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-md">
                  <div className="flex h-36 items-center justify-center bg-secondary text-primary">
                    <MapPin className="h-10 w-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">{c.city}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.address}</p>
                    <a
                      href={`tel:${PHONE}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                    >
                      <Phone className="h-4 w-4" /> {PHONE}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
