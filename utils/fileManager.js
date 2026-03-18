const fs = require("fs/promises");
async function readJSON(path) {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
}
async function writeJSON(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}
module.exports = { readJSON, writeJSON };