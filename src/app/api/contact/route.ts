import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Visitor input goes into an HTML email, so escape it first
const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: real visitors never see or fill this field, bots do
    if (body.website) return NextResponse.json({ success: true });

    const fields = {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      subject: String(body.subject ?? "").trim(),
      message: String(body.message ?? "").trim(),
    };
    const { name, email, subject, message } = fields;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).find(
      (key) => fields[key].length > LIMITS[key]
    );
    if (tooLong) {
      return NextResponse.json(
        { error: `The ${tooLong} is too long` },
        { status: 400 }
      );
    }

    // 1. Save to database
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // 2. Send email (the message is already saved, so a mail failure isn't fatal)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_RECEIVER_EMAIL!],
        replyTo: email,
        subject: `New Contact Message: ${subject.replace(/[\r\n]+/g, " ")}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send contact email:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Messages hold visitors' names and emails, so only the admin can read them
export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

