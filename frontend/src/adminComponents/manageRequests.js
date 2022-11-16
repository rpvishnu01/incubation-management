import React from "react";
import { Container, Tab, Table, Tabs } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageRequest() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const navigate = useNavigate();


  const info = JSON.parse(localStorage.getItem("userInfo"));


  const token = info.token
  console.log(token);
  console.log("===================token");
 
  const config = {
    headers:{
        Authorization: `Bearer ${token}`,
    },
}

  useEffect(async () => {
    let approvedData = await axios.get("/api/users/approved",config);
    let pendingData = await axios.get("/api/users/processing",config);
    let rejectedeData= await axios.get("/api/users/rejected",config);

    console.log("kkkkkkkkkkkkkk");
    console.log(rejectedeData);
    console.log("kkkkkkkkkkkkkk");

    console.log("appdata", pendingData.data.processing);
    if(pendingData.data.status===false){
      console.log('false');
    }else{
      console.log('11111');
      setPending(pendingData.data.processing);
    }
    if(approvedData.data.status===false){
      console.log('false');
    }else{
      setApproved(approvedData.data.approved);
    }
    if(rejectedeData.data.status===false){
      console.log('false');
    }else{
      setRejected(rejectedeData.data.rejected);
    }
    
  }, []);
  console.log(pending);
  return (
    <div style={{marginTop:"2%"}}>
      <Container>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="home" title="Processing">
        <div className="col-md-12">
             {pending.length > 0 ? (
              <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Application ID</th>
                  <th>Company Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                 {pending.map((obj,index) => {
                  return (
                    <tr key={obj._id}>
                      <td>{index+1}</td>
                      <td>{obj._id}</td>
                      <td>{obj.companyName}</td>
                      <td style={{ color: "orange" }}>{obj.status}</td>
                      <td>
                        <p
                          className="view"
                          style={{ color: "turquoise", textAlign: "center" }}
                          onClick={() => {
                            navigate("/viewApplication");
                            localStorage.setItem(
                              "appId",
                              JSON.stringify([obj._id,obj.userId])
                            );
                          }}
                        >
                          View Application
                        </p>
                      </td>
                    </tr>
                  );
                })} 
              </tbody>
            </Table> 
            ):(<div style={{textAlign:"center"}}>
            <h3 style={{color:'red'}}>No Application Under Processing</h3></div>)}
            
          </div>
        </Tab>
        <Tab eventKey="profile" title="Approved">

        <div className="col-md-12">
            {
              approved.length > 0 ?(
                <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Application ID</th>
                  <th>Company Name</th>
                  <th>Slot Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{ 
                  approved.map((obj,index) => {
                    return (
                      <tr key={obj._id}>
                        <td>{index+1}</td>
                        <td>{obj._id}</td>
                        <td>{obj.companyName}</td>
                        <td >
                        {obj.bookingStat ? (
                          <p style={{ color: "green" }}>APPROVED</p>
                        ):(<p style={{ color: "orange" }}>PENDING</p>)
                        }
                          </td>
                        <td>
                          {obj.bookingStat ? (
                            <p className="view"
                            style={{ color: "turquoise", textAlign: "center"}} onClick={() => {
                              navigate("/viewApplication");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id])
                              );
                            }}>View Application</p>
                            
                          ): (
                          <div>
                            <p
                            className="view"
                            style={{ color: "turquoise", textAlign: "center" }}
                            onClick={() => {
                              navigate("/slots");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id,obj.userId])
                              );
                            }}
                          >
                            Allot Slot
                          </p>
                          </div>)}
                        </td>
                      </tr>
                    );
                  })
                }   
              </tbody>
            </Table>
              ) : (<div style={{textAlign:"center"}}>
                
                <h3 style={{color:"red"}}>No Approved Applications</h3>
                </div>)
            } 
          </div>
        </Tab>












        <Tab eventKey="rejectedprofile" title="Rejected">

        <div className="col-md-12">
            {
              rejected.length > 0 ?(
                <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Application ID</th>
                  <th>Company Name</th>
                  <th>Slot Status</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>{ 
                  rejected.map((obj,index) => {
                    return (
                      <tr key={obj._id}>
                        <td>{index+1}</td>
                        <td>{obj._id}</td>
                        <td>{obj.companyName}</td>
                        <td >{obj.status}</td>
                        {/* <td>
                          {obj.bookingStat ? (
                            <p className="view"
                            style={{ color: "turquoise", textAlign: "center"}} onClick={() => {
                              navigate("/viewApplication");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id])
                              );
                            }}>View Application</p>
                            
                          ): (
                          <div>
                            <p
                            className="view"
                            style={{ color: "turquoise", textAlign: "center" }}
                            onClick={() => {
                              navigate("/slots");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id,obj.userId])
                              );
                            }}
                          >
                            Allot Slot
                          </p>
                          </div>)}
                        </td> */}
                      </tr>
                    );
                  })
                }   
              </tbody>
            </Table>
              ) : (<div style={{textAlign:"center"}}>
                
                <h3 style={{color:"red"}}>No Approved Applications</h3>
                </div>)
            } 
          </div>
        </Tab> 


    




      </Tabs>
      </Container>
    </div>
  );
}

export default ManageRequest;
