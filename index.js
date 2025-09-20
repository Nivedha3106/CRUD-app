const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//variables
let users = [];
let idCounter = 1;

// CREATE user
app.post("/users", (req, res) => {
  const { name, dob, aadhaar } = req.body;

  if (!name || !dob || !aadhaar) {
    return res.status(400).json({ error: "name, dob, and aadhaar are required" });
  }

  const newUser = {
    id: idCounter++,
    name,
    dob,
    aadhaar
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all the records
app.get("/users", (req, res) => {
  res.json(users);
});

//Get single records
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Update the record
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, dob, aadhaar } = req.body;

  if (name) user.name = name;
  if (dob) user.dob = dob;
  if (aadhaar) user.aadhaar = aadhaar;

  res.json(user);
});

// Delete the record
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});