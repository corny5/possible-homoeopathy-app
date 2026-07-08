import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site-data";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group animate-wa-bounce fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-card transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
