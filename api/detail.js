const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

export default function handler(req, res) {
  const judul = req.query.judul;
  const filePath = path.join(process.cwd(), "KATALOG_2014A.csv");

  let found = null;

  fs.createReadStream(filePath)
    .pipe(
      csv({
        separator: ";",
        mapHeaders: ({ header }) =>
          header.trim().toUpperCase().replace(/\./g, "").replace(/\s+/g, "_"),
      })
    )
    .on("data", (row) => {
      if (row.JUDUL_BUKU && row.JUDUL_BUKU.trim() === judul.trim()) {
        found = row;
      }
    })
    .on("end", () => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ error: "Buku tidak ditemukan" });
      }
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
}
