import { useState } from "react";

export default function useTasks(initialTasks = []) {
  const [tasks, setTasks] = useState(initialTasks);

  const updateTask = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return [tasks, setTasks, updateTask, deleteTask];
}
