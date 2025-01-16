
const { 
  createShortUrl, 
  findUrlByShortCode, 
  deleteUrlByShortCode, 
  incrementClickCount, 
  logClickAnalytics, 
  getAnalytics 
} = require("../models/model");
const { generateShortCode } = require("../utils/utils");


exports.shortenUrl = async (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;

  try {
    
    if (alias) {
      if (alias.length > 20) {
        return res.status(400).json({ error: "Alias cannot exceed 20 characters" });
      }

      const existingAlias = await findUrlByShortCode(alias);
      if (existingAlias) {
        return res.status(400).json({ error: "Alias already in use" });
      }
    }

    const shortCode = alias || generateShortCode();
    const result = await createShortUrl(originalUrl, shortCode, expiresAt);

    if (!result) {
      return res.status(500).json({ error: "Failed to create short URL" });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const fullShortUrl = `${host}/api/${shortCode}`;

    res.status(201).json({
      shortUrl: fullShortUrl,
      originalUrl: result.original_url,
      expiresAt: result.expires_at || null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlData = await findUrlByShortCode(shortUrl);
    if (!urlData) {
      return res.status(404).send("URL not found");
    }

   
    if (urlData.expires_at && new Date() > new Date(urlData.expires_at)) {
      return res.status(410).send("URL has expired");
    }

    
    await incrementClickCount(shortUrl);

   
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    await logClickAnalytics(shortUrl, ipAddress);

   
    res.redirect(urlData.original_url);
    res.status(200).send(urlData.originalUrl)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getInfo = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlData = await findUrlByShortCode(shortUrl);

    const host = req.get("host");
    const protocol = req.protocol;
    const fullShortUrl = `${host}/api/${shortUrl}`;
    if (!urlData) {
      return res.status(404).send("URL not found");
    }
    res.json({
      urlData: urlData,
      shortenedLink: fullShortUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAnalytics = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const analytics = await getAnalytics(shortUrl);
    if (!analytics) {
      return res.status(404).send("URL not found");
    }
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const deleted = await deleteUrlByShortCode(shortUrl);
    if (!deleted) {
      return res.status(404).send("URL not found");
    }
    res.send("URL deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
