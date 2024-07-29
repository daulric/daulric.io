'use client';

import { useState, useRef } from 'react';
import { useRouter } from "next/navigation"

export default function UploadPage() {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName(null);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/pictures', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      setUploadStatus('Connection Failed!');
    }

    let {success, error} = await response.json();

    if (success === true) {
      setUploadStatus('File uploaded successfully!')
      setTimeout(() => {
        router.push("/pictures")
      }, 1000)
      return // Redirect Here
    }

    if (error) {
      setUploadStatus(`Upload Failed. ${error.message}. Try renaming the file!`)
      return
    } 
      
    setUploadStatus('Upload Failed. Please try again.')
    return
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Upload a Picture
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                ref={fileInputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                required
                className="sr-only"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleChooseFile}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Choose Image
              </button>
            </div>
          </div>

          {fileName && (
            <div className="text-sm text-gray-300">
              Selected file: <span className="font-medium">{fileName}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Upload
            </button>
          </div>
        </form>

        {uploadStatus && (
          <div className={`mt-2 text-sm ${
            uploadStatus.toLowerCase().includes('success') 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
}