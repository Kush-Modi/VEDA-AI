'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';
import { useAssignmentStore } from '@/store/assignmentStore';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function UploadBox() {
  const { uploadedFile, setFile } = useAssignmentStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  if (uploadedFile) {
    return (
      <div className="border-2 border-primary bg-primary/5 rounded-xl p-6 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <File className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{uploadedFile.name}</p>
            <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-destructive hover:bg-destructive/10">
          <X className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer bg-slate-50 hover:bg-slate-100",
        isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-slate-300"
      )}
    >
      <input {...getInputProps()} />
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center transition-colors shadow-sm",
        isDragActive ? "bg-primary text-primary-foreground" : "bg-white text-slate-500 border border-slate-200"
      )}>
        <UploadCloud className="w-8 h-8" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold text-slate-800">
          {isDragActive ? "Drop file here..." : "Choose file or drag & drop here"}
        </p>
        <p className="text-sm text-slate-500 font-medium">JPEG PNG up to 10MB</p>
      </div>
    </div>
  );
}
