import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const IOIS_SYSTEM_INSTRUCTION = `
You are the official AI Assistant for the "IOIS PLATFORM" (Indian Online Income Supporting System).
You speak fluently in Hindi (Devanagari script), Hinglish, and English depending on the user's language.

Your core purpose:
1. Explain the IOIS Platform clearly, professionally, and honestly to new and existing users.
2. Explain the 7 income and skill plans in detail with accurate pricing and instant payout amounts:
   - Plan 01: Bal Vikas Access - ₹10 (Class 1-5 NCERT PDFs, Worksheets, Entry Pass) -> ₹7 Instant Payout per Referral (70%)
   - Plan 02: Youth Skill Access - ₹49 (Pro CV Templates, AI Prompt Guide, Job Tools) -> ₹34 Instant Payout per Referral (70%)
   - Plan 03: Career & Job Access - ₹99 (Class 6-12 Books, Career Guidance, Advanced Resources) -> ₹64 Instant Payout per Referral (65%)
   - Plan 04: Family VIP Access - ₹199 (Parents Corner, Lifestyle Tips, Digital Security) -> ₹119 Instant Payout per Referral (60%)
   - Plan 05: Student Elite Access - ₹299 (Competitive Exam Notes, VIP Group Access) -> ₹179 Instant Payout per Referral (60%)
   - Plan 06: Agency Reseller Hub - ₹499 (Reselling Rights, Automation, Business Dashboard) -> ₹274 Instant Payout per Referral (55%)
   - Plan 07: Lifetime Master Access - ₹999 (All 6 plans combined, lifetime updates, master licensing) -> ₹499 Instant Payout per Referral (50%)
3. Clarify doubts directly without complicated technical jargon.
4. Official Contact Channels:
   - WhatsApp Support: +91 8877490845
   - Official Telegram: @ioisplatform
   - Email: ioisplatform@gmail.com
   - Official Verification Pass Form: https://docs.google.com/forms/d/e/1FAIpQLSdIEpw4EU8bqPSxkH_Ku9RCabSyw4RrrZ32ydbLHTo-wPIohw/viewform?usp=header
5. Answering General / Outside Questions:
   - If the user asks general questions (e.g., career, study, digital marketing, technology, general knowledge), answer them accurately, concisely, and intelligently like a top-tier AI.
6. Tone: Warm, respectful, encouraging, transparent, and structured with bullet points.
`;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: Gemini Chatbot
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGenAI();

      if (ai) {
        // Construct conversation contents with system prompt
        let formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history) && history.length > 0) {
          formattedContents = history.map((msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          }));
        }

        formattedContents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: formattedContents,
          config: {
            systemInstruction: IOIS_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const replyText = response.text || "माफ़ कीजिए, मुझे उत्तर जनरेट करने में समस्या आई। कृपया पुनः प्रयास करें।";
        return res.json({ reply: replyText });
      } else {
        // Intelligent localized fallback when GEMINI_API_KEY is not configured
        const lower = message.toLowerCase();
        let fallbackReply = "";

        if (lower.includes("plan") || lower.includes("प्लान") || lower.includes("रेट") || lower.includes("कीमत")) {
          fallbackReply = `IOIS प्लेटफॉर्म पर कुल 7 मुख्य प्लांस उपलब्ध हैं:\n\n1. **Plan 01: Bal Vikas (₹10)** - ₹7 इंस्टेंट पेआउट (70%)\n2. **Plan 02: Youth Skill (₹49)** - ₹34 इंस्टेंट पेआउट (70%)\n3. **Plan 03: Career & Job (₹99)** - ₹64 इंस्टेंट पेआउट (65%)\n4. **Plan 04: Family VIP (₹199)** - ₹119 इंस्टेंट पेआउट (60%)\n5. **Plan 05: Student Elite (₹299)** - ₹179 इंस्टेंट पेआउट (60%)\n6. **Plan 06: Agency Reseller (₹499)** - ₹274 इंस्टेंट पेआउट (55%)\n7. **Plan 07: Master Lifetime (₹999)** - ₹499 इंस्टेंट पेआउट (50%)\n\nआप किसी भी प्लान से अपनी शुरुआत कर सकते हैं!`;
        } else if (lower.includes("iois") || lower.includes("क्या है") || lower.includes("about") || lower.includes("काम")) {
          fallbackReply = `**IOIS (Indian Online Income Supporting System)** एक राष्ट्रीय डिजिटल लर्निंग और सपोर्टिंग प्लेटफॉर्म है। यहाँ आपको NCERT बुक्स, प्रोफेशनल CV टेम्प्लेट्स, AI प्रॉम्ट गाइड्स और करियर स्किल्स मिलते हैं, साथ ही हर रेफरल पर डायरेक्ट **इंस्टेंट पेआउट** मिलता है।\n\nआधिकारिक संपर्क:\n- व्हाट्सएप: +91 8877490845\n- टेलीग्राम: @ioisplatform`;
        } else if (lower.includes("payout") || lower.includes("पेआउट") || lower.includes("पैसे") || lower.includes("रुपये")) {
          fallbackReply = `IOIS में **स्मार्ट इंस्टेंट पेआउट प्रोटोकॉल** है। जब भी आपके द्वारा कोई नया यूजर किसी प्लान में वेरिफाई होता है, उसका इंसेंटिव (जैसे Plan 01 में ₹7, Plan 07 में ₹499) तुरंत आपके खाते/वॉलेट में क्रेडिट हो जाता है।`;
        } else {
          fallbackReply = `नमस्ते! मैं IOIS AI असिस्टेंट हूँ। आप IOIS के 7 प्लांस, डिजिटल स्किल्स, इंस्टेंट पेआउट प्रोसेस या किसी भी अन्य विषय पर सवाल पूछ सकते हैं। आप क्या जानना चाहते हैं?`;
        }

        return res.json({ reply: fallbackReply });
      }
    } catch (err: any) {
      console.error("Chat API Error:", err);
      return res.status(500).json({
        reply: "तकनीकी त्रुटि के कारण उत्तर प्राप्त नहीं हो सका। कृपया थोड़ी देर बाद पुनः प्रयास करें या हमारे व्हाट्सएप सपोर्ट +91 8877490845 पर संपर्क करें।",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IOIS Server is running on port ${PORT}`);
  });
}

startServer();
