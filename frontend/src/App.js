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
  
  return ( // login not really finished

    <div className="App" >
      <Container>
      <BrowserRouter>
        <Navibar />
        <Routes>
           <Route path={process.env.REACT_APP_PATH} element={tokens ? (
            loading ? (
            <Spinner animation="border" variant="primary" />
            ) : (
            <Home />
          )
        ) : (
          <LoginPage />
        )} />
          <Route path={process.env.REACT_APP_PATH+"project"} element={<Project />} />
          <Route path={process.env.REACT_APP_PATH+"weekly"} element={<Weekly />} />
          <Route path={process.env.REACT_APP_PATH+"history"} element={<History />} />
          <Route path={process.env.REACT_APP_PATH+"allStudents"} element={<All />} />
        </Routes>
      </BrowserRouter>
      </Container>
    </div>

  )
}

export default App;
