const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://dhiva:12349876@localhost:5432/game_leaderboards"
});