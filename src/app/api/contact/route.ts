import { validateContact, type ContactInput } from "@/lib/contact";

// Best-effort, per-instance rate limit. Put a proper limiter in front for high traffic.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
  const input: ContactInput = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    topic: str("topic"),
    message: str("message"),
  };

  // Spam traps: a hidden field humans never fill, and a minimum time on the form.
  // Bots get a normal-looking success so they do not adapt.
  const startedAt = Number(body.startedAt);
  if (str("website") || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set; message not forwarded:", input);
      return Response.json({ ok: true });
    }
    return Response.json(
      { ok: false, error: "Our form is not connected yet. Please email us instead." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { "x-webhook-secret": process.env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ ...input, receivedAt: new Date().toISOString(), source: "website" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] forward failed", err);
    return Response.json(
      { ok: false, error: "We could not send your message just now. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
