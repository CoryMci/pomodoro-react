import { useState, useEffect } from "react";
import { loadAll } from "../lib/crud";

export default function useLoadTodos() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [AuthError, SetAuthError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const todos = await loadAll();
        setUserData(todos);
      } catch (err) {
        SetAuthError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  return { userData, loading, AuthError, reload, setReload };
}
