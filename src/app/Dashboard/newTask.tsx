import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  useModal,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { parse } from "papaparse";
import { Task } from "../../lib/types/task";

export default function NewTask({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) {
  const [openFile, setOpenFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]); 
  const [droppedFileName, setDroppedFileName] = useState("");



  const onDrop = useCallback((acceptedFiles:any) => {
    const file = acceptedFiles[0];
    if (file && file.type === "text/csv") {
      setDroppedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target as FileReader).result;
        if (text) { // Check if the result is not null
          parse(text, {
            complete: (result:any) => {
              const headers = result.data[0]; // Assumes the first row contains headers
              setHeaders(headers);
            },
          });
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple:false,
    accept: {
        'text/csv': ['.csv'] 
      }
  });
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      isOpen={visible}
      onClose={closeModal}
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New Task
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                placeholder="Enter your new task title"
                type="text"
              ></Input>

              <div className="flex flex-col items-center justify-center w-full border-dashed border-2 border-gray-400 rounded-lg  bg-gray-100 pl-4">
                <div className="w-full pt-2 border-dashed border-b-2 border-gray-400">
                  <div className="text-sm text-gray-700">
                    {droppedFileName || "No file selected"}
                  </div>
                </div>
                <div
                  {...getRootProps()}
                  className="flex justify-center items-center h-64 w-full cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-700">
                    {isDragActive ? (
                      <span>Drop the file here ...</span>
                    ) : (
                      <span>
                        Upload your csv file
                      </span>
                    )}
                  </p>
                </div>
              </div>
          
              <Select
                label="Input Columns"
                placeholder="Select the input columns"
                selectionMode="multiple"
                className="max-w-xs"
              >
                {headers.map((header,index) => (
                  <SelectItem key={header}>{header}</SelectItem>
                ))}
              </Select>
              <Select
                label="Output Columns"
                placeholder="Select the output columns"
                selectionMode="multiple"
                className="max-w-xs"
              >
                {headers.map((header,index) => (
                  <SelectItem key={header}>{header}</SelectItem>
                ))}
              </Select>
              <Select
                label="Task Type"
                placeholder="Select a Task"
                className="max-w-xs"
              >
                <SelectItem key="AI">AI</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={closeModal}>
                Close
              </Button>
              <Button color="primary" onClick={closeModal}>
                Agree
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
