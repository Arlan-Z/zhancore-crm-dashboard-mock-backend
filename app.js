import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const dataPath = path.join(__dirname, "data.json");

function readContacts() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function writeContacts(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/contacts", (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const contacts = readContacts();
  const newContact = {
    ...req.body,
    createdOn: new Date(),
    modifiedOn: new Date(),
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.status(201).json(newContact);
});

app.put("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, details, message } = req.body;

  const contacts = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const contactIndex = contacts.findIndex(c => c.id === id);

  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const updatedContact = {
    ...contacts[contactIndex],
    name: name || contacts[contactIndex].name,
    details: details || contacts[contactIndex].details,
    message: message || contacts[contactIndex].message,
    modifiedOn: new Date()
  };

  contacts[contactIndex] = updatedContact;

  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2), "utf-8");

  res.json({ message: "Contact updated successfully", contact: updatedContact });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
});
