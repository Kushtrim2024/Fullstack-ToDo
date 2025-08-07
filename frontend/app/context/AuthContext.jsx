'use client';
import { createContext, use, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setTodos([]);
    localStorage.removeItem('user');
  };

  const fetchTodos = async () => {
  if (!user) return;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: user.username }),
  });
  const data = await res.json();
  setTodos(data);
};

  return (
    <AuthContext.Provider value={{ user, todos, login, logout, fetchTodos }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
