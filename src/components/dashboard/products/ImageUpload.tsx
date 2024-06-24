"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FileUploadProgress {
  progress: number;
  file: File;
  source: any | null; // Firebase upload task reference
  imgUrl?: string;
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function ImageUpload({ setImages, setOpen }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadProgress[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const onUploadProgress = (progress: number, file: File, uploadTask: any) => {
    setFilesToUpload((prevUploadProgress) =>
      prevUploadProgress.map((item) =>
        item.file.name === file.name
          ? { ...item, progress, source: uploadTask }
          : item
      )
    );

    if (progress === 100) {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          { file, imgUrl: downloadURL, progress: 100, source: uploadTask },
        ]);

        setFilesToUpload((prevUploadProgress) =>
          prevUploadProgress.filter((item) => item.file !== file)
        );
      });
    }
  };

  const uploadFileToFirebase = (file: File) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onUploadProgress(progress, file, uploadTask);
      },
      (error) => {
        console.error("Error uploading file:", error);
      }
    );

    return uploadTask;
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) =>
      prevUploadProgress.filter((item) => item.file !== file)
    );
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((item) => item.file !== file)
    );
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFilesToUpload((prevUploadProgress) => [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => ({
          progress: 0,
          file,
          source: null,
        })),
      ]);

      acceptedFiles.forEach((file) => {
        const uploadTask = uploadFileToFirebase(file);
        setFilesToUpload((prevUploadProgress) =>
          prevUploadProgress.map((item) =>
            item.file.name === file.name
              ? { ...item, source: uploadTask }
              : item
          )
        );
      });
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = () => {
    const imgUrls = uploadedFiles.map((file) => file.imgUrl as string);
    setImages(imgUrls);
    setOpen(false);
  };

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => (
                <div
                  key={fileUploadProgress.file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress.file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground">
                          {fileUploadProgress.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                          {fileUploadProgress.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        progress={Math.ceil(fileUploadProgress.progress)}
                        className={
                          getFileIconAndColor(fileUploadProgress.file).color
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (fileUploadProgress.source)
                        fileUploadProgress.source.cancel();
                      removeFile(fileUploadProgress.file);
                    }}
                    className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((fileUploadProgress) => (
              <div
                key={fileUploadProgress.file.lastModified}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    {fileUploadProgress.imgUrl && (
                      <Image
                        key={fileUploadProgress.file.name}
                        width={48}
                        height={40}
                        src={fileUploadProgress.imgUrl}
                        alt={fileUploadProgress.file.name}
                        className="w-12 h-10 rounded-md object-cover"
                      />
                    )}
                  </div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground">
                        {fileUploadProgress.file.name.slice(0, 25)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(fileUploadProgress.file)}
                  className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <Button
          disabled={uploadFileToFirebase.length === 0}
          onClick={handleSubmit}
        >
          Terminer
        </Button>
      </div>
    </div>
  );
}
