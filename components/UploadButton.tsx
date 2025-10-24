
import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { FileInfo } from '../types';

interface UploadButtonProps {
  onImageUpload: (fileInfo: FileInfo) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageUpload({
            base64: e.target?.result as string,
            mimeType: file.type,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };
  
  return (
    <label
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative block w-full border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ease-in-out ${
        isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-gray-600 hover:border-blue-500'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
        <UploadCloud className={`w-12 h-12 transition-colors ${isDragging ? 'text-pink-400' : 'text-blue-400'}`} />
        <span className="font-semibold">
          <span className="text-blue-400">Click to upload</span> or drag and drop
        </span>
        <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
      </div>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </label>
  );
};
