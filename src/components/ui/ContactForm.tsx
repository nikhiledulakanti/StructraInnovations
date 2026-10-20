"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { topics, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

type Status = "idle" | "submitting" | "success" | "error";

// topic "" means "not chosen yet": fall back to ?topic= from the URL, then "project"
const empty: ContactInput = { name: "", email: "", company: "", topic: "", message: "" };

const noSubscribe = () => () => {};
function useUrlTopic() {
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => "");
  const topic = new URLSearchParams(search).get("topic");
  return topics.some((t) => t.value === topic) ? (topic as string) : "project";
}

export function ContactForm() {
  const [raw, setValues] = useState<ContactInput>(empty);
  const urlTopic = useUrlTopic();
  const values = { ...raw, topic: raw.topic || urlTopic };
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const update = (key: keyof ContactInput, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };
  const blur = (key: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, company: true, topic: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setServerError("You appear to be offline. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success glass" ref={successRef} tabIndex={-1} role="status">
        <span className="eyebrow">Message received</span>
        <h2>Thanks, {values.name.split(" ")[0]}. We will be in touch.</h2>
        <p className="muted" style={{ margin: 0 }}>
          We reply to every message, usually within two working days. A copy of what you sent is below.
        </p>
        <p className="mono muted" style={{ fontSize: "var(--step--1)", margin: 0, whiteSpace: "pre-wrap" }}>
          {topics.find((t) => t.value === values.topic)?.label}
          {values.message ? `\n\n${values.message}` : ""}
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          style={{ width: "fit-content" }}
          onClick={() => {
            setValues(empty);
            setTouched({});
            setErrors({});
            setStatus("idle");
            startedAt.current = Date.now();
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldProps = (key: keyof ContactInput) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onBlur: () => blur(key),
    "aria-invalid": touched[key] && errors[key] ? true : undefined,
    "aria-describedby": touched[key] && errors[key] ? `contact-${key}-error` : undefined,
  });
  const showError = (key: keyof ContactInput) =>
    touched[key] && errors[key] ? (
      <p className="field__error" id={`contact-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;

  return (
    <form className="form glass" onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
      {status === "error" && serverError && (
        <div className="form-status form-status--error" role="alert" ref={errorRef} tabIndex={-1}>
          {serverError}
          {site.email ? (
            <>
              {" "}
              You can also email <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a>.
            </>
          ) : null}
        </div>
      )}
      <div className="form-row">
        <div className="field" data-invalid={Boolean(touched.name && errors.name)}>
          <label htmlFor="contact-name">Name</label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required onChange={(e) => update("name", e.target.value)} />
          {showError("name")}
        </div>
        <div className="field" data-invalid={Boolean(touched.email && errors.email)}>
          <label htmlFor="contact-email">Email</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required onChange={(e) => update("email", e.target.value)} />
          {showError("email")}
        </div>
      </div>
      <div className="form-row">
        <div className="field" data-invalid={Boolean(touched.company && errors.company)}>
          <label htmlFor="contact-company">Company (optional)</label>
          <input {...fieldProps("company")} type="text" autoComplete="organization" onChange={(e) => update("company", e.target.value)} />
          {showError("company")}
        </div>
        <div className="field" data-invalid={Boolean(touched.topic && errors.topic)}>
          <label htmlFor="contact-topic">What is this about?</label>
          <select {...fieldProps("topic")} onChange={(e) => update("topic", e.target.value)}>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {showError("topic")}
        </div>
      </div>
      <div className="field" data-invalid={Boolean(touched.message && errors.message)}>
        <label htmlFor="contact-message">
          {values.topic === "project" || values.topic === "other" ? "Tell us about it" : "Anything to add? (optional)"}
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          onChange={(e) => update("message", e.target.value)}
          placeholder="What are you building, where are you stuck, and when do you need it?"
        />
        {showError("message") ?? <p className="field__hint">No NDAs needed for a first conversation; share only what you are comfortable with.</p>}
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="btn-row" style={{ alignItems: "center", justifyContent: "space-between" }}>
        <p className="field__hint" style={{ maxWidth: "44ch" }}>
          We use your details only to reply. See our <a href="/privacy" style={{ textDecoration: "underline" }}>privacy policy</a>.
        </p>
        <button type="submit" className="btn" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Arrow />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
