import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState()
  const [createTodo, setCreateTodo] = useState(false)
  const [editTodo, setEditTodo] = useState(false)
  const [createTodoText, setCreateTodoText] = useState('')
  const [editTodoText, setEditTodoText] = useState('')
  const [editTodoId, setEditTodoId] = useState('')
  const handleGetTodos = async () => {
    const response = await (await axios.get('http://localhost:3000/')).data
    setTodos(response)
  }
  const handleCreateTodo = async () => {
    try {
      await axios.post('http://localhost:3000/todo', {
        name: createTodoText,
        isDone: false
      })
      alert("Todo criado com sucesso")
    } catch (error) {
      alert("Erro")
    }
  }

  const handleUpdateTodo = async () => {
    try {
      await axios.put('http://localhost:3000/todo', {
        _id: editTodoId,
        name: editTodoText,
        isDone: false
      })
      alert("Todo atualizado com sucesso")
    } catch (error) {
      alert("Erro")

    }
  }

  useEffect(() => {
    handleGetTodos()
  }, [])
  return (
    <div className="App">
      <h1>Todos</h1>
      <button onClick={() => setCreateTodo(true)}>Criar Todo</button>
      <button onClick={() => handleGetTodos()}>Atualizar Lista</button>
      <div className='todosContainer'>
        {todos?.filter(todo => todo?.name?.length > 0)?.map(todo => (
          <div className='todoItem'>
            {todo.name}
            <button onClick={() => {
              setEditTodo(true)
              setEditTodoId(todo._id)
              setEditTodoText(todo.name)
            }}>
              Editar
            </button>
          </div>
        ))}
      </div>
      {createTodo && (
        <div>Criar Todo: <input value={createTodoText} onChange={(e) => setCreateTodoText(e.currentTarget.value)} />
          <button onClick={() => {
            handleCreateTodo()
            setCreateTodo(false)
          }}>Criar</button>
        </div>
      )}
      {editTodo && (
        <div>Editar Todo : <input value={editTodoText} onChange={(e) => setEditTodoText(e.currentTarget.value)} />
          <button onClick={() => {
            handleUpdateTodo()
            setEditTodo(false)
          }}>Editar</button>
        </div>
      )}
    </div>
  );
}

export default App;
