import { Container, Row, Col, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { FcBullish, FcApproval, FcTodoList} from 'react-icons/fc';
import B1 from '../Pics/Badges/badge1.jpg';
import B2 from '../Pics/Badges/badge2.jpg';
import B3 from '../Pics/Badges/badge3.jpg';
import B4 from '../Pics/Badges/badge4.jpg';
import B5 from '../Pics/Badges/badge5.jpg';
import B6 from '../Pics/Badges/badge6.jpg';
import B7 from '../Pics/Badges/badge7.jpg';
import B8 from '../Pics/Badges/badge8.jpg';

const AllAchievements = () => {


    return (
        <Container>
            <Row><h5><FcBullish/> Levels And Their Points Thresholds</h5></Row>
            <ListGroup>
                <ListGroupItem>
                    START <Badge bg="primary" pill>0</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Newbie <Badge bg="primary" pill>1</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Novoice <Badge bg="primary" pill>25</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Professional <Badge bg="primary" pill>60</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Expert <Badge bg="primary" pill>100</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Master <Badge bg="primary" pill>200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Graduand <Badge bg="primary" pill>300</Badge>
                </ListGroupItem>
            </ListGroup>
            <br />

            <Row><h5><FcApproval/> Achievements and Their Badges</h5></Row>
            <ListGroup>
                <ListGroupItem>
                    First ToDo : <img src={B1} alt='first ToDo badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    First Plan : <img src={B2} alt='first plan badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    First ToDo Finished : <img src={B3} alt='first ToDo finished badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    First Plan Finished : <img src={B4} alt='first plan finished badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    5 ToDos Finished : <img src={B5} alt='5 todos finished badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    5 Plans Finished : <img src={B6} alt='5 plans finished badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    10 ToDos Finished : <img src={B7} alt='10 ToDo finished badge' style={{width: "20px"}} />
                </ListGroupItem>
                <ListGroupItem>
                    10 Plans Finished : <img src={B8} alt='10 plans finished badge' style={{width: "20px"}} />
                </ListGroupItem>
            </ListGroup>
            <br />

            <Row><h5><FcTodoList/> Actions and Their Incentives</h5></Row>
            <ListGroup>
                <ListGroupItem>
                    Add a new ToDo <Badge pill bg="primary">1 point</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Add a new Plan <Badge pill bg="primary">5 point</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Finishe a ToDo <Badge pill bg="primary">4 point</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Finish a Plan <Badge pill bg="primary">25 point</Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Undo a Plan <Badge pill bg="warning">-25 point</Badge>
                </ListGroupItem>
            </ListGroup>

        </Container>
    )
}

export default AllAchievements