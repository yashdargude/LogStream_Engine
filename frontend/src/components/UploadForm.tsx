"use client";
import { useState, useEffect } from "react";
import { uploadLogFiles, fetchJobStats } from "../lib/api";
import { io } from "socket.io-client";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
export default function UploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [jobStats, setJobStats] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Replace with your backend URL
    socket.on("queue-status", (status) => setQueueStatus(status));
    return () => socket.disconnect();
  }, []);

  const loadingStates = [
    { text: "Initializing upload..." },
    { text: "Uploading files..." },
    { text: "Processing data..." },
    { text: "Finalizing upload..." },
    { text: "Upload complete!" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      setFileNames(Array.from(selectedFiles).map((file) => file.name));
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);

    try {
      const response = await uploadLogFiles(files);
      setMessage(`Uploaded ${response.length} files successfully!`);
      const jobId = response[0].jobId;

      setTimeout(async () => {
        // setMessage("Fetching job stats...");
        setJobStats(await fetchJobStats(jobId));
        setLoading(false);
        setFiles(null);
        setFileNames([]);
      }, 2000);
    } catch (error) {
      setMessage("Upload failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setMessage("Upload completed!");
      setTimeout(() => setMessage(""), 2000);
    };
  }, [jobStats]);

  return (
    <>
      <div className=" -z-10 ">
        <ShootingStars />
        <StarsBackground />
        <div className="bg-black z-10 text-white min-h-screen flex flex-col items-center justify-center px-6 py-2">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Log File Uploader & Processor
          </h2>
          <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-md">
            {/* File Input */}
            <div className="flex flex-col items-center">
              <label className="w-full cursor-pointer flex flex-col items-center bg-gray-700 p-6 rounded-lg border border-dashed border-gray-500 hover:bg-gray-600">
                <input
                  type="file"
                  multiple
                  accept=".log"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-300">
                  Drag & Drop files here or click to select
                </p>
              </label>
            </div>

            {/* Display selected file names */}
            {fileNames.length > 0 && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg text-white w-full">
                <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {fileNames.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Multi-Step Loader */}
            <Loader
              loadingStates={loadingStates}
              loading={loading}
              duration={2000}
            />

            {/* Upload Button */}
            {!loading && (
              <button
                onClick={handleUpload}
                className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center mt-4"
                style={{
                  boxShadow:
                    "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
                }}
              >
                Click to Upload
              </button>
            )}

            {loading && (
              <button
                className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                onClick={() => setLoading(false)}
              >
                <IconSquareRoundedX className="h-10 w-10" />
              </button>
            )}

            {/* Message */}
            {message && (
              <p className="mt-4 text-center text-green-400">{message}</p>
            )}
          </div>

          {/* Job Stats */}
          {jobStats && (
            <div className="w-full max-w-3xl mt-6 bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-2">Job Stats</h3>
              <pre className="text-sm bg-gray-700 p-4 rounded-lg overflow-auto">
                {JSON.stringify(jobStats, null, 2)}
              </pre>
            </div>
          )}

          {/* Queue Status */}
          {queueStatus && (
            <div className="w-full max-w-3xl mt-6 bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-4">Queue Status</h3>
              <div className="grid grid-cols-3 gap-4">
                {["Active", "Completed", "Failed"].map((key) => (
                  <div
                    key={key}
                    className="bg-gray-700 p-4 rounded-lg text-center"
                  >
                    <h4 className="font-bold text-lg">{key}</h4>
                    <p className="text-xl">
                      {queueStatus[key.toLowerCase()] ?? 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
