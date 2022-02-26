import './App.css';

//Router
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from "./components/Dashboard.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:userID/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
