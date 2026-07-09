import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/site-data";
import { orderedDiseases, getDisease } from "@/lib/diseases";
import { getQuestionnaire, type Field } from "@/lib/questionnaires";

export function AppointmentForm({ defaultConcern = "" }: { defaultConcern?: string }) {
  const initialSlug = useMemo(() => {
    const q = defaultConcern.trim().toLowerCase();
    if (!q) return "";
    const match = orderedDiseases.find(
      (d) => d.slug === q || d.name.toLowerCase() === q,
    );
    return match?.slug ?? "";
  }, [defaultConcern]);

  const [slug, setSlug] = useState(initialSlug);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [scales, setScales] = useState<Record<string, number>>({});
  const [checks, setChecks] = useState<Record<string, string[]>>({});

  const questionnaire = getQuestionnaire(slug);
  const selected = slug ? getDisease(slug) : undefined;

  const toggleCheck = (name: string, value: string) =>
    setChecks((prev) => {
      const current = prev[name] ?? [];
      return {
        ...prev,
        [name]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = new FormData(e.currentTarget);
    const answers = questionnaire.flatMap((section) =>
      section.fields.map((field) => {
        const value =
          field.type === "scale"
            ? scales[field.name] != null
              ? String(scales[field.name])
              : ""
            : field.type === "checkbox"
              ? (checks[field.name] ?? []).join(", ")
              : String(form.get(field.name) ?? "");
        return { label: field.label, value };
      }),
    );

    const payload = {
      honeypot: String(form.get("company") ?? ""),
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      age: String(form.get("age") ?? ""),
      gender: String(form.get("gender") ?? ""),
      city: String(form.get("city") ?? ""),
      conditionName: selected?.name ?? "",
      consultationType: String(form.get("type") ?? ""),
      slot: String(form.get("slot") ?? ""),
      message: String(form.get("message") ?? ""),
      fileCount: form.getAll("reports").filter((f) => f instanceof File && f.size > 0).length,
      answers,
    };

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: window.scrollY - 100, behavior: "smooth" });
    } catch {
      setError("Something went wrong sending your request. Please try WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-green/30 bg-green/10 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-green" />
        <h3 className="font-heading text-2xl font-bold text-foreground">Thank you!</h3>
        <p className="max-w-md text-muted-foreground">
          Our team will contact you within 24 hours to confirm your consultation.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  const renderField = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea id={field.name} name={field.name} rows={3} placeholder={field.placeholder} />
          </div>
        );
      case "select":
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select name={field.name}>
              <SelectTrigger id={field.name}>
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "scale":
        return (
          <div key={field.name} className="grid gap-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 10 }).map((_, i) => {
                const val = i + 1;
                const active = scales[field.name] === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setScales((p) => ({ ...p, [field.name]: val }))}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:border-primary",
                    )}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div key={field.name} className="grid gap-2">
            <Label>{field.label}</Label>
            <div className={cn("grid gap-2", field.cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
              {field.options?.map((opt) => {
                const active = (checks[field.name] ?? []).includes(opt);
                return (
                  <label
                    key={opt}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm transition-colors",
                      active ? "border-primary bg-secondary" : "border-input bg-background hover:bg-secondary/50",
                    )}
                  >
                    <Checkbox
                      checked={active}
                      onCheckedChange={() => toggleCheck(field.name, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border bg-card p-6 shadow-card sm:p-8">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Condition selector */}
      <div className="grid gap-2 rounded-xl bg-secondary/60 p-4">
        <Label htmlFor="condition" className="text-base font-semibold">
          Which condition do you need help with? <span className="text-destructive">*</span>
        </Label>
        <Select value={slug || undefined} onValueChange={setSlug}>
          <SelectTrigger id="condition" className="h-11 bg-card">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {orderedDiseases.map((d) => (
              <SelectItem key={d.slug} value={d.slug}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Patient details */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Your full name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">
            Phone / WhatsApp <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" name="phone" type="tel" required placeholder="10-digit mobile number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" min={0} placeholder="Age in years" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender">
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other / Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Select name="city">
            <SelectTrigger id="city">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nagpur">Nagpur</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="other">Other — Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dynamic condition questionnaire */}
      <div className="grid gap-6 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          {selected
            ? `A few questions to help us understand your ${selected.name.toLowerCase()}.`
            : "Select a condition above to answer a few quick questions about it."}
        </p>
        {questionnaire.map((section) => (
          <div key={section.title} className="grid gap-5">
            <h3 className="font-heading text-lg font-semibold text-primary">{section.title}</h3>
            {section.fields.map((field) => renderField(field))}
          </div>
        ))}
      </div>

      {/* Consultation preferences */}
      <div className="grid gap-5 border-t pt-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Consultation Type</Label>
          <RadioGroup defaultValue="clinic" name="type" className="flex gap-6 pt-1">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="clinic" id="clinic" />
              <Label htmlFor="clinic" className="font-normal">
                In-Clinic
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="font-normal">
                Online
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slot">Preferred Time Slot</Label>
          <Select name="slot">
            <SelectTrigger id="slot">
              <SelectValue placeholder="Select a slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning 11–2</SelectItem>
              <SelectItem value="evening">Evening 6–9</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="reports">Upload Reports / Photos (optional)</Label>
        <label
          htmlFor="reports"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed bg-secondary/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary"
        >
          <Upload className="h-4 w-4" />
          Choose files
          <input id="reports" name="reports" type="file" multiple className="hidden" />
        </label>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" name="message" rows={2} placeholder="Anything else you'd like us to know?" />
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-4 py-2.5 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Sending…" : "Request Appointment"}
      </Button>

      <div className="flex flex-col items-center gap-3 border-t pt-5 text-center">
        <p className="text-sm text-muted-foreground">Prefer to message us directly?</p>
        <Button
          asChild
          size="lg"
          className="w-full bg-whatsapp text-white hover:bg-whatsapp/90 sm:w-auto"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" fill="currentColor" />
            Chat on WhatsApp
          </a>
        </Button>
      </div>
    </form>
  );
}
