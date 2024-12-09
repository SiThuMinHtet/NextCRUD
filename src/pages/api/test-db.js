import db from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await db.query("SElECT 1 +1 AS result");
    res.status(200).json({ result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
