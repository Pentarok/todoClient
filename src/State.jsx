import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import { ThreeDots } from 'react-loader-spinner'; // Import the loader
import './state.css';

const TodoApp = () => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');
  const serverUri = 'https://todo-api-git-main-mak-pentaroks-projects.vercel.app';

  const serverUri = 'http://localhost:3000';

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

  // Fetch tasks using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch(`${serverUri}/todos`).then((res) => res.json()),
  
  });

  // Add new task mutation
  const { mutate, isPending } = useMutation({

    mutationFn: async () => {
      console.log(isPending);
      return axios.post(`${serverUri}/todo`, { newTask }, { withCredentials: true });
      console.log(isPending);    
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["todos"]});
      console.log(isPending);
      setNewTask("");
    }
  });
// Define the delete mutation
const deleteMutation = useMutation({
  mutationFn: (taskId) => {
    return axios.delete(`${serverUri}/todo/${taskId}`);
  },
  onSuccess: () => {
    // Invalidate and refetch todos after delete
    queryClient.invalidateQueries({queryKey:["todos"]});
  },
  onError: (error) => {
    console.error("Error deleting task:", error);
  }
});

  // Check loading state
  if (isLoading) {
    return (
      <div className="loader">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div>An error occurred! Reload the page</div>;
  }

  // Check if data is undefined or empty
  return (
    <div className="list-container">
      <h2 className="header">To-Do List App</h2>
      <input
        type="text"
        value={newTask}
        placeholder="Enter task..."
        onChange={traceTask}
      />
  {isPending 
  ?
  <p>Adding task</p>
  :
  <button className="btn add-btn" onClick={mutate}>Add Task</button>
  }
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
          {data && data.length > 0 ? (
            data.map((task, index) => {
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
                    {/* Your action buttons here */}
                    <button className="delete-btn" onClick={()=>deleteMutation.mutate(task._id)}>Delete</button>
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
