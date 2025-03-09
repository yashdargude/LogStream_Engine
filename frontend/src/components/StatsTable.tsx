"use client";
import { useEffect, useState } from "react";
import { fetchStats, fetchJobStats } from "../lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UserProfileDropdown from "./UserProfileBox";
import useAuth from "@/hooks/useAuth";

// ✅ Define Type For Stats
type LogStat = {
  job_id: string;
  errors: number;
  warnings: number;
  infos: number;
  ips: string[];
  created_at: string;
};

// ✅ Define Type For Job Stats
type JobStat = {
  id: string;
  job_id: string;
  errors: number;
  warnings: number;
  infos: number;
  ips: string[];
  created_at: string;
};

export default function StatsTable() {
  const [stats, setStats] = useState<LogStat[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobStats, setJobStats] = useState<JobStat | null>(null);
  const user = useAuth();

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const handleFetchJobStats = async (jobId: string) => {
    try {
      setSelectedJob(jobId);
      const data = await fetchJobStats(jobId);
      setJobStats(data[0]);
    } catch (error) {
      console.error("Error fetching job stats:", error);
    }
  };

  return (
    <div>
      <h1>Processed Logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Errors</TableHead>
            <TableHead>Warnings</TableHead>
            <TableHead>IP Addresses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.job_id}>
              <TableCell>{stat.job_id}</TableCell>
              <TableCell>
                {new Date(stat.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{stat.errors}</TableCell>
              <TableCell>{stat.warnings}</TableCell>
              <TableCell>{stat.ips.join(", ")}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button onClick={() => handleFetchJobStats(stat.job_id)}>
                      View Details
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    {jobStats ? (
                      <p>Errors: {jobStats.errors}</p>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
