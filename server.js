const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB_FILE = "db.json";

// read data
function readData() {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE));
}

// write data
function writeData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET applicants
app.get("/api/applicants", (req, res) => {
    res.json(readData());
});

// POST applicant
app.post("/api/applicants", (req, res) => {
    let data = readData();
    data.push(req.body);
    writeData(data);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
