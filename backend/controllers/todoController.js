import users from '../data/users.json' with { type: 'json' };
// import todos from '../data/todos.json' with { type: 'json' };
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getTodos = (req, res) => {
  const { username } = req.body;
  try {
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Todos immer frisch lesen!
    const todosPath = path.resolve(__dirname, "../data/todos.json");
const todos = JSON.parse(fs.readFileSync(todosPath, "utf-8"));
    const userTodos = todos.filter(todo => todo.uID === user.userID);
    res.json(userTodos);
  } catch (error) {
    res.status(500).json({ error: "Todos not found!" });
  }
};


export const addTodo = (req, res) => {
  const { username, todo } = req.body;
  try {
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const todosPath = path.resolve(__dirname, "../data/todos.json");
    // HIER: Immer frisch lesen!
    const todos = JSON.parse(fs.readFileSync(todosPath, "utf-8"));
    const maxId = todos
      .map(t => t.id)
      .filter(id => typeof id === "number" && !isNaN(id))
      .reduce((max, id) => Math.max(max, id), 0);

    const newTodo = {
      id: maxId + 1,
      uID: user.userID,
      title: todo.title,
      text: todo.text,
      state: todo.state
    };
    todos.push(newTodo);

    fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error adding todo!" });
  }
};

export const deleteTodo = (req, res) => {
  const { id } = req.body;
  try {
    const todosPath = path.resolve(__dirname, "../data/todos.json");
    const todos = JSON.parse(fs.readFileSync(todosPath, "utf-8"));

    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(todoIndex, 1);

    fs.writeFileSync(
      todosPath,
      JSON.stringify(todos, null, 2)
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo!" });
  }
};

export const updateTodo = (req, res) => {
  const { username, todo } = req.body;
  try {
    // Finde den User anhand des Usernames
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Todos frisch lesen!
    const todosPath = path.resolve(__dirname, "../data/todos.json");
    const todos = JSON.parse(fs.readFileSync(todosPath, "utf-8"));
    // Finde das Todo anhand der ID und uID
    const todoIndex = todos.findIndex(
      t => t.id === todo.id && t.uID === user.userID
    );
    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }
    // Aktualisiere das Todo
    todos[todoIndex].title = todo.title;
    todos[todoIndex].text = todo.text;
    todos[todoIndex].state = todo.state;

    // Schreibe die Datei zurück
    fs.writeFileSync(
      todosPath,
      JSON.stringify(todos, null, 2)
    );

    res.status(200).json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo!" });
  }
};