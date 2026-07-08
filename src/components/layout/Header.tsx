import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CLINIC_NAME, PHONE, navLinks } from "@/lib/site-data";
import logo from "@/assets/possible-logo.png";

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img
        src={logo}
        alt="Possible Homoeopathy — The Holistic Healers"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-soft" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-gold"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact">Book Appointment</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-heading text-lg text-primary">{CLINIC_NAME}</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/contact">Book Appointment</Link>
                </Button>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-gold"
                >
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
