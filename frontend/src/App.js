import Navibar from "./Components/navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/home";
import Weekly from "./Pages/weekly";
import Project from "./Pages/project";
import All from "./Pages/allStudents";
import History from "./Pages/history";
import LoginPage from "./Pages/loginPage";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";


function App() {

  const [loading, setLoading] = useState(true)
  const [tokens, setToken] = useState("")

  

  useEffect(() => {
    console.log(window.location.href)
    const token = sessionStorage.getItem('access-token');
    if (!token) { 
    } else {
      setToken(token)
    }
    setLoading(false)
}, [tokens]);
  //console.log(process.env.REACT_APP_BACKEND_URI)
  return ( // login not really finished

    <div className="App" >
      <Container>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/thesis-system-client" element={tokens ? (
            loading ? (
            <Spinner animation="border" variant="primary" />
            ) : (
            <Home />
          )
        ) : (
          <LoginPage />
        )} />
          <Route path="/thesis-system-client/project" element={<Project />} />
          <Route path="/thesis-system-client/weekly" element={<Weekly />} />
          <Route path="/thesis-system-client/history" element={<History />} />
          <Route path="/thesis-system-client/allstudents" element={<All />} />
        </Routes>
      </BrowserRouter>
      </Container>
    </div>

  )
}

export default App;
