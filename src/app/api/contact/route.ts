// import { NextResponse } from "next/server";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // Importing your existing secure bridge

// // This function handles the POST request from your frontend form
// export async function POST(request: Request) {
//     try {
//         // 1. Unpack the JSON data sent from the frontend
//         const body = await request.json();
//         const { admissionNo, fullName, email, phone, subject, message } = body;

//         // 2. Basic Validation (Ensure the critical fields aren't empty)
//         if (!fullName || !email || !message) {
//             return NextResponse.json(
//                 { error: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         // 3. Save the data to a new "messages" collection in Firestore
//         const messagesCollection = collection(db, "messages");

//         await addDoc(messagesCollection, {
//             admissionNo: admissionNo || "N/A", // If left blank, save as N/A
//             fullName,
//             email,
//             phone: phone || "N/A",
//             subject: subject || "General Inquiry",
//             message,
//             status: "unread",      // Helps the executive committee track new messages
//             createdAt: new Date(), // Timestamps it so you can sort by newest
//         });

//         // 4. Send a success signal back to the frontend
//         return NextResponse.json(
//             { success: true, message: "Message successfully saved to database." },
//             { status: 201 }
//         );

//     } catch (error) {
//         console.error("Backend Error - Failed to save message:", error);

//         // If Firebase fails, tell the frontend there was an error
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        // 1. Get the student's details from the frontend request
        const { email, fullName } = await request.json();

        if (!email || !fullName) {
            return NextResponse.json({ error: "Missing email or name" }, { status: 400 });
        }

        // 2. Configure the Gmail Transporter using your hidden .env variables
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 3. Design the HTML Email Template
        const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0055A2; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ACM SVNIT</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff; color: #333333;">
          <h2 style="color: #0055A2; margin-top: 0;">Hello ${fullName},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to the <strong>Association for Computing Machinery (ACM) Student Chapter at SVNIT</strong>. 
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            We have successfully received your message. Our executive committee reviews all inquiries and will get back to you at this email address as soon as possible.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            In the meantime, stay updated with our latest events and hackathons by visiting our website or following our social media channels!
          </p>
          <br>
          <p style="font-size: 16px; font-weight: bold; margin-bottom: 0;">Best Regards,</p>
          <p style="font-size: 16px; color: #666666; margin-top: 5px;">The ACM SVNIT Executive Committee</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
          This is an automated message. Please do not reply directly to this email.
        </div>
      </div>
    `;

        // 4. Send the email!
        await transporter.sendMail({
            from: `"ACM SVNIT" <${process.env.EMAIL_USER}>`,
            to: email, // Sending to the student who filled out the form
            subject: "We received your message! | ACM SVNIT",
            html: emailHtml,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Nodemailer Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}