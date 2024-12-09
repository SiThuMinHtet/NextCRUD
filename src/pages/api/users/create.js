import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    try {
      const [result] = await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [name, email, phone || null]
      );
      res.status(201).json({ id: result.insertId, name, email, phone });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
