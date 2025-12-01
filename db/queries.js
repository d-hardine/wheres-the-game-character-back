const pool = require("./pool");

async function getAllNames(consoleName) {
  const { rows } = await pool.query("SELECT * FROM leaderboard WHERE consoles = ($1) ORDER BY time", [consoleName]);
  return rows;
}

async function getSlowestName(consoleName) {
  const { rows } = await pool.query("SELECT * FROM leaderboard WHERE consoles = ($1) ORDER BY time DESC LIMIT 1", [consoleName]);
  return rows;
}

async function updateLeaderboard(username, time, slowestId) {
  await pool.query("UPDATE leaderboard SET name = ($1), time = ($2) WHERE id = ($3)", [username, time, slowestId])
}

module.exports = {
  getAllNames,
  getSlowestName,
  updateLeaderboard,
};