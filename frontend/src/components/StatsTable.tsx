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
  DialogClose,
} from "./ui/dialog";
import useAuth from "@/hooks/useAuth";
import React from "react";
import UserProfileDropdown from "./UserProfileBox";
import { SparklesCore } from "./ui/sparkles";

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
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LogStat;
    direction: "asc" | "desc";
  } | null>(null);

  const user = useAuth();

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      console.log(data);
      setStats(data);
    }
    loadStats();
  }, []);

  const handleFetchJobStats = async (jobId: string) => {
    try {
      setSelectedJob(jobId);
      setLoading(true);
      const data = await fetchJobStats(jobId);

      setJobStats(data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job stats:", error);
      setLoading(false);
    }
  };

  const sortTable = (key: keyof LogStat, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });

    setStats((prevStats) => {
      return [...prevStats].slice().sort((a, b) => {
        const valA =
          typeof a[key] === "number" ? (a[key] as number) : String(a[key]);
        const valB =
          typeof b[key] === "number" ? (b[key] as number) : String(b[key]);

        if (valA < valB) return direction === "asc" ? -1 : 1;
        if (valA > valB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    });
  };

  return (
    <div className="p-6">
      <div className="h-[10rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-4xl font-bold text-center text-white relative z-20">
          Processed Logs
        </h1>
        <div className="w-[20rem] h-5 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-50">
        <UserProfileDropdown user={user} />
      </div>

      <div className="mb-4 flex flex-wrap gap-3 justify-center sm:justify-center md:justify-start ml-10">
        <button
          onClick={() => sortTable("job_id", "asc")}
          className="relative inline-flex h-10 sm:h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-3 py-2 sm:py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sort by Job ID ↑
          </span>
        </button>
        <button
          onClick={() => sortTable("job_id", "desc")}
          className="relative inline-flex h-10 sm:h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-3 py-2 sm:py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sort by Job ID ↓
          </span>
        </button>
        <button
          onClick={() => sortTable("created_at", "asc")}
          className="relative inline-flex h-10 sm:h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-3 py-2 sm:py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sort by Date ↑
          </span>
        </button>
        <button
          onClick={() => sortTable("created_at", "desc")}
          className="relative inline-flex h-10 sm:h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-3 py-2 sm:py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sort by Date ↓
          </span>
        </button>
      </div>
      <div className="overflow-x-auto m-4 sm:m-6 md:m-10 rounded-xl">
        <Table className="w-full border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold text-center border-b border-gray-700">
              <TableHead className="text-center uppercase tracking-wide text-gray-300 px-4 py-3">
                Job ID
              </TableHead>
              <TableHead className="text-center uppercase tracking-wide text-gray-300 px-4 py-3">
                Date Created
              </TableHead>
              <TableHead className="text-center uppercase tracking-wide text-red-400 px-4 py-3">
                Errors
              </TableHead>
              <TableHead className="text-center uppercase tracking-wide text-yellow-400 px-4 py-3">
                Warnings
              </TableHead>
              <TableHead className="text-center uppercase tracking-wide text-blue-400 px-4 py-3">
                Infos
              </TableHead>
              <TableHead className="text-center font-bold italic  tracking-wide  text-gray-100 px-4 py-3">
                ip address
              </TableHead>
              <TableHead className="text-center uppercase tracking-wide text-purple-100 px-4 py-3">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow
                key={`${stat.job_id}-${index}`}
                className="border-b hover:bg-gray-900"
              >
                <TableCell className="text-white font-semibold text-center">
                  {stat.job_id}
                </TableCell>
                <TableCell className="text-white font-semibold text-center">
                  {new Date(stat.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-white font-semibold text-center">
                  {stat.errors}
                </TableCell>
                <TableCell className="text-white font-semibold text-center">
                  {stat.warnings}
                </TableCell>
                <TableCell className="text-white font-semibold text-center">
                  {stat.infos}
                </TableCell>
                <TableCell className="truncate text-white max-w-xs text-center">
                  {stat.ips.join(", ")}
                </TableCell>
                <TableCell className=" text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => handleFetchJobStats(stat.job_id)}
                        className="relative inline-flex h-7 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-400">
                          view details
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-6 rounded-2xl shadow-2xl bg-black/50 backdrop-blur-md border border-gray-700 text-white">
                      <DialogHeader className="flex justify-between items-center">
                        <DialogTitle className="text-xl font-bold text-gray-200">
                          📄 Job Details
                        </DialogTitle>
                      </DialogHeader>

                      {loading ? (
                        <p className="text-center text-gray-400 animate-pulse">
                          Loading...
                        </p>
                      ) : jobStats ? (
                        <div className="space-y-4 text-gray-300">
                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <p>
                              <strong className="text-gray-100">Job ID:</strong>{" "}
                              {jobStats.job_id}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <p>
                              <strong className="text-gray-100">
                                Date Created:
                              </strong>{" "}
                              {new Date(jobStats.created_at).toLocaleString()}
                            </p>
                          </div>

                          {/* Stats Section */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-red-700/40 rounded-lg text-center">
                              <p className="text-lg font-semibold text-red-300">
                                {jobStats.errors}
                              </p>
                              <p className="text-sm">Errors</p>
                            </div>
                            <div className="p-4 bg-yellow-700/40 rounded-lg text-center">
                              <p className="text-lg font-semibold text-yellow-300">
                                {jobStats.warnings}
                              </p>
                              <p className="text-sm">Warnings</p>
                            </div>
                            <div className="p-4 bg-blue-700/40 rounded-lg text-center">
                              <p className="text-lg font-semibold text-blue-300">
                                {jobStats.infos}
                              </p>
                              <p className="text-sm">Infos</p>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <p>
                              <strong className="text-gray-100">
                                IP Addresses:
                              </strong>{" "}
                              <span className="break-words">
                                {jobStats.ips.join(", ")}
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-gray-400">
                          No data available
                        </p>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
