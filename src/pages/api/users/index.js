import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [users] = await db.query(
        "SELECT * FROM users ORDER BY created_at DESC"
      );
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
