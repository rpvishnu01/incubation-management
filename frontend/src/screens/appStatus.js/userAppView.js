import React from "react";
import { Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function UserAppView() {
  const [app, setApp] = useState({});
  const id = JSON.parse(localStorage.getItem("appId"));
  console.log('alkhdf',id);
  useEffect(async () => {
    let appDetails = await axios.get(`/api/users/viewApplication/${id[0]}`);
    setApp(appDetails.data);
  }, []);
  return (
    <div style={{ marginTop: "2%" }}>
      <Container>
        <Card style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
          <Card.Body>
            <div className="row">
              <div className="col-md-3">
                <Card.Title>Company Name:</Card.Title>
                <Card.Text>{app.companyName}</Card.Text>
              </div>
              <div className="col-md-3">
                <Card.Title>Address:</Card.Title>
                <Card.Text>{app.address}</Card.Text>
              </div>
              <div className="col-md-3">
                <Card.Title>City:</Card.Title>
                <Card.Text>{app.city}</Card.Text>
              </div>
              <div className="col-md-3">
                <Card.Title>State:</Card.Title>
                <Card.Text>{app.state}</Card.Text>
              </div>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
              {/* <h2> Description</h2> */}
            </div>
            <div className="row">
              <div className="col-md-6">
                <Card.Title>Team and Backgorund:</Card.Title>
                <Card.Text>{app.teamAndBackground}</Card.Text>
              </div>
              <div className="col-md-6">
                <Card.Title>Company and products:</Card.Title>
                <Card.Text>{app.companyAndProducts}</Card.Text>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-md-6">
                <Card.Title>Solution and uniqueness:</Card.Title>
                <Card.Text>{app.solutions}</Card.Text>
              </div>
              <div className="col-md-6">
                <Card.Title>Value Propostions:</Card.Title>
                <Card.Text>{app.prepositions}</Card.Text>
              </div>
            </div>
            <br></br>
            <div className="row">
            
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserAppView;
