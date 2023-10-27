export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://seashell-app-34v7m.ondigitalocean.app"
    : `http://localhost:4000`;
