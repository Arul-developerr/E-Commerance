"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type DemoProfile = { name: string; email: string };
const storageKey = "nexacart-demo-profile";
const subscribe = () => () => {};
const serverSnapshot = () => "";
function browserSnapshot() { try { return localStorage.getItem(storageKey) ?? ""; } catch { return ""; } }
function parseProfile(raw: string): DemoProfile {
  try { const value: unknown = JSON.parse(raw); if (value && typeof value === "object" && "name" in value && "email" in value && typeof value.name === "string" && typeof value.email === "string") return { name: value.name, email: value.email }; } catch { /* Invalid local data is ignored. */ }
  return { name: "", email: "" };
}
export default function ProfilePage() {
  const stored = useSyncExternalStore(subscribe, browserSnapshot, serverSnapshot);
  const [draft, setDraft] = useState<DemoProfile | null>(null);
  const [message, setMessage] = useState("");
  const profile = draft ?? parseProfile(stored);
  function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); try { localStorage.setItem(storageKey, JSON.stringify(profile)); setMessage("Saved in this browser only."); } catch { setMessage("This browser could not save the demo profile."); } }
  return <form onSubmit={save} className="max-w-xl space-y-6"><div><h2 className="text-2xl font-bold">Demo profile</h2><p className="mt-2 text-sm text-brand-text-secondary">Optional details for this browser. They are not sent to a server.</p></div><label className="block text-sm font-semibold">Name<input value={profile.name} onChange={event => { setDraft({ ...profile, name: event.target.value }); setMessage(""); }} autoComplete="name" className="mt-2 block h-12 w-full rounded-xl border border-brand-border px-4 font-normal" placeholder="Your name" /></label><label className="block text-sm font-semibold">Email<input type="email" value={profile.email} onChange={event => { setDraft({ ...profile, email: event.target.value }); setMessage(""); }} autoComplete="email" className="mt-2 block h-12 w-full rounded-xl border border-brand-border px-4 font-normal" placeholder="you@example.com" /></label><Button type="submit">Save locally</Button>{message && <p role="status" className="text-sm text-brand-success">{message}</p>}</form>;
}
