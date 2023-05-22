import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";

const Plans = ({history}) => {

    // Plans Pagination
    let plan = history
    const [currentPlanPage, setCurrentPlanPage] = useState(1);
    const dataPerPlanPage = 10;  
    const lastPlan = currentPlanPage * dataPerPlanPage;
    const firstPlan = lastPlan - dataPerPlanPage;
    // Get the current page of data to display
    let currentPlanData = null
    if(plan.length > 10) {
      currentPlanData = plan.slice(firstPlan, lastPlan);
    } else {
      currentPlanData = plan
    }

    return(
        <Table striped bordered hover size="sm">
                  <caption>Plans Overview</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>StartDate</th>
                      <th>Progress</th>
                      <th>DueDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlanData.length > 0 ? (currentPlanData.map((plan, index) => (
                      <tr key={index}>
                        <td >{plan.title}</td>
                        <td >{plan.content}</td>
                        <td >{(new Date(plan.startDate)).toLocaleDateString("en-GB")}</td>
                        <td >{plan.progress.progress*100}%</td>
                        <td >{(new Date(plan.endDate)).toLocaleDateString("en-GB")}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      </tr>)}
                  </tbody>
                  
                  <tfoot>
                      <tr>
                        <td> 
                          <Row>
                            <Col>
                              {firstPlan> 1 ?
                              (<Button variant="outline-success" size="sm" onClick={() => setCurrentPlanPage(currentPlanPage - 1)}>
                                Last
                              </Button>)
                              :
                              (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentPlanPage(currentPlanPage - 1)}>
                                Last
                              </Button>)
                              }
                            
                              {lastPlan < plan.length ?
                              (<Button variant="outline-success" size="sm" onClick={() => setCurrentPlanPage(currentPlanPage + 1)}>
                                Next
                              </Button>)
                              :
                              (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentPlanPage(currentPlanPage + 1)}>
                                Next
                              </Button>)
                              }
                            </Col>
                          </Row> 
                        </td>
                      </tr>
                  </tfoot>
                  
              </Table>
    )
}
export default Plans