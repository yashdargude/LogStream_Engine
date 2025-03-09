"use client";
import { useEffect, useState } from "react";
import { fetchStats } from "../lib/api";

type Log = {
  job_id: string;
  errors: number;
  warnings: number;
  infos: number;
  ips: string[]; // ✅ This is correct now
};

export default function LogTable() {
  const [logs, setLogs] = useState<Log[]>([]); // ✅ Fixed the Type Here

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      setLogs(data);
    }
    loadStats();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Processed Logs</h2>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Job ID</th>
            <th className="p-2">Errors</th>
            <th className="p-2">IP Addresses</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.job_id} className="border-t">
              <td className="p-2">{log.job_id}</td>
              <td className="p-2">{log.errors}</td>
              <td className="p-2">{log.ips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
