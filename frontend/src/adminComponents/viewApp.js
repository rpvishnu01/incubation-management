import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container} from "react-bootstrap";
import { SuccessMessage } from "../component/header/errorMessage";


function ViewApp() {
  const [app, setApp] = useState({});
  const [confirmation, setConfimration] = useState('')
  const id = JSON.parse(localStorage.getItem("appId"));
  console.log('id',id);
  useEffect(async () => {
    let appDetails = await axios.get(`/api/users/viewApplication/${id[0]}`);
    setApp(appDetails.data);
  }, []);
  return (
    <div style={{marginTop:'3%'}}>
      <div className="d-flex justify-content-around">
        <Container>
          <Card style={{ width: "100%" ,backgroundColor:'#f7f7f7'}}>
            <Card.Body>
              <div className="row">
                <div className="col-md-3">
                  <Card.Title>Company Name:</Card.Title>
                  <Card.Text>
                    {app.companyName}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>Address:</Card.Title>
                  <Card.Text>
                  {app.address}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>City:</Card.Title>
                  <Card.Text>
                  {app.city}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>State:</Card.Title>
                  <Card.Text>
                  {app.state}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div style={{textAlign:"center"}}>
              {/* <h2> Description</h2> */}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Card.Title>Team and Backgorund:</Card.Title>
                  <Card.Text>
                    {app.teamAndBackground}
                  </Card.Text>
                </div>
                <div className="col-md-6">
                  <Card.Title>Company and products:</Card.Title>
                  <Card.Text>
                  {app.companyAndProducts}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <Card.Title>Solution and uniqueness:</Card.Title>
                  <Card.Text>
                  {app.solutions}
                  </Card.Text>
                </div>
                <div className="col-md-6">
                  <Card.Title>Value Propostions:</Card.Title>
                  <Card.Text>
                  {app.prepositions}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div className="row">
              <div className="col-md-6" style={{}}>
                <Card.Title>Incubation Type:</Card.Title>
                <Card.Text>{app.incubType}</Card.Text>
              </div>
              {app.slotCode!=="null" ? (
                <div className="col-md-6" style={{}}>
                  <Card.Title>Slot Code:</Card.Title>
                  <Card.Text>{app.slotCode}</Card.Text>
                </div>
              ) : (
                " "
              )}
              </div>
              <br></br>
              {app.bookingStat ? (<div>
                <Button variant="primary" onClick={async()=>{
                const response = await axios.get(`/api/users/cancelSlot/${id[0]}`)
                console.log('resposne.fafaewra',response.data); 
                setConfimration('Slot Cancelled')
              }
              }>Cancel Slot</Button>
              
              </div>) :(
                <div>
                <Button variant="primary" onClick={async()=>{
                const response = await axios.patch(`/api/users/updateNewAppStatus/${id[0]}`)
                const stat = response.data
                setConfimration('Status updated')
              }
              //////////////////////////////////////////////////
              }>Processing</Button>
            
              <Button variant="primary" style={{marginLeft:'1%',width:'100px'}} onClick={async()=>{
                const response = await axios.patch(`/api/users/approveNewAppStatus/${id[0]}`)
                setConfimration('Status updated')
                //////////////////////////////////
              }}>Approve</Button>
              <Button style={{marginLeft:'1%',width:'100px'}} onClick={async()=>{
                const response = await axios.patch(`/api/users/rejectNewAppStatus/${id[0]}`)
                setConfimration('Status updated')
                ////////////////////////////////
              }}>Reject</Button>
                </div>  
              )}
            </Card.Body>
          </Card>
          <br></br>
          {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
        </Container>
      </div>
    </div>
  );
}

export default ViewApp;
