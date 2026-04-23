import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/send-gift")({
  // @ts-expect-error - server handlers are supported at runtime by TanStack Start
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as {
            phone?: string;
            amount?: string;
          };
          const phone = (body.phone || "").trim();
          const amount = (body.amount || "").toString().trim();

          // Basic validation
          if (!phone || phone.length < 7 || phone.length > 20) {
            return Response.json(
              { ok: false, message: "හරි phone number එකක් දාන්න 💗" },
              { status: 400 }
            );
          }
          if (!/^\+?[0-9\s-]+$/.test(phone)) {
            return Response.json(
              { ok: false, message: "Phone number එකේ අකුරු තියෙනවා 🙈" },
              { status: 400 }
            );
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
          const TWILIO_FROM = process.env.TWILIO_FROM_NUMBER;

          // If Twilio is not connected yet, give a friendly response so the UI still works
          if (!LOVABLE_API_KEY || !TWILIO_API_KEY || !TWILIO_FROM) {
            return Response.json({
              ok: true,
              demo: true,
              message:
                "Demo mode: SMS sending තාම setup වෙලා නෑ, ඒත් අපි pretend කරමු 💗",
            });
          }

          const messageBody = `💗 සුභ උපන්දිනක් මගේ ආදරේ! මගෙන් පොඩි gift එකක් ඔයාට: රු. ${amount}/=. ❤️ ඔයාට ආදරෙයි.`;

          const res = await fetch(
            `https://connector-gateway.lovable.dev/twilio/Messages.json`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "X-Connection-Api-Key": TWILIO_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                To: phone,
                From: TWILIO_FROM,
                Body: messageBody,
              }),
            }
          );

          const data = (await res.json()) as { sid?: string; message?: string };
          if (!res.ok) {
            console.error("Twilio error:", data);
            return Response.json(
              {
                ok: false,
                message:
                  data.message || "SMS යවන්න බැරි වුණා. ආයෙත් try කරන්න.",
              },
              { status: 502 }
            );
          }

          return Response.json({ ok: true, sid: data.sid });
        } catch (err) {
          console.error("send-gift error:", err);
          return Response.json(
            { ok: false, message: "මොකක්හරි වැරදුනා. ආයෙත් try කරන්න." },
            { status: 500 }
          );
        }
      },
    },
  },
});
