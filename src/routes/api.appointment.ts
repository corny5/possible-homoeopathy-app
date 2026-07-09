import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";

const AnswerSchema = z.object({
  label: z.string().max(300),
  value: z.string().max(2000),
});

const AppointmentSchema = z.object({
  honeypot: z.string().max(0).default(""),
  name: z.string().trim().max(200).default(""),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().max(200).default(""),
  age: z.string().trim().max(10).default(""),
  gender: z.string().trim().max(50).default(""),
  city: z.string().trim().max(50).default(""),
  conditionName: z.string().trim().max(200).default(""),
  consultationType: z.string().trim().max(50).default(""),
  slot: z.string().trim().max(50).default(""),
  message: z.string().trim().max(2000).default(""),
  fileCount: z.number().int().min(0).max(50).default(0),
  answers: z.array(AnswerSchema).max(50).default([]),
});

// CallMeBot rejects overly long messages, so the WhatsApp text is capped
// separately from the (unlimited) email body.
const WHATSAPP_TEXT_LIMIT = 1500;

function buildMessage(data: z.infer<typeof AppointmentSchema>): string {
  const lines: string[] = ["*New Appointment Request*", ""];

  lines.push(`Name: ${data.name || "-"}`);
  lines.push(`Phone: ${data.phone}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.age) lines.push(`Age: ${data.age}`);
  if (data.gender) lines.push(`Gender: ${data.gender}`);
  if (data.city) lines.push(`City: ${data.city}`);
  if (data.conditionName) lines.push(`Condition: ${data.conditionName}`);
  if (data.consultationType) lines.push(`Consultation Type: ${data.consultationType}`);
  if (data.slot) lines.push(`Preferred Slot: ${data.slot}`);

  if (data.answers.length > 0) {
    lines.push("", "*Questionnaire*");
    for (const a of data.answers) {
      if (a.value) lines.push(`${a.label}: ${a.value}`);
    }
  }

  if (data.message) lines.push("", `Message: ${data.message}`);
  if (data.fileCount > 0) lines.push("", `📎 ${data.fileCount} file(s) attached (not forwarded — ask the patient to send directly)`);

  return lines.join("\n");
}

async function sendWhatsApp(text: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!phone || !apiKey) throw new Error("CallMeBot is not configured");

  const truncated =
    text.length > WHATSAPP_TEXT_LIMIT ? `${text.slice(0, WHATSAPP_TEXT_LIMIT)}\n…` : text;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apiKey)}&text=${encodeURIComponent(truncated)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CallMeBot responded with ${res.status}`);
}

async function sendEmail(text: string): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!host || !port || !user || !pass || !to) throw new Error("SMTP is not configured");

  const transport = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });

  await transport.sendMail({
    from: user,
    to,
    subject: "New Appointment Request — Possible Homoeopathy",
    text,
    html: text.replace(/\n/g, "<br>"),
  });
}

export const Route = createFileRoute("/api/appointment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
        }

        const parsed = AppointmentSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
        }

        // Honeypot: real users never fill this hidden field.
        if (parsed.data.honeypot) {
          return Response.json({ ok: true, channels: { whatsapp: false, email: false } });
        }

        const text = buildMessage(parsed.data);

        const [whatsapp, email] = await Promise.allSettled([
          sendWhatsApp(text),
          sendEmail(text),
        ]);

        const channels = {
          whatsapp: whatsapp.status === "fulfilled",
          email: email.status === "fulfilled",
        };

        if (!channels.whatsapp) console.error("WhatsApp send failed:", (whatsapp as PromiseRejectedResult).reason);
        if (!channels.email) console.error("Email send failed:", (email as PromiseRejectedResult).reason);

        if (!channels.whatsapp && !channels.email) {
          return Response.json({ ok: false, channels }, { status: 502 });
        }

        return Response.json({ ok: true, channels });
      },
    },
  },
});
