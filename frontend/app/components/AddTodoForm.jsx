// Beispiel: AddTodoForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddTodoForm({ onTodoAdded }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/addTodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        todo: { title, text, state: false }
      }),
    });
    if (res.ok) {
      setTitle("");
      setText("");
      onTodoAdded && onTodoAdded();
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input className="border border-gray-300 rounded w-[350px] mr-4 pl-2 mb-4" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel" required />
      <input className="border border-gray-300 rounded w-[25rem] mr-4 pl-2 mb-4" value={text} onChange={e => setText(e.target.value)} placeholder="Text" required />
      <button className="border border-gray-300 hover:bg-gray-300 rounded w-[4rem] cursor-pointer" type="submit">Add</button>
    </form>
  );
}