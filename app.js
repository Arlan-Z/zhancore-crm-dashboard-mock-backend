import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
});
