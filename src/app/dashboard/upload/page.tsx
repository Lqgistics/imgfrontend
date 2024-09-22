"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X } from "lucide-react";
import Cookies from "js-cookie";

export default function ImageUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleUpload = async () => {
    const token = Cookies.get("token"); // Replace 'token' with the name of your cookie
    if (!token) {
      throw new Error("No token found");
    }

    if (!file) {
      setMessage("Please select an image to upload.");
      return;
    }

    // Log the file size before upload
    console.log("Selected file size:", file.size);

    if (file.size === 0) {
      setMessage("The selected file is empty.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      console.log("Uploading file:", file);
      console.log("FormData:", formData);

      const response = await axios.post(
        "http://localhost:8080/files",
        formData,
        config
      );
      console.log(response.data);

      setMessage("Image uploaded successfully!");

      // Reset file and preview after successful upload
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("An error occurred while uploading the image.");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Card className="mx-auto  w-[350px] lg:w-[600px] bg-[#161616] border-none shadow-xl overflow-hidden p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">
            Upload Image
          </CardTitle>
          <CardDescription className="text-white">
            Drag and drop your image or click to select
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div
            {...getRootProps()}
            className={`border-white/60 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-muted-foreground"
            }`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[200px] mx-auto rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-muted-foreground text-white/80" />
                <p className="mt-2 text-sm text-muted-foreground text-white">
                  {isDragActive
                    ? "Drop the image here"
                    : "Drag & drop an image here, or click to select"}
                </p>
              </div>
            )}
          </div>
          <Button
            onClick={handleUpload}
            className="w-full h-[50px] rounded-xl text-white"
            disabled={!file}
          >
            Upload Image
          </Button>
          {message && (
            <Alert>
              <AlertDescription className="text-center">
                {message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
