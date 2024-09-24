/* import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const traceTask = (e) => {
    setNewTask(e.target.value);
  };
var serverUri='https://todo-api-git-main-mak-pentaroks-projects.vercel.app';
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${serverUri}/todos`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const res = await axios.post(`${serverUri}/todo`, { newTask }, { withCredentials: true });
        console.log(res);

        const newTaskObject = { _id: res.data._id, Task: res.data.Task };
        setTasks((t) => [...t, newTaskObject]);
        setNewTask('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = async (index, id) => {
    try {
      const res = await axios.delete(`serverUri/todo/${id}`); // Fixed string interpolation
      console.log(res);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const moveTaskUp = async (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      
      setTasks(updatedTasks);
      
      // Update the database with the new order
      await updateTaskOrderInDB(updatedTasks);
    }
  };

  const moveTaskDown = async (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      
      setTasks(updatedTasks);
      
      // Update the database with the new order
      await updateTaskOrderInDB(updatedTasks);
    }
  };

  // Function to send the updated task order to the backend
  const updateTaskOrderInDB = async (updatedTasks) => {
    try {
      const tasksToUpdate = updatedTasks.map((task, index) => ({
        _id: task._id,
        order: index, // Set the order based on the current index
      }));

      await axios.put(`http://localhost:3000/todo/updateOrder`, { tasks: tasksToUpdate }, { withCredentials: true });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  return (
    <div className="list-container">
      <h2 className='header'>To-Do List App</h2>
      <input type="text" value={newTask} placeholder='Enter task...' onChange={traceTask} />
      <button className='btn add-btn' onClick={addTask}>Add Task</button>
      <ol>
        {
          tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={task._id}>
                <span className='text'>{task.Task}</span>
                <span className='text'>{task.createdAt}</span>
                <button className='delete-btn' onClick={() => deleteTask(index, task._id)}>Delete</button>
                <button className='move' onClick={() => moveTaskUp(index)}>👆</button>
                <button className='move' onClick={() => moveTaskDown(index)}>👇</button>
              </li>
            ))
          ) : (
            <div>You have no tasks yet</div>
          )
        }
      </ol>
    </div>
  );
};

export default TodoApp;
 */


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Define the server URI
  const serverUri = 'https://todo-api-git-main-mak-pentaroks-projects.vercel.app';

  const traceTask = (e) => {
    setNewTask(e.target.value);
  };
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleString('en-US', options);
};

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${serverUri}/todos`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const res = await axios.post(`${serverUri}/todo`, { newTask }, { withCredentials: true });
        const newTaskObject = { _id: res.data._id, Task: res.data.Task, createdAt: res.data.createdAt, done: res.data.done };
        setTasks((t) => [...t, newTaskObject]);
        setNewTask('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = async (index, id) => {
    try {
      await axios.delete(`${serverUri}/todo/${id}`); // Correctly reference serverUri
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const markAsDone = async (id, done) => {
    try {
      const res = await axios.put(`${serverUri}/todo/${id}/markDone`, { done: !done }); // Toggle done
      setTasks(tasks.map(task => (task._id === id ? res.data : task))); // Update task state
    } catch (error) {
      console.log(error);
    }
  };

  const moveTaskUp = async (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      await updateTaskOrderInDB(updatedTasks);
    }
  };

  const moveTaskDown = async (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      await updateTaskOrderInDB(updatedTasks);
    }
  };

  const updateTaskOrderInDB = async (updatedTasks) => {
    try {
      const tasksToUpdate = updatedTasks.map((task, index) => ({
        _id: task._id,
        order: index,
      }));

      await axios.put(`${serverUri}/todo/updateOrder`, { tasks: tasksToUpdate }, { withCredentials: true });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  return (
    <div className="list-container">
      <h2 className='header'>To-Do List App</h2>
      <input type="text" value={newTask} placeholder='Enter task...' onChange={traceTask} />
      <button className='btn add-btn' onClick={addTask}>Add Task</button>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => {
              const formattedDate = formatDate(task.createdAt);
              const [day, ...dateParts] = formattedDate.split(', ');
              return (
                <tr key={task._id}>
                  <td>{day}</td>
                  <td>{dateParts.join(', ')}</td>
                  <td className="task-cell" style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.Task}
                  </td>
                  <td>
                    <button className='delete-btn' onClick={() => deleteTask(index, task._id)}>Delete</button>
                    <button className='move' onClick={() => moveTaskUp(index)}>👆</button>
                    <button className='move' onClick={() => moveTaskDown(index)}>👇</button>
                    <button className='mark-done-btn' onClick={() => markAsDone(task._id, task.done)}>
                      {task.done ? 'Undo' : 'Mark as Done'}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">You have no tasks yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;


