import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

const Todos = ({history}) => {

    let todo = history
    const [currentTodoPage, setCurrentTodoPage] = useState(0)
    const dataPerTodoPage = 10 // Number of items to display per page
    const pageCount = Math.ceil(todo.length / dataPerTodoPage)

    const handlePageChange = ({ selected }) => {
        setCurrentTodoPage(selected)
    }

    const displayedData = 
    todo.length > 10 ?
    todo.slice(
        currentTodoPage * dataPerTodoPage,
        (currentTodoPage + 1) * dataPerTodoPage
    ):
    todo
    /*
    // Todos Pagination
    const [currentTodoPage, setCurrentTodoPage] = useState(1);
    const dataPerTodoPage = 10;  
    const lastTodo = currentTodoPage * dataPerTodoPage;
    const firstTodo = lastTodo - dataPerTodoPage;
    // Get the current page of data to display
    let currentTodoData = null
    if(todo.length > 10) {
      currentTodoData = todo.slice(firstTodo, lastTodo);
    } else {
      currentTodoData = todo
    }
    */

    return(
        <div>
            <Table striped bordered hover size="sm">
                <caption>ToDos Overview</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>CreateDate</th>
                      <th>Status</th>
                      <th>DueDate</th>
                      <th>Part Of</th>
                    </tr>
                  </thead>
                  <tbody>
                  {displayedData.length > 0 ? (displayedData.map((todo, index) => (
                      <tr key={index}>
                        <td >{todo.title}</td>
                        <td >{todo.content}</td>
                        <td >{(new Date(todo.date)).toLocaleDateString("en-GB")}</td>
                        <td >{todo.status}</td>
                        <td >{(new Date(todo.dueDate)).toLocaleDateString("en-GB")}</td>
                        <td>{todo.ofPlanName}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
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
            {/**<tbody>
                    {currentTodoData.length > 0 ? (currentTodoData.map((todo, index) => (
                      <tr key={index}>
                        <td >{todo.title}</td>
                        <td >{todo.content}</td>
                        <td >{(new Date(todo.date)).toLocaleDateString("en-GB")}</td>
                        <td >{todo.status}</td>
                        <td >{(new Date(todo.dueDate)).toLocaleDateString("en-GB")}</td>
                        <td>{todo.ofPlanName}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
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
                              {firstTodo> 1 ?
                              (<Button variant="outline-success" size="sm" onClick={() => setCurrentTodoPage(currentTodoPage - 1)}>
                                Last
                              </Button>)
                              :
                              (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentTodoPage(currentTodoPage - 1)}>
                                Last
                              </Button>)
                              }
                            
                              {lastTodo < todo.length ?
                              (<Button variant="outline-success" size="sm" onClick={() => setCurrentTodoPage(currentTodoPage + 1)}>
                                Next
                              </Button>)
                              :
                              (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentTodoPage(currentTodoPage + 1)}>
                                Next
                              </Button>)
                              }
                            </Col>
                          </Row>
                        </td>
                      </tr>
                  </tfoot> */}
            </div>
    )
}
export default Todos
