import { useEffect, useState, useCallback } from "react";
const API_URL = "http://localhost:3000/api/tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        const data = await res.json();
        setTasks((prev) => [...prev, data.task]);
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const updateTask = async (updatedTask) => {
    // PUT /api/tasks/:id
    // update state
    try {
      const res = await fetch(`${API_URL}/${updatedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedTask),
      });
      if (res.ok) {
        const data = await res.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === data.updated._id ? data.updated : t))
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    // DELETE /api/tasks/:id
    // update state
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setTasks(prev => prev.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return {tasks, loading, createTask, updateTask, deleteTask, refreshTasks: fetchTasks };
}
