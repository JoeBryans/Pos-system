import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

export default function DropzoneImage() {
  const [imageFile, setImageFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setImageFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Inside form JSX:
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Product Image
    </label>
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded p-4 text-center cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {imageFile ? (
        <p className="text-sm text-green-600">{imageFile.name}</p>
      ) : (
        <p className="text-sm text-gray-500">
          Drag 'n' drop an image here, or click to select
        </p>
      )}
    </div>
  </div>;
}
