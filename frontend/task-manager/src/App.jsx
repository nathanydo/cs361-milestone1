import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Calendar from"./pages/Calendar/Calendar";
import Tasks from "./pages/Tasks/Tasks";


const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/calendar" element={<Calendar/>} />
    </Routes>
  </Router>
);


const App = () => {
    return (
      <div>{routes}</div>
    );
}

export default App;
      