// Beispiel: TodoItem.jsx
export default function TodoItem({ todo, onUpdated, onDeleted, username }) {
  const handleToggle = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/updateTodo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        todo: { ...todo, state: !todo.state }
      }),
    });
    onUpdated && onUpdated();
  };

  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/deleteTodo`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, id: todo.id }),
    });
    onDeleted && onDeleted();
  };

  return (
    <span className="list-disc" style={{ textDecoration: todo.state ? "line-through" : "none" }}>
      {todo.title}: {todo.text}
      <button className="px-2 cursor-pointer" onClick={handleToggle}>
        {todo.state ? "✅" : "⬜"}
      </button>
      <button className="cursor-pointer" onClick={handleDelete}>❌</button>
    </span>
  );
}