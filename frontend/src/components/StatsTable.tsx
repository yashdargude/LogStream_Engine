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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function StatsTable() {
  const [stats, setStats] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobStats, setJobStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const handleFetchJobStats = async (jobId) => {
    try {
      setSelectedJob(jobId);
      const data = await fetchJobStats(jobId);
      setJobStats(data);
    } catch (error) {
      console.error("Error fetching job stats:", error);
    }
  };

  return (
    <div className="bg-black p-10  shadow-md text-white">
      <h1 className="text-2xl font-bold text-center mb-4">Processed Logs</h1>

      <div className="border-2 border-white rounded-md ">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Job ID</TableHead>
              <TableHead className="text-left">Errors</TableHead>
              <TableHead className="text-left">Warnings</TableHead>
              <TableHead className="text-left">IP Addresses</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <TableRow key={index} className="hover:bg-gray-800">
                  <TableCell>{stat.job_id}</TableCell>
                  <TableCell>{stat.errors}</TableCell>
                  <TableCell>{stat.warnings}</TableCell>
                  <TableCell>
                    {stat.ip_addresses ? stat.ip_addresses.join(", ") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => handleFetchJobStats(stat.job_id)}
                          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                        >
                          <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                          </span>
                          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                            <span>View Details</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M10.75 8.75L14.25 12L10.75 15.25"
                              ></path>
                            </svg>
                          </div>
                          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="bg-gray-800 text-white">
                        <DialogHeader>
                          <DialogTitle>Job Stats for {selectedJob}</DialogTitle>
                        </DialogHeader>
                        <Card className="bg-gray-900 text-white">
                          <CardHeader>
                            <CardTitle>Job Statistics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {jobStats ? (
                              <pre className="whitespace-pre-wrap text-sm">
                                {JSON.stringify(jobStats, null, 2)}
                              </pre>
                            ) : (
                              <p>Loading...</p>
                            )}
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
