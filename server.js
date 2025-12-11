const express = require("express");
const cors = require("cors");
const katalogRoutes = require("./routes/katalogRoutes");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Gunakan routes katalog
app.use("/buku", katalogRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
