"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { Field, Input } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/choice";
import { Button } from "@/components/ui/button";

/**
 * Account form. Frontend-only: validates locally and navigates on submit.
 * The real API call (POST /auth/register) is wired in the backend phase.
 */
export function SignupForm({ submitLabel, next }: { submitLabel: string; next: string }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const password = String(data.get("password") ?? "");
        if (!name || !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter your full name and a valid email.");
        if (password.length < 10) return setError("Use at least 10 characters for your password.");
        if (!agree) return setError("Please accept the Terms and Privacy Policy.");
        setError(null);
        router.push(next);
      }}
    >
      <Field label="Full name" htmlFor="name">
        <div className="relative">
          <Input id="name" name="name" autoComplete="name" placeholder="Aziza Karimova" className="pr-12" />
          <User className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden />
        </div>
      </Field>
      <Field label="Email" htmlFor="email">
        <div className="relative">
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" className="pr-12" />
          <Mail className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden />
        </div>
      </Field>
      <Field label="Password" htmlFor="password">
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 10 characters"
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-500 hover:text-brand-600"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>
      <Checkbox checked={agree} onChange={setAgree}>
        I agree to the <span className="font-semibold text-brand-600">Terms</span> and{" "}
        <span className="font-semibold text-brand-600">Privacy Policy</span>
      </Checkbox>
      {error ? (
        <p role="alert" className="rounded-[12px] bg-coral-soft px-4 py-2.5 text-[13px] font-medium text-coral-ink">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full">
        {submitLabel}
      </Button>
      <div className="flex items-center gap-3 text-[13px] text-ink-500">
        <span className="h-px flex-1 bg-ink-200" /> or <span className="h-px flex-1 bg-ink-200" />
      </div>
      <Button variant="outline" size="lg" className="w-full" onClick={() => router.push(next)}>
        Continue with Google
      </Button>
    </form>
  );
}
