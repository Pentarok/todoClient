

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots spinner

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false); // Start loading as true

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
      setLoading(true);
      const res = await axios.get(`${serverUri}/todos`);
      setTasks(res.data);
     setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
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
if(loading){
  return <p>Loading</p>
}
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
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </td>
            </tr>
          ) : (
            tasks && tasks.length > 0 ? (
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
                <td colSpan="4" style={{ textAlign: 'center' }}>You have no tasks yet</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
