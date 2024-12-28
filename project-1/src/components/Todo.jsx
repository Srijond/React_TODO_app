import React, { useRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import "react-datepicker/dist/react-datepicker.css";

const Todo = () => {


const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? 
JSON.parse(localStorage.getItem("todos")): []);  
const [filter, setFilter] = useState('all');
const [selectedDate, setSelectedDate] = useState(null);

const inputRef = useRef();
const add = ()=>{
    const inputText = inputRef.current.value.trim();
    // console.log(inputText);
    if(inputText === ""){
        return null;
    }
    console.log('Selected Due Date:', selectedDate);

    const newTodo = {
        id:Date.now(),
        text:inputText,
        isComplete:false,
        dueDate: selectedDate.toISOString()
    }
    setTodoList((prev)=> [...prev,newTodo]);
    inputRef.current.value = "";
    setSelectedDate(null);



}
const deleteTodo  = (id) =>{
    setTodoList((prevTodos)=>{
        return prevTodos.filter((todo) => todo.id !== id)
    })
}

const toggle = (id)=>{
    setTodoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
            if (todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}
useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList))
},[todoList])



const filteredTodos = todoList.filter((todo)=>{
    if (filter === 'pending') return !todo.isComplete
    if(filter === 'completed') return todo.isComplete
    return todo
})


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[550px] rounded-xl'>
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To Do List</h1>

        </div>
        <div className="my-10 mx-auto max-w-3xl">
  <div className="flex flex-col gap-4 bg-gray-100 p-6 rounded-xl shadow-md">
    {/* Task Input */}
    <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
      <input
        ref={inputRef}
        className="bg-transparent border-0 outline-none 
          flex-1 h-12 pl-2 placeholder:text-gray-600 text-gray-800 text-lg"
        type="text"
        placeholder="Add your task"
      />
    </div>

    {/* Due Date Picker */}
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Select a due date"
        minDate={new Date()}
        className="w-full bg-gray-200 border-0 outline-none 
          h-12 pl-4 pr-2 placeholder:text-gray-600 text-gray-800 rounded-full"
        calendarClassName="rounded-lg shadow-lg bg-white"
        popperPlacement="bottom-start"
      />
    </div>

    {/* Add Button */}
    <div className="flex justify-end">
      <button
        onClick={add}
        className="rounded-full bg-orange-500 hover:bg-orange-600 
          transition-colors w-36 h-12 text-white text-lg font-medium shadow-md"
      >
        ADD +
      </button>
    </div>
  </div>
</div>

        
        <div className='flex justify-around my-4'>
        <label><input type='radio'name='filter'value='all'
            checked={filter === 'all'}
            onChange={(e) => setFilter(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type='radio'
            name='filter'
            value='pending'
            checked={filter === 'pending'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Pending
        </label>
        <label>
          <input
            type='radio'
            name='filter'
            value='completed'
            checked={filter === 'completed'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Completed
        </label>
      </div>
        <div>
            {filteredTodos.map((item,index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} 
                isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} dueDate={item.dueDate}/>
            })}
            {/* <TodoItems text="Learn coding"/>
            <TodoItems text="Learn coding from Srijon"/>
            <TodoItems text="Learn C Program"/> */}
        </div>
        

    </div>
  )
}

export default Todo