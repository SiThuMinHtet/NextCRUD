import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const res = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editUserId, name, email, phone }),
      });

      if (res.ok) {
        resetForm();
        fetchUsers();
      }
    } else {
      const res = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        resetForm();
        fetchUsers();
      }
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditUserId(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className={styles.container}>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          {isEditing ? "Update User" : "Add User"}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className={styles.button}>
            Cancel
          </button>
        )}
      </form>
      <div className={styles.userTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    className={styles.button}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={styles.button}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
