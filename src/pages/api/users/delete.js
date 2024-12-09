import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body; // Get 'id' from the URL query

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      await db.query("DELETE FROM users WHERE id = ?", [id]);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
