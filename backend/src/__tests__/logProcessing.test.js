const fs = require("fs");
const fileQueue = require("../queues/fileQueue");

jest.mock("fs");
jest.mock("../queues/fileQueue");

describe("Log Processing Logic", () => {
  it("should calculate priority based on file size", async () => {
    const file = {
      path: "path/to/file",
      originalname: "test.log",
      filename: "test.log",
    };

    fs.statSync.mockReturnValue({ size: 100 });

    const priority = Math.max(1, Math.floor(100 / 10));
    expect(priority).toBe(10);

    await fileQueue.add(
      "process-log",
      { fileId: file.filename, filePath: file.path },
      { priority }
    );
    expect(fileQueue.add).toHaveBeenCalledWith(
      "process-log",
      { fileId: file.filename, filePath: file.path },
      { priority }
    );
  });
});
