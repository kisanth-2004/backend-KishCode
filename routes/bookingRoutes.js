const express = require("express");
const Booking = require("../models/Booking");
const twilio = require("twilio");

const router = express.Router();

// =========================
// CREATE BOOKING
// =========================
router.post("/", async (req, res) => {
  try {
    const { name, phone, service } = req.body;

    // =========================
    // VALIDATION
    // =========================
    if (!name || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and service are required",
      });
    }

    // =========================
    // CREATE TWILIO CLIENT
    // =========================
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH
    );

    // =========================
    // SAVE BOOKING TO MONGODB
    // =========================
    const booking = await Booking.create({
      name,
      phone,
      service,
    });

    console.log("Booking saved:", booking._id);

    // =========================
    // WHATSAPP MESSAGE
    // =========================
    const message = `
*KishCode - New Project Inquiry* 🚀

👤 *Name:* ${booking.name}
📱 *Phone:* ${booking.phone}
💼 *Service:* ${booking.service}

📅 *Booking ID:* ${booking._id}

Please contact the customer as soon as possible.
`;

    // =========================
    // SEND WHATSAPP
    // =========================
    const twilioMessage = await client.messages.create({
  from: process.env.TWILIO_WHATSAPP_FROM,
  to: process.env.TWILIO_WHATSAPP_TO,
  body: message,
});
    console.log(
      "WhatsApp sent successfully:",
      twilioMessage.sid
    );

    // =========================
    // RESPONSE
    // =========================
    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      booking,
    });
  } catch (error) {
    console.error("========== BOOKING ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Status:", error.status);
    console.error("More Info:", error.moreInfo);
    console.error("===================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;