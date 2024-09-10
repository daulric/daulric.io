'use client';

import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

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
      setUploadStatus('Please select a image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.postForm('/api/pictures', formData);

      if (response.data.success) {
        setUploadStatus('File uploaded successfully!');
        setTimeout(() => {
          router.push("/pictures");
        }, 1000);
      } else {
        setUploadStatus(`Upload Failed. ${response.data.error?.message || 'Please try again.'}`);
      }
    } catch (error) {
      setUploadStatus('Connection Failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
        <CardHeader>
          <h2 className="text-3xl font-extrabold text-center">Upload a Picture</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={handleChooseFile}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Choose Image
              </Button>
              {fileName && (
                <p className="text-sm text-gray-300">
                  Selected file: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700">
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {uploadStatus && (
            <Alert variant={uploadStatus.toLowerCase().includes('success') ? "default" : "destructive"}>
              <AlertDescription>{uploadStatus}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}