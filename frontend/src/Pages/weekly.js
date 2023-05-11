import TodoForm from "../Components/Weekly/todoForm";
import Trello from "../Components/Weekly/trello";
import Overview from "../Components/visFront";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Weekly = () => {
  
    return(
        <Container >
            <Row>
                <Col sm={8}>
                  <Trello />
                </Col>  
                <Col sm={4}>
                  <br/>
                  <TodoForm />
                </Col>
            </Row>
        </Container>
    )
}
export default Weekly