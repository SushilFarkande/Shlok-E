import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, reason } = await req.json();

    if (!name || !email || !phone || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || "shlokmanufacturers@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, // 10 seconds timeout
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "shlokmanufacturers@gmail.com",
      to: "shlokmanufacturers@gmail.com",
      subject: `New Distributorship Request from ${name}`,
      text: `
You have received a new distributorship request.

Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Reason for distributorship:
${reason}
      `,
      html: `
        <h2>New Distributorship Request</h2>
        <p>You have received a new request from <strong>${name}</strong>.</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <h3>Reason for distributorship:</h3>
        <p>${reason.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
