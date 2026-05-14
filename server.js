const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

const DB_FILE = "./db.json";

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "[]");
}

// GET
app.get("/api/applicants", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

// POST
app.post("/api/applicants", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  data.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});