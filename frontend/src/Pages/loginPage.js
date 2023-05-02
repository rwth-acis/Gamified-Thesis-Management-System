import Login from "./login"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Button from "react-bootstrap/esm/Button";

const LoginPage = () => {

    const handleClick = () => {
        window.location.reload()
    }

    return (
        <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <Col>
              <Row>
                <h3 className="text-center" >Welcome to the thesis management system of the RWTH Informatik 5, please sign in to continue</h3>
              </Row>
              <br />
              <Row>
                  <Login />
                  <hr />
                  <a href="" className="text-center" onClick={handleClick}>Already Signed In? Click Here To Refresh!</a>
              </Row> 
            </Col>   
        </Container>
    )
}

export default LoginPage