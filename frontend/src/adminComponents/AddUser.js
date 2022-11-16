import React, { useContext } from 'react'
import { Button, Container, Form } from "react-bootstrap";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {ErrorMessage, SuccessMessage} from '../component/header/errorMessage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
function AddUser() {
  const {admin} = useContext(AuthContext)
  const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirmation, setConfimration] = useState('')
    const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('')












  const submitHandler =async(e)=>{
      e.preventDefault()
      console.log(email);
      if(password!==confirmpassword){
          setMessage('Password do not match')
      }else{
          setMessage(null)
          try{
              const body={
                  email,name,password 
              }
            let response = await axios.post('/api/users',body)
            console.log('restitituin',response);
            if(response.data.status ===false){
              setError('User Already Exists')
            }else{
           
              setConfimration('User created..Login To Continue')
            }
          }catch(error){
              console.log('ererer',error);
              setError('Enter all Fields')
          }
      }
  }
    return (
        
        <div style={{marginTop:'2%'}}>
            <Container>
            <Form onSubmit={submitHandler}>
                <div className="col-md-12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)} />
            
          </Form.Group>
          </div>
          <div className="col-md-12">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        
          </div>
                <div className="col-md-12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control   type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            
          </Form.Group>
          </div>
          <div className="col-md-12">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
        
          </div>
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}

          <div className="col-md-12" style={{textAlign:"center"}}>
          <Form.Group  controlId="formBasicPassword">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form.Group>
          <p> have an account..!</p>
          <h6 className="signup" onClick={()=>{
            navigate('/login')
          }} style={{color:"#127ba3"}}>Log In</h6> 
          </div>
        </Form>
        </Container>
        </div>
    )
}

export default AddUser
