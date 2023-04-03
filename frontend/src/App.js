import Navibar from "./Components/navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Pages/home";
import Weekly from "./Pages/weekly";
import Project from "./Pages/project";
import Login from "./Pages/login";
import History from "./Pages/history";
import LoginPage from "./Pages/loginPage";
import Spinner from "react-bootstrap/Spinner";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import LoginPage from "./Pages/loginPage";

function App() {

  const [loading, setLoading] = useState(true)
  const [tokens, setToken] = useState("")
  useEffect(() => {
    const token = sessionStorage.getItem('access-token');
    if (!token) { 
    } else {
      setToken(token)
    }
    setLoading(false)
}, [tokens]);

  return ( // login not really finished
    <div className="App" >
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={tokens ? (
            loading ? (
            <Spinner animation="border" variant="primary" />
            ) : (
            <Home />
          )
        ) : (
          <LoginPage />
        )} />
          <Route path="/project" element={<Project />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
