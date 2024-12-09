import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, name, email, phone } = req.body;

    if (!id || !name || !email) {
      return res
        .status(400)
        .json({ message: "ID, Name, and Email are required" });
    }

    try {
      // Update user in the database
      await db.query(
        "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
        [name, email, phone || null, id]
      );

      // Fetch the updated user
      const [updatedUser] = await db.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
