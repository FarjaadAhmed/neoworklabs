"use server";

import { Resend } from "resend";

type ContactState = { success: true } | { error: string } | null;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      error:
        "Email service not configured. Please contact us directly at info@neoworklabs.com",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>",
    to: "info@neoworklabs.com",
    replyTo: email,
    subject: `Project inquiry from ${name}`,
    html: `
      <h2>New project inquiry</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr />
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return {
      error: "Failed to send message. Please try again or email us directly.",
    };
  }

  return { success: true };
}
