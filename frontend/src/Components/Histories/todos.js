import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";

const Todos = ({history}) => {

    let todo = history
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

    return(
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
                  </tfoot>  
              </Table>
    )
}
export default Todos
