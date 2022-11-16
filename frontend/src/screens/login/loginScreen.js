import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import './loginScreen.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ErrorMessage } from "../../component/header/errorMessage";



function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        email, password
      }
      const { data } = await axios.post('/api/users/login', config)
      console.log("====================login data");
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data))
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      console.log('userinfo', userInfo);
      if (userInfo.admin) {
        navigate('/adminHome')
      } else {
        navigate('/')
      }
    }
    catch (error) {
      setError('Invaid Username or Password')
      console.log('loasdasgin', Error.message);
    }
  }
  return (
    <div className="col-md-12 ">
      <div className="loginContainer" >
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : " "}

            <div className="col-md-12" style={{ textAlign: "center" }}>
              <Form.Group controlId="formBasicPassword">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
              <p>Dont have a account..?</p>
              <h6 className="signup" onClick={() => {
                navigate('/register')
              }} style={{ color: "#127ba3" }}>Sign Up</h6>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default LoginScreen;
