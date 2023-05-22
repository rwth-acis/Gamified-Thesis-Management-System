import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";

const Activity = ({history}) => {

    // const [hist, setHist] = useState([])
    let hist = history
    const [currentHistPage, setCurrentHistPage] = useState(1);
    const dataPerHistPage = 10;  
    const lastHist = currentHistPage * dataPerHistPage;
    const firstHist = lastHist - dataPerHistPage;
    // Get the current page of data to display
    let currentHistData = null
    let totalHistPages = 0
    if(hist.length > 10) {
      currentHistData = hist.slice(firstHist, lastHist)
      totalHistPages = Math.ceil(hist.length / dataPerHistPage)
    } else {
      currentHistData = hist
    } 

    return(
        <Table striped bordered hover size="sm">
            <caption>Activities History</caption>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Object</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistData.length > 0 ? (currentHistData.map((his, index) => (
                    <tr key={index}>
                      <td >{(new Date(his.time)).toLocaleDateString("en-GB")}</td>
                      <td >{his.content}</td>
                      <td >{his.types}</td>
                    </tr>
                    ))) 
                  : (<tr>
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
                            {firstHist > 1 ?
                            (<Button variant="outline-success" size="sm" onClick={() => setCurrentHistPage(currentHistPage - 1)} style={{marginRight: '10px'}}>
                              Last
                            </Button>)
                            :
                            (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentHistPage(currentHistPage - 1)} style={{marginRight: '10px'}}>
                              Last
                            </Button>)
                            }

{Array.from({ length: totalHistPages }, (_, index) => (
        <span
          className="text-muted"
          key={index}
          onClick={() => setCurrentHistPage(index + 1)}
          disabled={currentHistPage === index + 1}
          style={{marginRight: '10px', cursor: 'pointer'}}
        >
          {index + 1}
        </span>
      ))}
                          
                            {lastHist < hist.length ?
                            (<Button variant="outline-success" size="sm" onClick={() => setCurrentHistPage(currentHistPage + 1)}>
                              Next
                            </Button>)
                            :
                            (<Button variant="outline-success" size="sm" disabled onClick={() => setCurrentHistPage(currentHistPage + 1)}>
                              Next
                            </Button>)
                            }
                          </Col>
                        </Row> 
                      </td>
                    </tr>
                </tfoot>
                
            </Table>)
}
export default Activity