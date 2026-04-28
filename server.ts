import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Paystack: Initialize Payment
  app.post("/api/payments/initialize", async (req, res) => {
    try {
      const { email, amount, courseId } = req.body;
      const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

      if (!PAYSTACK_SECRET) {
        return res.status(500).json({ error: "Paystack secret key is missing" });
      }

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100, // Paystack expects amount in Kobo
          callback_url: `${process.env.APP_URL}/dashboard?payment=success&courseId=${courseId}`,
          metadata: {
            courseId,
            custom_fields: [
              {
                display_name: "Course ID",
                variable_name: "course_id",
                value: courseId
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
            "Content-Type": "application/json"
          }
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Paystack Init Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to initialize payment" });
    }
  });

  // Paystack: Verify Payment (Webhook or Manual Trigger)
  app.get("/api/payments/verify/:reference", async (req, res) => {
    try {
      const { reference } = req.params;
      const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`
          }
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Paystack Verify Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
