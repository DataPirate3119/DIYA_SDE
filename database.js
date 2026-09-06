const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./manthan.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tips (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL, createdAt TEXT NOT NULL)`);

  db.run(`CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY AUTOINCREMENT, mood TEXT NOT NULL, date TEXT NOT NULL)`);

  db.run(`CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL)`);

  db.get("SELECT COUNT(*) AS count FROM resources", (err, row) => {
    if (row.count === 0) {
      const insert = db.prepare(`INSERT INTO resources (title, category, description) VALUES (?, ?, ?)`);
      insert.run("Managing Exam Stress", "academic", "Simple techniques for managing academic pressure.");
      insert.run("Better Sleep Habits", "sleep", "Build healthy sleep habits and feel more refreshed.");
      insert.run("Handling Conflicts", "social well-being", "Make friends, handle conflicts, and feel connected.");
      insert.run("Daily Breathing", "mindfulness", "Breathe, take breaks, and stay present.");
      insert.finalize();
    }
  });
});

module.exports = db;
