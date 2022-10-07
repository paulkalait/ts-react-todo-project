import React, { useRef } from 'react'
import './styles.css'

//define the prop types first
interface Props{ 
    toDo: string;
    setToDo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: ( e: React.FormEvent) => void;
  }
const InputFeild = ({ toDo, setToDo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e) =>{
        handleAdd(e)
        inputRef.current?.blur()
    }
}>
        <input ref={inputRef} type='input' value={toDo} onChange={(e) => setToDo(e.target.value)} placeholder='enter a task' className='input__box'/>
        <button className='input__submit' type='submit'>Add</button>
    </form>
  )
}

export default InputFeild