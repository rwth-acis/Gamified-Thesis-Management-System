import { Container, Row, Col, Badge, ListGroup } from "react-bootstrap";
import {FcViewDetails, FcTreeStructure, FcFeedback, FcConferenceCall} from 'react-icons/fc'
import {MdOutlineColorLens, MdManageHistory} from 'react-icons/md'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {GiAchievement} from 'react-icons/gi'

const Tutorial = () => {

    const colors = [
        {color: 'success', meaning: 'Finished'},
        {color: 'primary', meaning: 'Not due yet'},    
        {color: 'warning', meaning: 'Due today'},
        {color: 'danger', meaning: 'Overdue'},
        {color: 'secondary', meaning: 'Plan is empty'}
      ]

    return(
        <Container>
            <Row><h3 className="text-center">Welcome to the tutorial!</h3></Row>
            <br />
            <Col>

              <Row><h5><FcViewDetails/> About this platform:</h5></Row>
                <Row><p>We hope this platform could give you some support while you writing your thesis, as we know how uneasy for most students this process is.</p></Row>
                <Row><br/></Row>

              <Row><h5><FcTreeStructure/> Platform Structure:</h5></Row>
                <Row><p>Each user has a thesis project which you can configure in the Profile section in Navbar. 
                  <p></p>Each thesis project has several plans which you can create and edit in the <a href="/project">Plans page</a>.
                  <p></p>Each plan has several todos which you can create and edit in the <a href="/weekly">ToDos page</a>.
                  <p></p>A plan such as "Conduct Evaluation" has higher hierarchy than a todo such as "Design the Questionnair"
                  . Therefor you always need to firstly create a plan and then create some todos for it.</p></Row>
                <Row><br/></Row>

              <Row><h5><MdOutlineColorLens/> Color Patterns:</h5></Row>
                <Row><p>There are five colors in this platform used to indicate different status of a plan and a todo, as shown below:</p></Row>
                <Row><p>The progress of a plan is calculated by its todos as:( number of doing + number of finished * 5 / number of all * 5)</p></Row>
                <Row>  
                  {colors.map((color, index) => (
                      <Col key={index}>
                        <h6><Badge pill bg={color.color}>{color.meaning}</Badge></h6>
                      </Col>))
                  } </Row>
                <Row><br/></Row>

              <Row><h5><FcConferenceCall/> Peers Page</h5></Row>
                <Row><p>The <a href="/allstudents">Peers page</a> provides you with an overview of the thesis projects from your peer students. You can view their plans and todos there.
                  <p></p>To have your thesis also visible there, you need to set it to be visible in your thesis configuration. By default it's set to be not visible.</p></Row>
                <Row><br/></Row>

              <Row><h5><MdManageHistory/> History Page</h5></Row>
                <Row><p>The <a href="/history">History Page</a> provides you with an overview of all users and their thesis projects. And it is only visible to supervisors
                <p></p>If you need to be a supervisor, please contact us.</p></Row>
                <Row><br/></Row>

              <Row><h5><GiAchievement/> Gamification</h5></Row>
                <Row><p>This platform is gamified, so that actions such as creating a plan and finishing a todo would bring you incentives. 
                <p></p>All your gamification elements are displayed in the Profile section.  
                <p></p>You may also want to check out all the gamification elements you can collect in the Profile section.</p></Row>
                <Row><br/></Row>

              <Row><h5><FcFeedback/> Feedback</h5></Row>
                <Row><p>If you have questions or feedback about this platform, please let us know.</p></Row>
            </Col>
            
        </Container>
    )
}

export default Tutorial