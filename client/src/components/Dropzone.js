import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCircleXmark } from "react-icons/fa6";

function Dropzone({ className, onFilesChange }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setFiles((previousFiles) => [...previousFiles, ...newFiles]);
        onFilesChange(newFiles); // Pass new files to parent component
      }
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg"],
    },
  });

  const removeFiles = (name) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Update parent component with the new file list
  };

  return (
    <>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some images here, or click to select images</p>}
        <ul className="nav nav-pills d-flex  gap-4 justify-content-center">
          {files.map((file) => (
            <li key={file.name} className="position-relative">
              <img src={file.preview} alt={file.name} className=" imgDragzone rounded border" />
              <h3>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFiles(file.name);
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
    </>
  );
}

export default Dropzone;
