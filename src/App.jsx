import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoApp from './Todo.jsx';

import NotFound from './NotFound'; // A new NotFound component for undefined routes

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        
          <Route path='/todo' element={<TodoApp />} />

          {/* Catch-all route for undefined paths */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
