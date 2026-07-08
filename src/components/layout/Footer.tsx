import { Link } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { CLINIC_NAME, TAGLINE, PHONE, EMAIL, navLinks } from "@/lib/site-data";
import { diseases } from "@/lib/diseases";
import logo from "@/assets/possible-logo.png";

export function Footer() {
  const topConditions = diseases.slice(0, 8);
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-lg bg-white/95 px-3 py-2">
            <img src={logo} alt="Possible Homoeopathy" className="h-9 w-auto" />
          </div>
          <p className="mt-3 text-sm text-white/70">{TAGLINE}</p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-base font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base font-semibold">Conditions</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {topConditions.map((d) => (
              <li key={d.slug}>
                <Link
                  to="/diseases/$slug"
                  params={{ slug: d.slug }}
                  className="transition-colors hover:text-gold"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base font-semibold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4 shrink-0" /> {PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-gold">
                <Mail className="h-4 w-4 shrink-0" /> {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Mon–Sat: 11 AM–2 PM &amp; 6–9 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Nagpur · Pune · Mumbai · Online Pan India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-white/60 sm:px-6">
          © 2025 {CLINIC_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
