export async function uploadLogFiles(files: FileList) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("logfiles", file));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload-logs`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) throw new Error("Failed to upload files");

  return response.json();
}

export async function fetchStats() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stats`
  );
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
}

export async function fetchJobStats(jobId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stats/${jobId}`
  );
  if (!response.ok) throw new Error(`Failed to fetch stats for job ${jobId}`);
  return response.json();
}

export async function fetchQueueStatus() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/queue-status`
  );
  if (!response.ok) throw new Error("Failed to fetch queue status");
  return response.json();
}
