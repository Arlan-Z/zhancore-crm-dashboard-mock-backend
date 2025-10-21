import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const dataPath = path.join(__dirname, "data.json");

const firstNames = [
  "John", "Emily", "Michael", "Sarah", "David", "Jessica", "Daniel",
  "Laura", "James", "Olivia", "Robert", "Emma", "William", "Sophia",
  "Alexander", "Grace", "Ethan", "Chloe", "Benjamin", "Lily",
  "Lucas", "Amelia", "Henry", "Isabella", "Jack", "Mia",
  "Noah", "Ella", "Logan", "Ava"
];

const lastNames = [
  "Smith", "Johnson", "Brown", "Davis", "Wilson", "Miller", "Anderson",
  "Thomas", "Taylor", "Martin", "Moore", "Jackson", "White", "Harris",
  "Lewis", "Clark", "Hall", "Allen", "Young", "King",
  "Wright", "Scott", "Green", "Adams", "Baker", "Nelson",
  "Carter", "Roberts", "Turner", "Phillips"
];

const messages = [
  "Need CRM access", "Interested in demo", "Please contact me",
  "Looking for support", "Want to upgrade", "Billing issue",
  "Feature request", "Feedback on product", "Requesting quote", "Technical question"
];

function randomDateThisYear() {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPhone() {
  return `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

function generateContacts(count = 35) {
  const contacts = [];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${first} ${last}`;
    const createdOn = randomDateThisYear();
    const modifiedOn = new Date(createdOn.getTime() + Math.random() * 1000 * 60 * 60 * 24 * 30);
    const message = messages[Math.floor(Math.random() * messages.length)];

    contacts.push({
      id,
      name,
      details: randomPhone(),
      message,
      createdOn,
      modifiedOn,
    });
  }

  return contacts;
}

if (!fs.existsSync(dataPath)) {
  const data = generateContacts();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`[!] data.json created with ${data.length} contacts`);
} else {
  console.log("[!] data.json exists, migration skipped");
}
