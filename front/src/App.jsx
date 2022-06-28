import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
