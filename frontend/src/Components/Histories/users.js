import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { Button, Col } from "react-bootstrap";

const Users = ( ) => {

    const [user,setUser] = useState([])
    const [reload,setReload] = useState(0)
    const [currentUserPage, setCurrentUserPage] = useState(0)
    const dataPerUserPage = 10 // Number of items to display per page
    const pageCount = Math.ceil(user.length / dataPerUserPage)

    useEffect(() => {
        const fetchUser = async() => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/')
            const json = await response.json()
            setUser(json)
          }
        fetchUser()
    },[reload])
    
    const handlePageChange = ({ selected }) => {
        setCurrentUserPage(selected)
    }
    

    const displayedData = 
    user.length > 10 ?
    user.slice(
        currentUserPage * dataPerUserPage,
        (currentUserPage + 1) * dataPerUserPage
    ):
    user
    /*
    const handleRemove = async() => {

    }*/
    const handleSetAdmin = async(uid) => {
        try {
            const confirm = window.confirm('Are you sure you want to set this user as admin?')
            if(confirm) {
                const response  = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/role/'+uid+'/Supervisors',{
                    method: 'PATCH'
                })
                const json = await response.json()
                if(response.ok) {
                    // window.location.reload()
                    setReload(reload + 1)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleCancelAdmin = async(uid) => {
        try {
            const confirm = window.confirm('Are you sure you want to cancel the admin role of this user?')
            if(confirm) {
                const response  = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/role/'+uid+'/Students',{
                    method: 'PATCH'
                })
                const json = await response.json()
                if(response.ok) {
                    // window.location.reload()
                    setReload(reload + 1)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <Table striped bordered hover size="sm">
                <caption>Users Overview</caption>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Work Name</th>
                      <th>Work Type</th>
                      <th>Visible</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {displayedData.length > 0 ? (displayedData.map((user, index) => (
                      <tr key={index}>
                        <td >{user.firstName} {user.lastName}</td>
                        <td >{user.email}</td>
                        <td >{user.role}</td>
                        <td >{user.workName}</td>
                        <td >{user.workType}</td>
                        <td>{user.visible.toString()}</td>
                        <td>
                            {/*<Col><Button variant="outline-danger" size="sm" onClick={handleRemove}>Remove</Button></Col>*/}
                            {
                                user.role === "Students" ?
                                <Col><Button variant="outline-primary" size="sm" onClick={()=>handleSetAdmin(user._id)}>Set Admin</Button></Col> :
                                <Col><Button variant="outline-warning" size="sm" onClick={()=>handleCancelAdmin(user._id)}>Cancel Admin</Button></Col>
                            }
                        </td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
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
        </div>
    )
}

export default Users