import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ErrorMessage, SuccessMessage } from "../../component/header/errorMessage";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



function UserHome() {
  const [companyName, setCompanyName] = useState('');
  const [appStatus, setStatus] = useState()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [teamAndBackground, setTeamAndBackground] = useState('')
  const [companyAndProducts, setCompanyAndProducts] = useState('')
  const [solutions, setSolutions] = useState('')
  const [prepositions, setPrepositions] = useState('')
  const [incubType, setType] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfimration] = useState('')
  const info = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();



  useEffect(async () => {
    console.log('info', info);
    if (info === null) {
      navigate('/')
    }

    const appExist = await axios.get(`/api/users/getapplication/${info._id}`);
    setStatus(appExist.data.status)
    console.log("kkkkkkklllllllllll33");
    console.log(appExist.data.status);
    console.log("kkkkkkklllllllllll33");




  }, [])






  const submitHandler = async (e) => {
    e.preventDefault()
    const userId = info._id

    try {
      const data = { companyName, address, city, state, teamAndBackground, companyAndProducts, solutions, prepositions, incubType, userId }
      await axios.post('/api/users/userApplication', data)
      setError(false)
      setCompanyName('')
      setAddress('')
      setCity('')
      setState('')
      setTeamAndBackground('')
      setCompanyAndProducts('')
      setSolutions('')
      setPrepositions('')
      setType('')
      setConfimration('Application submited')
    } catch (error) {
      console.log('erorrer', error);
      setError('Please fill all the fields')
    }
  }
  if (appStatus) {
    return (
      <div style={{ marginTop: "3%", marginBottom: '3%' }}>

        <Container>
          <h1>New Application</h1>
          <br />

          <Form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </Form.Group>









              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter company address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter the city" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="Enter the state" value={state} onChange={(e) => setState(e.target.value)} />
                </Form.Group>
              </div>
            </div>
            <div className="col-md-12">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description Your Team and Background</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your description here" value={teamAndBackground} onChange={(e) => setTeamAndBackground(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col=md-12">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description Your Company and Products</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your description here" value={companyAndProducts} onChange={(e) => setCompanyAndProducts(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col=md-12">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>What is unique about your solutions</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your description here" value={solutions} onChange={(e) => setSolutions(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col=md-12">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  What is your value proposition for the customer
                </Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your description here" value={prepositions} onChange={(e) => setPrepositions(e.target.value)} />
              </Form.Group>
            </div>
            <Form.Label>
              Type of Incubation Needed
            </Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">

                <Form.Check
                  inline
                  label="Physical Incubation"
                  name="select"
                  type={type}
                  value={'Physical'} onClick={(e) => setType(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Virtual Incubation"
                  name="select"
                  type={type}
                  value={'Virtual'} onClick={(e) => setType(e.target.value)}

                />

              </div>
            ))}
            {error ? <ErrorMessage variant="primary">{error}</ErrorMessage> : " "}
            {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>

      </div>
    )
  } else {
    return (
      <div style={{ marginTop: "10%",marginLeft:"30%", marginBottom: '3%' }}>
        <Container>

          <h1>You already submitted the form</h1>
        </Container>
      </div>
    )
  }




}

export default UserHome;
