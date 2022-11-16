import React from "react";
import { Container, Nav, Navbar } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


function Header() {
  
  const storageExist = JSON.parse(localStorage.getItem("userInfo"));
  
  const navigate = useNavigate()

  if(storageExist){
    if(storageExist.admin){
      return(
        <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark">
            <Container fluid>
              <Navbar.Brand style={{cursor:"pointer",fontSize:"25px"}} onClick={()=>{navigate('/adminHome')}}></Navbar.Brand>
              <Nav.Link style={{color:"white"}} onClick={()=>{navigate('/adminHome')}}>Home</Nav.Link>
              <Nav.Link style={{color:"white"}} onClick={()=>{navigate('/manageRequest')}}>Manage Request</Nav.Link>
              <Nav.Link style={{color:"white"}} onClick={()=>{navigate('/usermanagement')}}>Users</Nav.Link>
              {/* <Nav.Link style={{color:"white"}} onClick={()=>{navigate('/slots')}}>Slots</Nav.Link> */}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                
                </Nav>
                <Nav >
                 
                  <Nav.Link style={{color:"white"}} onClick={()=>{localStorage.removeItem('userInfo')
                navigate('/')}}>Logout</Nav.Link>
                 
                </Nav>
                
              </Navbar.Collapse>
            </Container>
          </Navbar> 
      )
    }else{
      return (
        <div>
          
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand style={{cursor:"pointer",fontSize:"25px"}} onClick={()=>{navigate('/')}}>INCUBATOR</Navbar.Brand>
              <Nav.Link style={{color:"white"}} onClick={()=>{navigate('/status')}}>Status</Nav.Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                </Nav>
                <Nav >
                <Nav.Link style={{color:"white"}}>{storageExist.name}</Nav.Link>

                <Nav.Link style={{color:"white"}}  onClick={()=>{navigate('/home')}}>Application</Nav.Link>
                 
                  <Nav.Link style={{color:"white"}} onClick={()=>{localStorage.removeItem('userInfo')
                navigate('/')}}>Logout</Nav.Link>
                 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      );
    }
  }else{
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark"   variant="dark">
          <Container fluid>
            <Navbar.Brand onClick={()=>{navigate('/')}} style={{cursor:"pointer",fontSize:"25px"}}>INCUBATOR</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
