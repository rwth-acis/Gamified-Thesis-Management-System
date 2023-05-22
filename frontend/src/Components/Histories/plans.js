import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

const Plans = ({history}) => {

    // Plans Pagination
    let plan = history
    const [currentPlanPage, setCurrentPlanPage] = useState(0)
    const dataPerPlanPage = 10 // Number of items to display per page
    const pageCount = Math.ceil(plan.length / dataPerPlanPage)

    const handlePageChange = ({ selected }) => {
        setCurrentPlanPage(selected)
    }

    const displayedData = 
    plan.length > 10 ?
    plan.slice(
        currentPlanPage * dataPerPlanPage,
        (currentPlanPage + 1) * dataPerPlanPage
    ):
    plan
    /*
    const [currentPlanPage, setCurrentPlanPage] = useState(1);
    const dataPerPlanPage = 10;  
    const lastPlan = currentPlanPage * dataPerPlanPage;
    const firstPlan = lastPlan - dataPerPlanPage;
    // Get the current page of data to display
    let displayedData = null
    if(plan.length > 10) {
      displayedData = plan.slice(firstPlan, lastPlan);
    } else {
      displayedData = plan
    }*/

    return(
            <div>
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
                    {displayedData.length > 0 ? (displayedData.map((plan, index) => (
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
                </Table>
                <ReactPaginate
                    previousLabel="< Previous"
                    nextLabel="Next >"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                />
                  {/** <tfoot>
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
                  </tfoot>*/}
                  
                  
            </div>  
    )
}
export default Plans