/* eslint-disable default-case */
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Tasks from "../../services/Tasks";
import { toast } from "react-toastify";

export default function Board() {
  
    const [todo, setTodo] = useState([{
        taskId:'',
        taskName:''
    }])
    const [inProgress,setInProgress] = useState([{
        taskId:'',
        taskName:''
    }
    ])
    const [done,setDone] = useState([{
        taskId:'',
        taskName:''
    }
    ])

    const getAllTask = async()=>{
        try{
            const taskResponse = await Tasks.getAll()
            setTodo(taskResponse.todo)
            setInProgress(taskResponse.inProgress)
            setDone(taskResponse.done)    
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTask()
    }, []);

  
    const handleDragEnd = async (result) => {       
        const { destination, source, draggableId } = result;
        if (!destination || source.droppableId === destination.droppableId) return;

        let formData = {
            "taskId":draggableId,
            "statusId":destination.droppableId
        }
        if(source.droppableId && destination.droppableId){
            try{
                const statusResponse = await Tasks.taskStatusChange(formData)
                if(statusResponse){
                    toast.success('sucessfully moved')
                    getAllTask()
                }
                
            }catch(error){
                console.log(error)
            }
            
        }
    };


    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1300px",
                    margin: "0 auto"
                }}
            >
                <Column title={"TO DO"} tasks={todo} id={"1"} />
                <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
                <Column title={"DONE"} tasks={done} id={"3"} />
            </div>
        </DragDropContext>
    );
}