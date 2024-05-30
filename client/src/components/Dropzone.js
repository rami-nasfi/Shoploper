import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCircleXmark } from "react-icons/fa6";

function Dropzone({ className, onFilesChange, existingImages }) {
  const [files, setFiles] = useState(existingImages || []);

  useEffect(() => {
    // Load existing images when editing
    if (existingImages && existingImages.length > 0) {
      console.log("files", files);
      setFiles(existingImages);
    }
  }, [existingImages]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setFiles((previousFiles) => [...previousFiles, ...newFiles]);
        onFilesChange([...files, ...newFiles]);
      }
      console.log("onFilesChange", onFilesChange);
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const removeFile = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Notify parent component about the updated file list
  };

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some images here, or click to select images</p>}
      <ul className="nav nav-pills d-flex gap-4 justify-content-center">
        {files.map((file, index) => (
          <li key={index} className="position-relative">
            <img src={file.preview ? file.preview : "http://localhost:8080/" + file} alt={file.name} className="imgDragzone rounded border" />
            <h3>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFile(file);
                }}
              >
                <span className="position-absolute top-0 start-100 translate-middle">
                  <FaCircleXmark className="text-danger rounded-circle bg-white" />
                </span>
              </a>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropzone;
