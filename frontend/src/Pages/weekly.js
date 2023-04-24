import TodoForm from "../Components/Weekly/todoForm";
import Trello from "../Components/Weekly/trello";
import Overview from "../Components/visFront";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Weekly = () => {
  
    return(
        <Container fluid>
            <Row>
              {/** 
                <Col sm={2} className="bg-light">
                  <Overview name={"Silyu"}></Overview>
    </Col>*/}
                <Col sm={8}>
                  <Trello />
                </Col>  
                <Col sm={4}>
                  <TodoForm />
                </Col>
            </Row>
        </Container>
    )
}
export default Weekly