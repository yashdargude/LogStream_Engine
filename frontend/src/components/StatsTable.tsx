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
import { CardSpotlight } from "@/components/ui/card-spotlight";
import UserProfileDropdown from "./UserProfileBox";
import useAuth from "@/hooks/useAuth";

export default function StatsTable() {
  const [stats, setStats] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobStats, setJobStats] = useState(null);
  const [sortOption, setSortOption] = useState("jobId");
  const user = useAuth();

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
      console.log(data);
      console.log("the job stats are", jobStats);
    } catch (error) {
      console.error("Error fetching job stats:", error);
    }
  };

  const sortByJobIdAsc = () => {
    const sorted = [...stats].sort((a, b) => a.job_id - b.job_id);
    setStats(sorted);
  };

  const sortByJobIdDesc = () => {
    const sorted = [...stats].sort((a, b) => b.job_id - a.job_id);
    setStats(sorted);
  };

  const sortByDateCreatedAsc = () => {
    const sorted = [...stats].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setStats(sorted);
  };

  const sortByDateCreatedDesc = () => {
    const sorted = [...stats].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setStats(sorted);
  };

  return (
    <div className="bg-black p-10 shadow-md text-white">
      <div className="fixed top-4 right-4 z-50 text-black">
        <UserProfileDropdown user={user} />
      </div>

      <h1 className="text-2xl font-bold text-center mb-4">Processed Logs</h1>
      <div className="flex justify-center space-x-4 mb-6  ">
        <Button onClick={sortByJobIdAsc}>Sort by Job ID ↑</Button>
        <Button onClick={sortByJobIdDesc}>Sort by Job ID ↓</Button>
        <Button onClick={sortByDateCreatedAsc}>Sort by Date ↑</Button>
        <Button onClick={sortByDateCreatedDesc}>Sort by Date ↓</Button>
      </div>

      <div className="border-2 border-white rounded-md">
        <Table className="w-full px-4">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Job ID</TableHead>
              <TableHead className="text-center">Date Created</TableHead>
              <TableHead className="text-center">Errors</TableHead>
              <TableHead className="text-center">Warnings</TableHead>
              <TableHead className="text-center">IP Addresses</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <TableRow key={index} className="hover:bg-gray-800 text-center">
                  <TableCell>{stat.job_id}</TableCell>
                  <TableCell>
                    {" "}
                    {new Date(stat.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{stat.errors}</TableCell>
                  <TableCell>{stat.warnings}</TableCell>
                  <TableCell>
                    {stat.ips ? stat.ips.join(", ") : "0.0.0.0"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={async () => {
                            await handleFetchJobStats(stat.job_id);
                          }}
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

                      <DialogContent className="bg-transparent backdrop-blur-xl flex justify-center items-center p-0">
                        {jobStats ? (
                          <div className="bg-transparent border border-white/20 shadow-xl rounded-2xl p-6 max-w-md w-full backdrop-blur-2xl transition-transform transform hover:scale-105 hover:shadow-2xl">
                            <DialogHeader className="text-center">
                              <DialogTitle className="text-white text-2xl font-bold mb-2">
                                Job Stats for {selectedJob}
                              </DialogTitle>
                            </DialogHeader>

                            <p className="text-lg font-semibold text-white mb-4">
                              Job Details
                            </p>
                            <div className="space-y-3 text-sm text-white/80">
                              <StatField
                                title="ID"
                                value={jobStats[0].id ?? "N/A"}
                              />
                              <StatField
                                title="Created At"
                                value={
                                  jobStats[0].created_at
                                    ? new Date(
                                        jobStats[0].created_at
                                      ).toLocaleDateString()
                                    : "N/A"
                                }
                              />
                              <StatField
                                title="Job ID"
                                value={jobStats[0].job_id ?? "N/A"}
                              />
                              <StatField
                                title="Errors"
                                value={jobStats[0].errors ?? 0}
                              />
                              <StatField
                                title="Warnings"
                                value={jobStats[0].warnings ?? 0}
                              />
                              <StatField
                                title="Infos"
                                value={jobStats[0].infos ?? 0}
                              />
                              <StatField
                                title="IP Addresses"
                                value={
                                  jobStats[0].ips && jobStats[0].ips.length > 0
                                    ? jobStats[0].ips.join(", ")
                                    : "N/A"
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-white">Loading...</p>
                        )}
                      </DialogContent>

                      <style jsx>{`
                        .backdrop-blur-xl {
                          backdrop-filter: blur(20px);
                        }
                        .border-white\/20:hover {
                          border-color: rgba(255, 255, 255, 0.5);
                          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
                          transform: scale(1.05);
                        }
                        .rounded-2xl {
                          border-radius: 16px;
                        }
                        .p-6 {
                          padding: 1.5rem;
                        }
                        .text-white\/80 {
                          color: rgba(255, 255, 255, 0.8);
                        }
                      `}</style>
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

const Step = ({ title }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const StatField = ({ title, value }) => (
  <div className="flex justify-between items-center">
    <p className="text-neutral-300 text-sm">{title}</p>
    <p className="text-white text-sm font-medium">{value}</p>
  </div>
);

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path d="M12 2c-.218 0-.432.002-.642.005l-.616.017-.299.013-.579.034-.553.046c-4.785.464-6.732 2.411-7.196 7.196l-.046.553-.034.579c-.005.098-.01.198-.013.299l-.017.616-.004.318-.001.324c0 .218.002.432.005.642l.017.616.013.299.034.579.046.553c.464 4.785 2.411 6.732 7.196 7.196l.553.046.579.034c.098.005.198.01.299.013l.616.017.642.005.642-.005.616-.017.299-.013.579-.034.553-.046c4.785-.464 6.732-2.411 7.196-7.196l.046-.553.034-.579c.005-.098.01-.198.013-.299l.017-.616.005-.642-.005-.642-.017-.616-.013-.299-.034-.579-.046-.553c-.464-4.785-2.411-6.732-7.196-7.196l-.553-.046-.579-.034-.299-.013l-.616-.017-.318-.004-.324-.001zM10.75 8.75l3.5 3.25-3.5 3.25z" />
    </svg>
  );
};
