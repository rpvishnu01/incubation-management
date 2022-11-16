import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
// import {useNavigate,useParams} from 'react-router-dom'

function EditUser() {
  const [email, setEmail] = useState()
  const [name, setName] = useState();
  const [user, setUser] = useState({});
  const id = JSON.parse(localStorage.getItem("userId"));
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
    let userData = await axios.get(`/api/users/getuser/${id[0]}`,config);
    console.log(userData);
    setUser(userData.data);

 
  }, []);




  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(email);
    //     setMessage(null)
    try {
      const body = {
        name,
        email,
        _id: user._id
      }
      console.log(user.name);
      let response = await axios.put('/api/users/edituser', body,config)
        if(response.status){
          alert('updated')
        }

    } catch (error) {
      console.log('ererer', error);
      // setError('Enter all Fields')
    }

  }


  return (

    <Form onSubmit={submitHandler}>

      <Form.Group className="mb-3  col-6" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter name" Value={user.name} onChange={(e) => setName(e.target.value)}  />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3  col-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" Value={user.email} onChange={(e) => setEmail(e.target.value)}  />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>



      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

  );
}

export default EditUser;