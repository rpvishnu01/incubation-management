import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import {useNavigate, NavLink} from 'react-router-dom'
import axios from 'axios'

// import { SuccessMessage } from "../component/header/errorMessage";

function UserManagement() {
  const info = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate()

  const [getuser,setUser]=useState([])
  const [confirmation, setConfimration] = useState('')

  console.log(getuser);



  const fetchData =async()=>{
    const res=await axios.get(`/api/users/getalluser`)
    console.log(res)
    setUser(res.data)
  }


  useEffect(()=>{
    fetchData()
  },[])



  // function editUser(){
  //   navigate('/editUser')
  // }
  function addUser(){
    navigate('/adduser')
  }
  if(info.admin){
    return (
         
    <div className='mt-5'>
      <div className='container'>
        <div className='add_btn mt-2'>
          <button className='btn btn-primary mb-5' onClick={()=>{addUser()}} >add user</button>
        </div>
      </div>
      
      <Table striped bordered hover>
          <thead>

          {/* {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "} */}
            <tr >
             
              <th>Name</th>
              <th>email</th>
              <th>id</th>
           
              <th>action</th>
            </tr>
          </thead>
          <tbody>
          {getuser.map((obj,index) => {
            return(
            <tr>
              <td>{obj.name}</td>
              <td>{obj.email}</td>
              <td>{obj._id}</td>
            
              <td >
                <button className='btn btn-success mr-2'
                  onClick={() => {
                    navigate("/editUser");
                    localStorage.setItem(
                      "userId",
                      JSON.stringify([obj._id])
                    );
                  }} >Update</button>
                {/* <NavLink to={`/editUser/${obj._id}`}><button className='btn btn-success mr-2'>Update</button></NavLink> */}




                <button className='btn btn-danger'   onClick={async()=>{
                const response = await axios.delete(`/api/users/deleteuser/${obj._id}`)
                if(response.status){
                  // setConfimration('User Deleted')
                  alert("deleted")
                  fetchData()
                }else{
                  alert("something went Wrong")
                }
         
              }} >delete</button>
              </td>
            </tr>
               );
              })}
          
          
          </tbody>
        </Table>

    </div>

      );
    }else{
      navigate('/')
    }
}

export default UserManagement
