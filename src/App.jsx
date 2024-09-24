import { useState } from 'react';
import Card from './Card.jsx';
import List from './list.jsx';

import Header from './Header.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import profile from './assets/profile.jpg';
import profile2 from './assets/profile2.jpg';
import profile3 from './assets/profile3.jpg';
import profile4 from './assets/profile4.jpg';
import profile5 from './assets/profile5.jpg';

import State from './State.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import BlogList from './BlogList.jsx';
import Footer from './Footer.jsx';
import TodoApp from './State.jsx';
function App() {


  return (

    <>

    <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<BlogList/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/todo' element={<TodoApp/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
    </Routes>
 
    </BrowserRouter>


    </>
    
  );
}

export default App;
