import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoApp from './State.jsx';
import BlogList from './BlogList'; // Example import for BlogList component
import About from './About'; // Example import for About component
import Contact from './Contact'; // Example import for Contact component
import NotFound from './NotFound'; // A new NotFound component for undefined routes

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<TodoApp />} />
          <Route path='/contact' element={<Contact />} />
          {/* Catch-all route for undefined paths */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
