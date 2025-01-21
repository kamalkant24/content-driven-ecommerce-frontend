import { Rating } from "@mui/material";
import { useState } from "react";

const TestPage = () => {

    const arrayData=[
        {
            name:"test",
            id:"1"
        },
        {
            name:"test1",
            id:"2"
        },
        {
            name:"test2",
            id:"3"
        },
        {
            name:"test3",
            id:"4"
        },
        {
            name:"test4",
            id:"5"
        },
    ]

const [state,setState] :any=useState([])


  const handleUpdateArray=(id :any,value:any)=>{

    const index = state.findIndex((item :any)=> item.id === id);
    if (index !== -1) {
      // If id exists, update the value
      const newData = [...state];
      newData[index].value = value;
      setState(newData);
    } else {
      // If id doesn't exist, add a new object to the array
      setState([...state, { id, value }]);
    }

    // setState([...state,newdata])
  }

  console.log('state', state)



  return (
    <div className="pt-8">
{arrayData.map((ele,index)=>(

    <div key={index}>
        <div className="container flex justify-between">
    <h2>
{ele.name}
    </h2>
    <Rating
  name="simple-controlled"

  onChange={(e :any)=>{
    const id :any=ele.id
    const value:string|any =e.target.value
    
    handleUpdateArray(id,value)}}
/>
</div>
            </div>
    ))}

<button>test to update</button>



      
    </div>
  )
}

export default TestPage
