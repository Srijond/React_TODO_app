import React from 'react'
import not_tick from '../assets/not_tick.png'
import tick from '../assets/tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({text,id,isComplete,deleteTodo,toggle,dueDate}) => {
  console.log('isComplete',isComplete)
  console.log(dueDate)
  return (
    <div className='flex items-center justify-between my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex felx-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt="" className='w-7'/>
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ?
              "line-through" : ""}`}>
                {text}</p>
            <p className="p-2">Due:{new Date(dueDate).toLocaleDateString()}</p>
        </div>
        <div>
            
        </div>
        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt=""  className='w-3.5 cursor-pointer'/>
    </div>
  )
}

export default TodoItems