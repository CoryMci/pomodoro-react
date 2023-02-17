import { useState, useEffect } from "react";
import { loadAll } from "../lib/crud";

export default function useLoadTodos() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const todos = await loadAll();
        setUserData(todos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  return { userData, loading, error, reload, setReload };
}
