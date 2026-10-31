"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { profile } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initial: FormState = { name: "", email: "", subject: "", message: "" };

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name";
  else if (form.name.trim().length < 2) errors.name = "Name is too short";

  if (!form.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address";

  if (!form.message.trim()) errors.message = "Please write a message";
  else if (form.message.trim().length < 10)
    errors.message = "Message is too short (min 10 characters)";

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {}
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      const next = validate({ ...form, [key]: value });
      setErrors((prev) => ({ ...prev, [key]: next[key] }));
    }
  }

  function onBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const next = validate(form);
    setErrors((prev) => ({ ...prev, [key]: next[key] }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorText(
        "The form isn't connected to a backend yet. Please email me directly using the link below."
      );
      return;
    }

    setStatus("submitting");
    setErrorText("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || "Portfolio inquiry",
          message: form.message,
          _replyto: form.email,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          errors?: { message: string }[];
        } | null;
        throw new Error(
          data?.errors?.[0]?.message || "Couldn't send message. Please try again."
        );
      }

      setStatus("success");
      setForm(initial);
      setErrors({});
      setTouched({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorText(
        err instanceof Error ? err.message : "Network error. Please try again."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          value={form.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
          onBlur={() => onBlur("name")}
          required
          autoComplete="name"
        />
        <Field
          label="Your Email"
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
          onBlur={() => onBlur("email")}
          required
          autoComplete="email"
        />
      </div>

      <Field
        label="Subject"
        id="subject"
        type="text"
        placeholder="Project inquiry"
        value={form.subject}
        error={errors.subject}
        onChange={(v) => update("subject", v)}
        onBlur={() => onBlur("subject")}
      />

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-text"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full resize-y rounded-xl border bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 ${
            errors.message
              ? "border-red-500/60 focus:border-red-500"
              : "border-border focus:border-accent"
          }`}
        />
        {errors.message && (
          <ErrorMessage id="message-error" text={errors.message} />
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition-all hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "submitting" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Message sent — thanks!
          </>
        )}
        {(status === "idle" || status === "error") && (
          <>
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {status === "success" && (
        <p className="flex items-center justify-center gap-2 text-center text-sm text-emerald-500">
          <CheckCircle2 className="h-4 w-4" />
          I&apos;ll reply within 24 hours.
        </p>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center text-sm">
          <p className="flex items-center justify-center gap-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
            {errorText}
          </p>
          <a
            href={profile.socials.email}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            Email me directly: {profile.email}
          </a>
        </div>
      )}

      {status === "idle" && (
        <p className="text-center text-xs text-muted">
          Or email me directly:{" "}
          <a
            href={profile.socials.email}
            className="text-accent hover:underline"
          >
            {profile.email}
          </a>
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  autoComplete?: string;
};

function Field({
  label,
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  required,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete ?? "off"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-border focus:border-accent"
        }`}
      />
      {error && <ErrorMessage id={`${id}-error`} text={error} />}
    </div>
  );
}

function ErrorMessage({ id, text }: { id: string; text: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500"
    >
      <AlertCircle className="h-3.5 w-3.5" />
      {text}
    </p>
  );
}
