import React, { useEffect, useRef, useState } from "react";

interface InvoiceUploadModalProps {
  getInvoices: () => void;
  onUploadStart?: () => void;
}

interface FileWithDiscard extends File {
  discard?: boolean;
}

const filesAccepted = ["pdf"];

const UploadModal: React.FC<InvoiceUploadModalProps> = ({
  getInvoices,
  onUploadStart,
}) => {
  const [status, setStatus] = useState<{
    loaded: number;
    total: number;
  } | null>(null);
  const [docTypes, setDocTypes] = useState<{ [key: number]: string }>({});
  const [files, setFiles] = useState<FileWithDiscard[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDialog = () => {
    if (modalRef.current?.open) {
      if (inputRef.current) inputRef.current.value = "";
      setFiles([]);
      modalRef.current.close();
    } else {
      if (status && status.loaded === status.total) setStatus(null);
      if (files.filter((f) => !f.discard).length) modalRef.current?.showModal();
      else {
        inputRef.current?.click();
      }
    }
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    if (status) return;
    let docs: File[] = [];

    if ("dataTransfer" in evt) {
      evt.preventDefault();
      docs.push(...evt.dataTransfer.files);
    } else if (evt.target.files?.length) {
      docs.push(...evt.target.files);
    }

    const types: { [key: number]: string } = {};
    docs.forEach((file, i) => {
      const name = file.name.toLowerCase();
      if (name.includes("invoice")) types[i] = "iv";
      else if (name.includes("contract")) types[i] = "co";
      else if (name.includes("delivery")) types[i] = "dd";
      else if (name.includes("purchase")) types[i] = "po";
      else if (name.includes("bol")) types[i] = "bo";
      else if (name.includes("distribution agreement")) types[i] = "da";
      else if (name.includes("remittance advice")) types[i] = "ra";
    });
    setDocTypes(types);

    if (docs.length) {
      setFiles(docs);
      modalRef.current?.showModal();
    } else modalRef.current?.close();
  };

  const uploadFile = () => {};

  useEffect(() => {
    if (files.filter((f) => !f.discard).length === 0) modalRef.current?.close();
  }, [files]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length) {
      onUploadStart?.();
      uploadFile();
    }
  };

  const isFilesValid = (files: File[]) =>
    files.length &&
    files.every(
      (f) =>
        filesAccepted.includes(f.name.split(".").pop()?.toLowerCase() || "") &&
        f.size <= 5 * 1024 * 1024
    );

  return (
    <>
      <div
        id="dropzone"
        className="flex p-4 py-6 flex-col items-center justify-center w-full bg-gray-100 hover:bg-gray-200 transition-all ease-in border border-dotted border-gray-400 rounded-lg cursor-pointer overflow-hidden"
        onClick={handleDialog}
        onDrop={handleChange}
        onDragOver={(e) => e.preventDefault()}
        draggable={true}
      >
        {status ? (
          <>
            <span className="material-symbols-rounded animate-spin">
              progress_activity
            </span>
            <span className="text-center text-sm text-gray-600 font-bold">
              {status.loaded === status.total
                ? "Processing..."
                : `Uploading... ${Math.round(
                    (status.loaded / status.total) * 100
                  )}%`}
            </span>
          </>
        ) : (
          <>
            <span className="material-symbols-rounded text-3xl text-gray-600">
              cloud_upload
            </span>
            <span className="text-center text-sm text-gray-600">
              Click to browse or drop here to upload. Supported Formats:{" "}
              {filesAccepted.map((f) => `.${f}`).join(", ")}. Maximum Individual
              File size: 5 MB
            </span>
          </>
        )}
      </div>
      <dialog
        ref={modalRef}
        className="backdrop:backdrop-blur-[1px] hidden open:flex z-10 bg-white max-w-[480px] w-full p-8 outline-0 shadow rounded-lg flex-col items-center"
      >
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            accept=".pdf"
            onChange={handleChange}
          />
          <div className="flex w-full flex-col items-center gap-1 mt-10">
            <button
              type="submit"
              disabled={!isFilesValid(files)}
              className="w-full font-medium bg-accentBack disabled:bg-gray-200 p-3 text-white disabled:text-black rounded-md text-sm"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="font-medium hover:bg-gray-100 w-full p-3 text-gray-600 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default UploadModal;
