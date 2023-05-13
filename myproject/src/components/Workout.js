import { useState } from "react";
import {useDrag} from "react-dnd";
const Workout = (props) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "workout",
        item: {id: props.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    return (
        
        <div ref = {drag} className = "bg-white h-screen text-center">
            <h1 className = "text-xl">{props.name}</h1>
            <p>{props.time}</p>
          
            
        </div>
        
    );

};


export default Workout;