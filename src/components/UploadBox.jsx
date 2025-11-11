import { useRef, useState } from "react";
import Button from "./Button";

const UploadBox = ({ onJobData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC/DOCX files allowed.");
      return;
    }
    setSelectedFile(file);
    setUploadSuccess(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setUploading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload Response:", data);
      if (response.ok) {
        setUploadSuccess(true);
        alert("Resume uploaded successfully!");

        
        if (onJobData && data.jobs) {
          onJobData(data.jobs);
        }
      } else {
        setUploadSuccess(false);
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadSuccess(false);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setUploadSuccess(null);
    fileInputRef.current.value = null;
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-500 p-6 rounded-xl w-full max-w-lg text-center transition-all bg-white/10 hover:bg-white/20"
    >
      <p className="mb-4">Drag & drop your resume here, or click below to select a file.</p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Button onClick={triggerFilePicker}>Choose File</Button>

      {selectedFile && (
        <div className="mt-4 text-sm text-gray-200">
          <p><strong>Selected:</strong> {selectedFile.name}</p>
          <div className="flex gap-4 mt-2 justify-center">
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <Button onClick={clearFile}>Clear File</Button>
          </div>
        </div>
      )}

      {uploadSuccess === true && (
        <p className="mt-3 text-green-400">Upload successful!</p>
      )}
      {uploadSuccess === false && (
        <p className="mt-3 text-red-400">Upload failed.</p>
      )}
    </div>
  );
};

export default UploadBox;
