import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './../styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [edit, setEdit] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [togg, setTogg] = useState(edit && true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        task,
        ed: false,
      }
      setTasks([...tasks, newTask])
      setTask('')
    }
  }
  const update = (id) => {
    setIsEdit(false)
    const newTasks = tasks
    newTasks.forEach((ele) => {
      if (ele.id === id) {
        ele.task = edit
        ele.ed = false
      }
    })
    setTasks(newTasks)
    setEdit('')
  }
  const change = (id) => {
    setIsEdit(true)
    const toEdit = tasks.find((ele) => ele.id === id)
    toEdit.ed = true
    setEdit(toEdit.task)
  }
  const remove = (id) => {
    const newTasks = tasks.filter((ele) => ele.id !== id)
    setTasks(newTasks)
  }
  useEffect(() => {
    setTogg(edit ? false : true)
  }, [edit])

  return (
    <div id="main">
      <form>
        <input
          type="text"
          name="task"
          value={task}
          id="task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" id="btn" onClick={(e) => handleSubmit(e)}>
          Add
        </button>
      </form>
      <ul>
        {tasks.map((ele) => {
          const { id, task, ed } = ele
          return (
            <li key={id}>
              {isEdit && ed ? (
                <>
                  <input
                    className="editTask"
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                  <button
                    className="saveTask "
                    disabled={togg}
                    onClick={() => update(id)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  {task}
                  <button className="delete" onClick={() => remove(id)}>
                    Delete
                  </button>
                  <button className="edit" onClick={() => change(id)}>
                    Edit
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
