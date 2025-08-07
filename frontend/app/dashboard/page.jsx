'use client';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import AddTodoForm from '../components/AddTodoForm';
import TodoItem from '../components/TodoItem';

export default function DashboardPage() {
  const { user, logout, todos, fetchTodos } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchTodos();
    }
  }, [user]);

  if (!user) return <p>Weiterleitung...</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl text-blue-900 font-bold mb-8'>Hallo {user.username}</h1>
      <h2 className='text-xl font-bold mb-4'>Deine Todos:</h2>
      <AddTodoForm onTodoAdded={fetchTodos} />
      <ul className="flex flex-col list-disc gap-4 pl-4 ">
  {todos.length === 0 ? (
    <p className='text-red-500'>Keine Todos geladen...</p>
  ) : (
    todos.map((todo) => (
  <li key={todo.id}>
      <TodoItem
        todo={todo}
        username={user.username}
        onUpdated={fetchTodos}
        onDeleted={fetchTodos}
      />
    </li>
    ))
  )}
</ul>
    </div>
  );
}
