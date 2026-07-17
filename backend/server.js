const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment keys if present

const productRoutes = require("./src/routes/productRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

// Start server locally, but do not listen in serverless (Vercel) env
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

