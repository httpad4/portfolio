import { useState } from "react";

/**
 * Contact — a message form.
 * Messages are delivered to your inbox via FormSubmit.co (no backend needed).
 *
 * EDIT:
 *   - FORM_ENDPOINT → your email address
 */
/* FormSubmit delivers submissions to this address.
   The first submission sends an activation email to the address below. */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/arjaydelosangeles88@gmail.com";

const EMPTY_FORM = { name: "", email: "", message: "", _honey: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const updateField = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot — silently ignore bots
    if (form._honey) return;

    setStatus("sending");
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        // lets you reply directly to the sender
        _replyto: form.email.trim(),
        _subject: `Portfolio message from ${form.name.trim() || "a website visitor"}`,
        _honey: form._honey,
        _captcha: "false",
        _template: "table",
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json();
      } else {
        // Non-JSON response (e.g. an error page) — surface it
        const text = await res.text();
        throw new Error(
          text.slice(0, 160) || `Unexpected response (HTTP ${res.status}).`
        );
      }

      if (!res.ok) {
        throw new Error(
          data.message || `Server error (HTTP ${res.status}). Try again later.`
        );
      }

      if (String(data.success) !== "true") {
        // Show the real reason FormSubmit gives (activation pending,
        // rate limit, blocked, invalid email, etc.)
        throw new Error(
          data.message ||
            "Message was not sent. FormSubmit returned an unknown error."
        );
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Message failed to send. Please try again later.");
    }
  };

  return (
    <div className="page">
      <h1 className="page-heading">Contact</h1>
      <p className="page-subtitle">ping me_</p>

      {/* Message form */}
      <div className="section-block">
        <p className="section-title">send a message</p>

        {status === "success" ? (
          <div className="form-status success">
            Message sent. I&apos;ll get back to you soon.
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              name="_honey"
              value={form._honey}
              onChange={updateField}
              className="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="form-group">
              <span className="form-label">name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Your name"
                required
                className="form-input"
              />
            </label>

            <label className="form-group">
              <span className="form-label">email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </label>

            <label className="form-group">
              <span className="form-label">message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Say hello..."
                rows={5}
                required
                className="form-input form-textarea"
              />
            </label>

            {status === "error" && <p className="form-status error">{error}</p>}

            <button
              type="submit"
              className="form-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "sending..." : "send message_"}
            </button>
          </form>
        )}

        <p className="form-note">
          Messages are delivered to arjaydelosangeles88@gmail.com via
          FormSubmit.co. The first submission sends a one-time activation email
          to that address — click the link inside it before sending more. If
          the form reports an error, the message below shows the exact reason.
        </p>
      </div>
    </div>
  );
}