const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB_FILE = "db.json";

// ======================
// LOAD DATA
// ======================
function loadData() {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    } catch (err) {
        return [];
    }
}

// ======================
// SAVE DATA
// ======================
function saveData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ======================
// GET APPLICANTS
// ======================
app.get("/api/applicants", (req, res) => {
    const data = loadData();
    res.json(data);
});

// ======================
// POST APPLICANT
// ======================
app.post("/api/applicants", (req, res) => {
    const data = loadData();
    data.push(req.body);
    saveData(data);
    res.json({ success: true });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
