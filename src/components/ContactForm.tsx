import React, { useState } from "react";

type ContactState = { name: string; email: string; message: string };

export const ContactForm: React.FC<{
  sendTo?: string; // recipient email address (optional; fallback to VITE_CONTACT_EMAIL)
}> = ({ sendTo }) => {
  const [state, setState] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // pick recipient from prop or from Vite env (if available)
  const DEFAULT_TO = sendTo ?? import.meta.env.VITE_CONTACT_EMAIL ?? "";

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setErrorMsg(null);

    const endpoint = import.meta.env.VITE_MAIL_API_URL + "/send";

    // require a recipient address somewhere (either env or passed prop)
    if (!DEFAULT_TO) {
      console.warn(
        "ContactForm: no recipient configured. Set VITE_CONTACT_EMAIL or pass sendTo prop."
      );
      setErrorMsg(
        "Recipient address not configured. Contact admin to enable messaging."
      );
      setSuccess(false);
      setLoading(false);
      return;
    }

    const payload = {
      to: DEFAULT_TO,
      subject: `Website contact from ${state.name || state.email}`,
      body: `${state.message}\n\n---\nFrom: ${state.name || "Anonymous"} <${
        state.email
      }>`,
      html: false,
      from_name: state.name || undefined,
      from_email: state.email || undefined,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Server returned ${res.status}`);
      }

      // success
      setSuccess(true);
      setState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send contact message", err);
      setSuccess(false);
      setErrorMsg((err as Error).message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" aria-live="polite">
      <label htmlFor="name" className="text-sm text-[var(--text)]">Name</label>
      <input
        id="name"
        name="name"
        title="Name"
        placeholder="Your name"
        value={state.name}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="email" className="text-sm text-[var(--text)]">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        title="Email"
        placeholder="Your email"
        value={state.email}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]" />
      <label htmlFor="message" className="text-sm text-[var(--text)]">Message</label>
      <textarea
        id="message"
        name="message"
        title="Message"
        placeholder="Your message"
        value={state.message}
        onChange={update}
        rows={6}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        required
      />

      <div className="pt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg text-white bg-[var(--brand)] disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send message"}
        </button>

        {success === true && (
          <div className="text-sm text-green-600">
            Message sent — thank you!
          </div>
        )}
        {success === false && (
          <div className="text-sm text-red-600">
            Failed to send.
            {errorMsg && (
              <>
                {" "}
                <span className="block text-xs text-red-400">{errorMsg}</span>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};
