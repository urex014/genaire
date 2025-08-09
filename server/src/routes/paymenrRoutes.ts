import { Router, Request, Response } from "express";
import { initializeTransaction, verifyTransaction } from "../services/paystack";

const router = Router();

// Initialize payment
router.post("/init", async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) {
      return res.status(400).json({ error: "Email and amount are required" });
    }

    const initResponse = await initializeTransaction(email, amount);
    res.json(initResponse);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// Verify payment
router.get("/verify/:reference", async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;
    if (!reference) {
      return res.status(400).json({ error: "Reference is required" });
    }

    const verifyResponse = await verifyTransaction(reference);
    res.json(verifyResponse);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

export default router;
