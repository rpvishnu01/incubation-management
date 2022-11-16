import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from 'react'
import { ErrorMessage, SuccessMessage } from "../component/header/errorMessage";
import './slots.css'
import { useNavigate } from "react-router-dom";



function Slots() {
  const appData = JSON.parse(localStorage.getItem("appId"));
  const [allSlots, setAllSlots] = useState([])
  const [oneSlots, setOneSlots] = useState([])
  const [newSlot, setNewSlot] = useState('')
  const [sloteCode, setSloteCode] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfimration] = useState('')
  const [booked, setBooked] = useState()
  const [bookedData, setBookedData] = useState()
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


  const getAllSlot = async () => {
    let allSlotData = await axios.get(`/api/users/allSlots`,config)
    // console.log("============9");
    // console.log(allSlotData);
    // console.log("============9");

    if (allSlotData.data.status === false) {

    } else {
      setAllSlots(allSlotData.data.allSlots)
    }


  }


  const getoneSlot = async () => {
    let oneSlotData = await axios.get(`/api/users/oneSlots/${appData[1]}`,config)
    console.log("============");
    console.log(oneSlotData);
    console.log("============");
    setOneSlots(oneSlotData.data.status)


  }






  
  // const submitHandler = async (e) => {
  //   console.log('codeeee', sloteCode);
  //   const data = {
  //     sloteCode
  //   }
  //   e.preventDefault()
  //   try {
  //     const resp = await axios.post('/api/users/addSlot', data)
  //     setConfimration('New Slot Added')
  //     setNewSlot(resp)
  //   }
  //   catch {
  //     setError('SlotCode is Required')
  //     console.log('error');
  //   }
  // }


  useEffect(async() => {
    getAllSlot()
    getoneSlot()
  
  }, [bookedData, newSlot])

  // useEffect(async() => {
  //   getAllSlot()
  //   getoneSlot()
  
  // }, [])

  
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-around">
          <Container>


            
            {/* <div className="col-md-4">
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Slot Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter slot code here" name="text" value={sloteCode} onChange={(e) => setSloteCode(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add Slot
                </Button>
              </Form>
              <br></br>
              {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : " "}
              {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
              {booked ? <SuccessMessage variant="success">{booked}</SuccessMessage> : " "}
            </div> */}

                 <div className="col-md-4">
          
              <br></br>
              {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : " "}
              {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
              {booked ? <SuccessMessage variant="success">{booked}</SuccessMessage> : " "}
            </div>





            <Card style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
              <Card.Body>
                {<div className="row">
                  {
                    allSlots.map((obj) => {
                      return (
                        <div className="seat" key={obj._id}>
                          {obj.status === true ? (
                            <div>
                              {/* <h3 style={{ textAlign: "center" }}>{obj.slotId}</h3> */}
                              <div className="bookedIcon">
                                <img style={{height:100,width:100,marginRight:5 ,marginBottom:10}} src="    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX/AAAZ4gk3AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" onClick={() => {
                                  navigate("/viewApplication");
                                  localStorage.setItem(
                                    "appId",
                                    JSON.stringify(appData)
                                  );
                                }} />
                                <span className="bookedIconSpan">SLOT BOOKED</span>
                              </div>
                            </div>) :


                            (<div className="">
                              {/* <h3 style={{ textAlign: "center" }}>{obj.slotId}</h3> */}
                             
                             
                              {oneSlots? <div className="notBookedIcon">

                          <img style={{height:100,width:100 ,marginRight:5 ,marginBottom:10}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Libya_%281977%E2%80%932011%29.svg/300px-Flag_of_Libya_%281977%E2%80%932011%29.svg.png " 
                                 onClick={async () => {
                            
                                    setBooked("Already allocated")
                                
                                }}
                             />
                              
                              </div>
                              :
                              <div className="notBookedIcon">

                              <img style={{height:100,width:100 ,marginRight:5 ,marginBottom:10}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Libya_%281977%E2%80%932011%29.svg/300px-Flag_of_Libya_%281977%E2%80%932011%29.svg.png " 
                              
                              
                              
  
                              onClick={async () => {
                                      const data = await axios.get(`/api/users/slotBooking/${appData[0]}/${appData[1]}/${obj._id}`,config)
                                      console.log(data.data.data.matchedCount, 'datatatata');
                                      if (data.data.data.matchedCount == 1) {
                                        setBooked('Slot Alotted succesfully')
                                        setBookedData(data)
                                      }
                                      console.log('datavane', data.data.data);
                                    }} />




                                    <span className="notBookedIconSpan">CLICK TO ALLOT</span>
                                  </div>
                              }


                            </div>)}

                        </div>

                      )
                    })
                  }
                </div>}
              </Card.Body>
            </Card>
            <br></br>
            {/* {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "} */}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Slots;

















// import React, { useEffect, useState, useContext } from "react";
// // import "./slot.css";
// import { Button, Modal } from "react-bootstrap";
// import axios from "axios";
// // import { tokenContext } from "../../store/tokenContext";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function Slots() {
//   const navigate = useNavigate();
//   let A, B, C, D, E;

//   // let applicantId
//   // var slotId,slotSection
//   // const { token, setToken } = useContext(tokenContext);

//   const [sectionA, setSectionA] = useState([]);
//   const [sectionB, setSectionB] = useState([]);
//   const [sectionC, setSectionC] = useState([]);
//   const [sectionD, setSectionD] = useState([]);
//   const [sectionE, setSectionE] = useState([]);

//   const [slotId, setSlotId] = useState("");
//   const [slotSection, setSlotSection] = useState("");
//   // console.log("sotttt"+slotId, slotSection);
//   const [applicantsList, setApplicantsList] = useState([]);
//   const [applicantId, setApplicantId] = useState("");

//   // modal

//   const [show, setShow] = useState(false);

//   const handleClose = () => {
//     setShow(false);
//   };

//   const removeCompany = async () => {
//     if (applicantId) {
//       console.log(applicantId);
//       const data = { applicantId };
//       const response = await axios.patch(
//         "/slotDuplicate",
//         data
//       );
//       console.log(response.data);
//       if (response.data) {
//         setApplicantId("");
//         handleClose();
//       }
//     } else {
//       console.log("apllnull");
//       handleClose();
//     }
//   };

  
//   useEffect(() => {
//     displaySlots();
//     applicants();
//   }, [removeCompany]);

//   const applicants = async () => {
//     console.log("kkkkkk");
//     const req = await axios.get("/getApplications");
    
//     const response = req.data;
    
//     const records = response.filter((item) => {
//       return !item.bookingStatus;
//     });

//     setApplicantsList(records);
//   };

//   const displaySlots = async () => {
//     const req = await axios.get("/getBookingSlots");
//     // console.log(req.data);
   

//     const response =  req.data
//     // console.log(response);
//     const slots = response;
//     // console.log(slots);

//     A = slots.filter((item) => {
//       return item.section === "A";
//     });
//     setSectionA(A);

//     B = slots.filter((item) => {
//       return item.section === "B";
//     });
//     setSectionB(B);

//     C = slots.filter((item) => {
//       return item.section === "C";
//     });
//     setSectionC(C);

//     D = slots.filter((item) => {
//       return item.section === "D";
//     });
//     setSectionD(D);

//     E = slots.filter((item) => {
//       return item.section === "E";
//     });
//     setSectionE(E);
//   };
//   const handleShow = (slot_id, slot_section) => {
//     setSlotId(slot_id);
//     // slotSection=slot_section
//     setSlotSection(slot_section);
//     // console.log("sotttt"+slotId, slotSection);

//     setShow(true);
//   };

//   const slotBooking = async (id) => {
    
//     let applicantId = id;
//     setApplicantId(applicantId);
//     console.log(applicantId, slotId, slotSection);
//     const data = { applicantId, slotId, slotSection };
//     await axios.post(
//       "/slotUpdate",
//       data
//     );
//     displaySlots()
//   };

//   // console.log(sectionA);

//   return (
//     <>
      
//       <div className="container pt-5 pb-5 me-3">
//         <h2 className="">Book Slots </h2>

//         <Button onClick={()=>{navigate(-1)}}>Back</Button>
//         <div className="row g-5 mt-3">
//           <div className=" row-12">
//             <div className="row g-3">
//               {sectionA &&
//                 sectionA.map((item, index) => {
//                  return (
//                     <div className="col-1">
//                       <div
//                         style={{ height: "80px" }}
//                         key={index}
//                         className={`${
//                           item.selected ? " bg-success" : "bg-danger"
//                         } `}
//                         onClick={() => {
//                           return item.selected
//                             ? " "
//                             : handleShow(item._id, item.section);
//                         }}
//                       ></div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="col-3">
//             <div className="row g-3">
//               {sectionB &&
//                 sectionB.map((item, index) => {
//                   return (
//                     <div className="col-6">
//                       <div
//                         style={{ height: "80px" }}
//                         key={index}
//                         className={`${
//                           item.selected ? " bg-success" : "bg-danger"
//                         } `}
//                         onClick={() => {
//                           return item.selected
//                             ? " "
//                             : handleShow(item._id, item.section);
//                         }}
//                       ></div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="col-3">
//             <div className="row g-3">
//               {sectionC &&
//                 sectionC.map((item, index) => {
//                   return (
//                     <div className="col-6">
//                       <div
//                         style={{ height: "80px" }}
//                         key={index}
//                         className={`${
//                           item.selected ? " bg-success" : "bg-danger"
//                         } `}
//                         onClick={() => {
//                           return item.selected
//                             ? " "
//                             : handleShow(item._id, item.section);
//                         }}
//                       ></div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="col-3">
//             <div className="row g-3">
//               {sectionD &&
//                 sectionD.map((item, index) => {
//                   return (
//                     <div className="col-6">
//                       <div
//                         style={{ height: "80px" }}
//                         key={index}
//                         className={`${
//                           item.selected ? " bg-success" : "bg-danger"
//                         } `}
//                         onClick={() => {
//                           return item.selected
//                             ? " "
//                             : handleShow(item._id, item.section);
                            
//                         }}
//                       ></div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>



//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Select a Company</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <select
//                 class="form-select"
//                 aria-label="Default select example"
//                 onChange={(e) => {
//                   slotBooking(e.target.value);
//                 }}
//               >
//                 <option selected>--select--</option>

//                 {applicantsList &&
//                   applicantsList.map((item, index) => {
//                     return (
//                       <option key={index} value={item._id}>
//                         {" "}
//                         {item.companyName}
//                         <div className="col-1">
//                       <div
//                         style={{ height: "80px" }}
//                         key={index}
//                         className={`${
//                           item.selected ? " bg-success" : "bg-danger"
//                         } `}
//                         onClick={() => {
//                           return item.selected
//                             ? " "
//                             : handleShow(item._id, item.section);
//                         }}
//                       ></div>
//                     </div>
//                       </option>
//                     );
//                   })}
//               </select>
//             </Modal.Body>
//             <Modal.Footer>
              
//               <Button variant="primary" onClick={removeCompany}>
//                 OK
//               </Button>
//             </Modal.Footer>
//           </Modal>
          
//         </div>
//       </div>
//     </>
//   );
// }

// export default Slots;