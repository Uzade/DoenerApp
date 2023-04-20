INSERT INTO users (uid, apiKey) VALUES (?, ?)
ON CONFLICT(uid) DO UPDATE SET apiKey = ?