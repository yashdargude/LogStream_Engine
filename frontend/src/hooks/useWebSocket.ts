import { useEffect, useState } from "react";

export function useWebSocket() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/api/live-stats");

    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  return data;
}
