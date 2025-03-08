jest.mock("../backend/src/queues/fileQueue.js", () => ({
  add: jest.fn(),
  getJobCounts: jest.fn(),
}));
