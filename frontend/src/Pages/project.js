import Chart from "../Components/Project/gantt";
import PlanForm from "../Components/Project/planForm";
import Overview from "../Components/visFront";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Project = () => {
    return(
        <Container fluid>
            <Row>
                <Col sm={2} className="bg-light">
                  <Overview name={"Silyu"}></Overview>
                </Col>
                <Col sm={10}>
                  <Chart />
                  <hr />
                  <PlanForm />
                </Col>
            </Row>
        </Container>
    )
}
export default Project