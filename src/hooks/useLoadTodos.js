import { useState, useEffect } from "react";
import { loadAll } from "../lib/crud";

export default function useLoadTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const todos = await loadAll();
        setTodos(todos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  return { todos, loading, error, reload, setReload };
}
