import React, { useState } from "react";

type ContactState = { name: string; email: string; message: string };

export const ContactForm: React.FC<{ endpoint?: string }> = ({
  endpoint = "/api/contact",
}) => {
  const [state, setState] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // stub: replace with actual request
      console.log(endpoint, state);
      await new Promise((r) => setTimeout(r, 600));
      setSuccess(true);
      setState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="text-sm text-[var(--text)]">Name</label>
      <input
        name="name"
        value={state.name}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        required
      />

      <label className="text-sm text-[var(--text)]">Email</label>
      <input
        name="email"
        type="email"
        value={state.email}
        onChange={update}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        required
      />

      <label className="text-sm text-[var(--text)]">Message</label>
      <textarea
        name="message"
        value={state.message}
        onChange={update}
        rows={6}
        className="w-full px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
        required
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg text-white bg-[var(--brand)]"
        >
          {loading ? "Sending..." : "Send message"}
        </button>
      </div>

      {success === true && (
        <div className="text-sm text-green-600">Message sent — thank you!</div>
      )}
      {success === false && (
        <div className="text-sm text-red-600">
          Failed to send. Try again later.
        </div>
      )}
    </form>
  );
};
