import './App.css';

import HomePage from './components/homepage';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/Dashboard';
import Transactions from "./components/transactions";

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/"  element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/dashboard/transactions" element={<Transactions />}></Route>
          </Routes>
      </Router>
      
  );
}

export default App;
