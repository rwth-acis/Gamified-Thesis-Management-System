import Login from "./login"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
              <br />
              <Row className="text-center">
                <Col>
                  <Login />
                </Col>
                <Col>
                  <h5 className="text-center">Already Signed In? Click The Logo To Refresh!</h5>
                </Col>
              </Row> 
            </Col>   
        </Container>
    )
}

export default LoginPage