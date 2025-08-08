"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Button } from "./button";
import { Camera, Loader2 } from "lucide-react";
import { set } from "zod";
const ImageUploader = ({setOpen}) => {
    const [uploadedImageUrls, setUploadedImageUrls] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    // console.log("resource", uploadedImageUrls);
    const [resource, setResource] = useState();
    console.log("resource", resource);

  return (
    <CldUploadWidget
      className="cloudinary-widget"
      uploadPreset="inventory"
      // signatureEndpoint="/api/cloudinary"
      onSuccess={(result, { widget }) => {
        setResource(result?.info); // { public_id, secure_url, etc }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          setOpen(true);
          open();
        }
        return (
          <button type="button" onClick={handleOnClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
    // <CldUploadWidget
    //   //   signatureEndpoint="/api/sign-cloudinary-params"
    //   //   uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
    //   uploadPreset="inventory"
    //   options={{
    //     multiple: true, // Allow selection of multiple files
    //     maxFiles: 15, // Optional: Limit the number of files a user can upload at once
    //     // You can add more options here, e.g.,
    //     folder: "inventory", // Specific folder in Cloudinary
    //     tags: ["inventory", "multi-upload"], // Tags for the uploaded images
    //   }}
    //   // Callback for individual file success (fires for each file in a batch)
    //   onSuccess={(result, { widget }) => {
    //     if (result.event === "success") {
    //       const info = result.info;
    //       // Add the new image URL to the state
    //       setUploadedImageUrls((prevUrls) => [...prevUrls, info.secure_url]);
    //     }
    //   }}
    //   // Callback for when the entire batch of files has finished uploading
    //   onBatchUploadSuccess={(results, { widget }) => {
    //     setIsUploading(false); // End uploading state
    //     // Extract secure URLs from the batch results
    //     const successfulUrls = results.map((r) => r.info.secure_url);
    //     // Pass the full results to the parent component
    //     onUploadSuccess(
    //       results.map((r) => ({
    //         secure_url: r.info.secure_url,
    //         public_id: r.info.public_id,
    //       }))
    //     );
    //     widget.close(); // Close the widget after the batch is complete
    //   }}
    //   // Callback for any errors during upload
    //   onError={(error, { widget }) => {
    //     console.error("Upload Error:", error);
    //     setIsUploading(false); // End uploading state on error
    //     onUploadError(error);
    //     widget.close(); // Close the widget on error
    //   }}
    //   // Callback when the widget opens
    //   onOpen={() => setIsUploading(true)}
    //   // Callback when the widget closes (e.g., user cancels or upload completes)
    //   onClose={() => setIsUploading(false)}
    // >
    //   {/* Render prop pattern: 'open' function is provided to trigger the widget */}
    //   {({ open }) => {
    //     return (
    //       <div
    //         onClick={() => open()}
    //         className="flex  flex-col gap-2 py-4 border border-dashed items-center h-max rounded-xl text-lg font-semibold cursor-pointer w-full"
    //       >
    //         {isUploading ? (
    //           <Loader2 className="animate-spin" />
    //         ) : (
    //           <Camera className="text-xl" />
    //         )}
    //         <button
    //           type="button"
    //           disabled={isUploading} // Disable button while uploading
    //           className={`
    //             px-6 py-3 cursor-pointer rounded-lg font-semibold text-lg transition-colors duration-200

    //           `}
    //         >
    //           {isUploading ? "Uploading Images..." : "Upload  Images"}
    //         </button>
    //         <span className="text-zinc-500 text-xs italic">
    //           max images to upload is {15}
    //         </span>
    //         {/* Display uploaded images */}
    //         {/* {uploadedImageUrls.length > 0 && (
    //           <div className="mt-8 w-full max-w-4xl">
    //             <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
    //               Uploaded Images:
    //             </h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //               {uploadedImageUrls.map((url, index) => (
    //                 <div
    //                   key={index}
    //                   className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
    //                 >
    //                   <img
    //                     src={url}
    //                     alt={`Uploaded Image ${index + 1}`}
    //                     className="w-full h-48 object-cover"
    //                     onError={(e) => {
    //                       // Fallback for broken images
    //                       e.currentTarget.src = `https://placehold.co/400x300/cccccc/333333?text=Image+Error`;
    //                     }}
    //                   />
    //                   <div className="p-4">
    //                     <p className="text-sm text-gray-600 truncate">
    //                       {url.substring(url.lastIndexOf("/") + 1)}
    //                     </p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )} */}
    //       </div>
    //     );
    //   }}
    // </CldUploadWidget>
  );
};
export default ImageUploader;
