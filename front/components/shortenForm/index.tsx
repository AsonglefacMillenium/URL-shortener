import axios from "axios";
import React, { useState } from "react";
import styles from "./styles.module.css";

const ShortenForm = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: { originalUrl: string; alias?: string; expiresAt?: string } =
      { originalUrl };
    if (alias) payload.alias = alias;
    if (expiresAt) payload.expiresAt = expiresAt;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shorten",
        payload
      );
      setShortUrl(response.data.shortUrl);
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        
        setError(
          err.response?.data?.error ||
            "An error occurred while shortening the URL."
        );
      } else {
        
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label>Original URL:</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label>Custom Alias (Optional):</label>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            maxLength={20}
          />
        </div>
        <div className={styles.form_group}>
          <label>Expires At (Optional):</label>
          <input
            type="text"
            placeholder="yyyy-mm-dd"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <button type="submit">Shorten</button>
        </div>
      </form>

      {error && (
        <p className={styles.error_text}>
          {error}
        </p>
      )}
      {shortUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <a href={`http://${shortUrl}`} target="_blank">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
