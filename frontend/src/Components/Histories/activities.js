import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

const Activity = ({history}) => {

    // const [hist, setHist] = useState([])
    let hist = history
    const [currentActPage, setCurrentActPage] = useState(0)
    const dataPerActPage = 10 // Number of items to display per page
    const pageCount = Math.ceil(hist.length / dataPerActPage)

    const handlePageChange = ({ selected }) => {
        setCurrentActPage(selected)
    }

    const displayedData = 
    hist.length > 10 ?
    hist.slice(
        currentActPage * dataPerActPage,
        (currentActPage + 1) * dataPerActPage
    ):
    hist
    /*
    const [currentHistPage, setCurrentHistPage] = useState(1);
    const dataPerHistPage = 10;  
    const lastHist = currentHistPage * dataPerHistPage;
    const firstHist = lastHist - dataPerHistPage;
    // Get the current page of data to display
    let displayedData = null
    let totalHistPages = 0
    if(hist.length > 10) {
      displayedData = hist.slice(firstHist, lastHist)
      totalHistPages = Math.ceil(hist.length / dataPerHistPage)
    } else {
      displayedData = hist
    } * */

    return(
        <div>
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
                  {displayedData.length > 0 ? (displayedData.map((his, index) => (
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
            {/** <tbody>
                  {displayedData.length > 0 ? (displayedData.map((his, index) => (
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
                </tfoot>*/}
            </div>)
}
export default Activity