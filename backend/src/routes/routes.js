const express = require("express");
const { 
  shortenUrl, 
  redirectUrl, 
  getInfo, 
  deleteUrl, 
  getAnalytics 
} = require("../controllers/controllers");

const router = express.Router();

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *               alias:
 *                 type: string
 *                 maxLength: 20
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Shortened URL created
 *       400:
 *         description: Invalid request data
 */
router.post("/shorten", shortenUrl);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       302:
 *         description: Redirect successful
 *       404:
 *         description: URL not found
 *       410:
 *         description: URL expired
 */
router.get("/:shortUrl", redirectUrl);

/**
 * @swagger
 * /info/{shortUrl}:
 *   get:
 *     summary: Get information about a shortened URL
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: URL information retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 clickCount:
 *                   type: integer
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: URL not found
 */
router.get("/info/:shortUrl", getInfo);

/**
 * @swagger
 * /analytics/{shortUrl}:
 *   get:
 *     summary: Get analytics for a shortened URL
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clickCount:
 *                   type: integer
 *                 recentClicks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       clickTime:
 *                         type: string
 *                         format: date-time
 *                       ipAddress:
 *                         type: string
 *       404:
 *         description: URL not found
 */
router.get("/analytics/:shortUrl", getAnalytics);

/**
 * @swagger
 * /delete/{shortUrl}:
 *   delete:
 *     summary: Delete a shortened URL
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: URL deleted
 *       404:
 *         description: URL not found
 */
router.delete("/delete/:shortUrl", deleteUrl);

module.exports = router;
