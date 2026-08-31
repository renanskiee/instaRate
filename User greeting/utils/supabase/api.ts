import { projectId } from "./info.tsx";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-980e6b58`;

export async function submitFeedback(name: string | null, message: string): Promise<void> {
  const res = await fetch(`${BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name || null, message }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to submit feedback.");
  }
}
