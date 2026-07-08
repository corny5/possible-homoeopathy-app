import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-base", light ? "text-white/75" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gold" />
    </div>
  );
}
