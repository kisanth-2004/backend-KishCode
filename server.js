


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");

// const connectDB = require("./config/db");
// const reviewRoutes = require("./routes/reviewRoutes");

// dotenv.config();

// const app = express();

// // =========================
// // MongoDB
// // =========================

// connectDB();

// // =========================
// // Middleware
// // =========================

// app.use(cors());
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("dev"));

// // =========================
// // Home Route
// // =========================

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "KishCode Backend is running 🚀",
//   });
// });

// // =========================
// // Review Routes
// // =========================

// app.use("/api/reviews", reviewRoutes);

// // =========================
// // Server
// // =========================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`KishCode Backend running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

// =========================
// MongoDB
// =========================

connectDB();

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KishCode Backend is running 🚀",
  });
});

// =========================
// Review Routes
// =========================

app.use("/api/reviews", reviewRoutes);

// =========================
// Booking Routes
// =========================

app.use("/api/bookings", bookingRoutes);

// =========================
// Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`KishCode Backend running on port ${PORT}`);
});