import { useState } from "react";
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import {Task} from "../../lib/types/task";

export default function Detail({task, visible, closeModal}:
{task:Task|null,visible:boolean,closeModal:()=>void}) {
    if(!task){
        return null;
    }
    return(
    <Modal closeButton aria-labelledby="modal-title" isOpen={visible} onClose={closeModal} size="4xl">
        <ModalContent>
          {(closeModal) => (
            
            <>
              <ModalHeader className="flex flex-col gap-1">{task.title}</ModalHeader>
              <ModalBody>
                <div className="flex">
                    <div>Input Column:</div>
                    {task.inputCol.map((col,index)=>(
                        <div>{col}|</div>
                    ))}
                </div>
                <div className="flex">
                    <div>Output Column:</div>
                    {task.outputCol.map((col,index)=>(
                        <div>{col}|</div>
                    ))}
                </div>
                <div className="flex">
                    <div>Task Type:</div>
                    {task.taskType}
                </div>
                <div className="flex">
                    <div>Prompt:</div>
                    {task.prompt}
                </div>
                <div className="flex">
                    <div>Status:</div>
                    {task.status}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={closeModal}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
  </Modal>
    );

}