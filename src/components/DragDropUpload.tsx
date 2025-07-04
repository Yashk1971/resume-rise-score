
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DragDropUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

export const DragDropUpload = ({ onFileSelect, selectedFile, onRemoveFile }: DragDropUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return false;
    }

    if (file.size < 1000) { // Less than 1KB might be corrupted
      toast.error("File appears to be corrupted or too small");
      return false;
    }

    return true;
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onFileSelect(file);
          toast.success("Resume uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      simulateUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      toast.error("Please upload only one file at a time");
      return;
    }

    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-400" />;
    }
    return <FileText className="h-8 w-8 text-blue-400" />;
  };

  if (selectedFile && !isUploading) {
    return (
      <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getFileIcon(selectedFile)}
              <div>
                <p className="font-medium text-white">{selectedFile.name}</p>
                <p className="text-sm text-gray-400">{formatFileSize(selectedFile.size)}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveFile}
              className="border-gray-600 hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? "border-purple-500 bg-purple-500/10"
              : "border-gray-600 hover:border-purple-500 hover:bg-purple-500/5"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleInputChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-purple-400 animate-pulse" />
              <div>
                <p className="text-lg font-medium text-white mb-2">Uploading...</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2 font-medium text-white">
                {isDragOver ? "Drop your resume here" : "Drag & drop your resume here"}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                or click to browse files
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <AlertCircle className="h-4 w-4" />
                <span>Supports PDF, DOC, DOCX • Max 10MB</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
