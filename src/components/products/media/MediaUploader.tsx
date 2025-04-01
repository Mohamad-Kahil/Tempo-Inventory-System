
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface MediaUploaderProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  t: (key: string) => string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onFileSelect, isUploading, t }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={onFileSelect}
        className="hidden"
        aria-label="Upload media"
      />
      <Button 
        onClick={() => fileInputRef.current?.click()} 
        disabled={isUploading}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? t("uploading") : t("uploadMedia")}
      </Button>
    </div>
  );
};

export default MediaUploader;
