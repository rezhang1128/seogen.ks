"use client";
import {Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faRotate, faCircleCheck, faXmark, faCaretRight,faPlus } from '@fortawesome/free-solid-svg-icons';
import {Task} from "../../lib/types/task";
import Detail from "./detail";
import NewTask from "./newTask";

export default function Dashboard() {
    const dummyTasks = [
        {
          title: 'data migration',
          taskType: 'database update',
          status: 'complete',
          inputCol: ['ID', 'Name', 'Age'],
          outputCol: ['UserID', 'FullName', 'AgeRange'],
          prompt: 'Transfer user records to the new database schema.'
        },
        {
          title: 'image classification',
          taskType: 'machine learning',
          status: 'warning',
          inputCol: ['ImageID', 'ImagePath'],
          outputCol: ['Category', 'ConfidenceScore'],
          prompt: 'Categorize images by content using a trained neural network.'
        },
        {
          title: 'sentiment analysis',
          taskType: 'text processing',
          status: 'process',
          inputCol: ['ReviewID', 'TextContent'],
          outputCol: ['SentimentResult', 'Certainty'],
          prompt: 'Determine the sentiment polarity of user reviews.'
        },
        {
          title: 'sales forecasting',
          taskType: 'data analysis',
          status: 'complete',
          inputCol: ['Week', 'Sales', 'Promotions'],
          outputCol: ['PredictedSales', 'Accuracy'],
          prompt: 'Predict future sales based on historical data trends.'
        },
        {
          title: 'fraud detection',
          taskType: 'anomaly detection',
          status: '',
          inputCol: ['TransactionID', 'Amount', 'AccountID'],
          outputCol: ['FraudFlag', 'RiskScore'],
          prompt: 'Identify potentially fraudulent transactions.'
        }
      ];
    
    const [showDetail, setShowDetail] = useState(false);
    const [newTask, setNewTask] = useState(false);

    const [currTask, setCurrTask] = useState<Task|null>(null);
    const renderStatus = (status:string) => {
        if(status == "complete"){
            return <FontAwesomeIcon icon={faCircleCheck} color="green"/>;
        }else if(status == "warning"){
            return <FontAwesomeIcon icon={faCircleExclamation} color="orange"/>;
        }else if(status == "process"){
            return <FontAwesomeIcon icon={faRotate}/>;
        }
        return <FontAwesomeIcon icon={faXmark} color="red"/>;
    };
    const handleDetailClick = (task:Task) => {
        setCurrTask(task);
        setShowDetail(true);
    }
    const handleNewClick =()=>{
        setNewTask(true);
    }
    const closeDetail = ()=>{
        setShowDetail(false);
    }
    const closeNewTask = ()=>{
        setNewTask(false);
    }
  return (
    <div className="flex flex-col">
        <div className="bg-black w-full h-12 flex items-center">
            <p className="text-white text-2xl">Dashboard</p>
        </div>
        <Table 
        className=" mt-6"
          >
            <TableHeader>
                <TableColumn key={"title"}>Title</TableColumn>
                <TableColumn key={"taskType"}>Task Type</TableColumn>
                <TableColumn key={"status"}>Status</TableColumn>
                <TableColumn key={'detail'}> </TableColumn>
            </TableHeader>
            <TableBody>
                {dummyTasks.map((task, index) => (
                    <TableRow key={index}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.taskType}</TableCell>
                        <TableCell>{renderStatus(task.status)}</TableCell>
                        <TableCell>
                            <Button onClick={()=>handleDetailClick(task)} color="default" radius="full" size="sm">
                                Detail
                                <FontAwesomeIcon icon={faCaretRight}/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className="flex justify-end">
            <Button onClick={handleNewClick} className="w-40 mt-6 mr-4" color="primary">
                <FontAwesomeIcon icon={faPlus} color="white"/>
                New Task
            </Button>
        </div>
        
        <Detail visible={showDetail} task={currTask} closeModal={closeDetail}/>
        <NewTask visible={newTask} closeModal={closeNewTask}/>
        
    </div>
  );
}
