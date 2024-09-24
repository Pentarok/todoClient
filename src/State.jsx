import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots loader
import './state.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

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
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get(`${serverUri}/todos`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        _id: Date.now().toString(), // Temporary ID for fast UI updates
        Task: newTask,
        createdAt: new Date(),
        done: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask('');

      // Update the server in the background
      axios.post(`${serverUri}/todo`, { newTask }, { withCredentials: true })
        .then((res) => {
          // Replace temporary task with task from server
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === newTaskObject._id ? { ...task, _id: res.data._id } : task
            )
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const deleteTask = (index, id) => {
    // Remove task from UI first
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));

    // Update the server in the background
    axios.delete(`${serverUri}/todo/${id}`)
      .catch((error) => {
        console.error(error);
      });
  };

  const markAsDone = (id, done) => {
    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? { ...task, done: !done } : task))
    );

    // Update the server in the background
    axios.put(`${serverUri}/todo/${id}/markDone`, { done: !done })
      .catch((error) => {
        console.error(error);
      });
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      updateTaskOrderInDB(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      updateTaskOrderInDB(updatedTasks);
    }
  };

  const updateTaskOrderInDB = (updatedTasks) => {
    const tasksToUpdate = updatedTasks.map((task, index) => ({
      _id: task._id,
      order: index,
    }));

    // Update the server in the background
    axios.put(`${serverUri}/todo/updateOrder`, { tasks: tasksToUpdate }, { withCredentials: true })
      .catch((error) => {
        console.error("Error updating task order:", error);
      });
  };

  if (loading) {
    return (
      <div className="loader">
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
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2 className="header">To-Do List App</h2>
      <input type="text" value={newTask} placeholder="Enter task..." onChange={traceTask} />
      <button className="btn add-btn" onClick={addTask}>Add Task</button>
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
          {tasks.length > 0 ? (
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
                    <button className="delete-btn" onClick={() => deleteTask(index, task._id)}>Delete</button>
                    <button className="move" onClick={() => moveTaskUp(index)}>👆</button>
                    <button className="move" onClick={() => moveTaskDown(index)}>👇</button>
                    <button className="mark-done-btn" onClick={() => markAsDone(task._id, task.done)}>
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
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
