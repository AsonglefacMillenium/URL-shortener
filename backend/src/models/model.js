const { pool } = require("../db/connection");


exports.createShortUrl = async (originalUrl, shortUrl, expiresAt) => {
  try {
    const query = `
      INSERT INTO urls (original_url, short_url, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [originalUrl, shortUrl, expiresAt];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    throw new Error("Short URL creation failed");
  }
};


exports.findUrlByShortCode = async (shortUrl) => {
  try {
    const query = `
      SELECT * FROM urls
      WHERE short_url = $1;
    `;
    const result = await pool.query(query, [shortUrl]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching short URL:", error.message);
    throw new Error("Short URL fetch failed");
  }
};


exports.deleteUrlByShortCode = async (shortUrl) => {
  try {
    const query = `
      DELETE FROM urls
      WHERE short_url = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [shortUrl]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting short URL:", error.message);
    throw new Error("Short URL deletion failed");
  }
};


exports.incrementClickCount = async (shortUrl) => {
  try {
    const query = `
      UPDATE urls
      SET click_count = click_count + 1
      WHERE short_url = $1;
    `;
    await pool.query(query, [shortUrl]);
  } catch (error) {
    console.error("Error incrementing click count:", error.message);
    throw new Error("Failed to increment click count");
  }
};


exports.logClickAnalytics = async (shortUrl, ipAddress) => {
  try {
    const query = `
      INSERT INTO analytics (short_url, ip_address)
      VALUES ($1, $2);
    `;
    await pool.query(query, [shortUrl, ipAddress]);
  } catch (error) {
    console.error("Error logging click analytics:", error.message);
    throw new Error("Failed to log analytics");
  }
};


exports.getAnalytics = async (shortUrl) => {
  try {
    const clickCountQuery = `
      SELECT click_count FROM urls
      WHERE short_url = $1;
    `;
    const analyticsQuery = `
      SELECT ip_address, click_time
      FROM analytics
      WHERE short_url = $1
      ORDER BY click_time DESC
      LIMIT 5;
    `;

    const clickCountResult = await pool.query(clickCountQuery, [shortUrl]);
    const analyticsResult = await pool.query(analyticsQuery, [shortUrl]);

    if (clickCountResult.rowCount === 0) {
      return null;
    }

    return {
      clickCount: clickCountResult.rows[0].click_count,
      recentClicks: analyticsResult.rows,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    throw new Error("Failed to fetch analytics");
  }
};
