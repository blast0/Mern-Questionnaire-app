import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./form-page.css"

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName] = useState(location?.state?.username)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [users, setUsers] = useState([])
  const [isNewUSer, setIsNewUser]=useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:3002/users/${userName}`,
    }).then((res) => {
      console.log(res)
      setUsers(res.data)
      setDob(res.data.dob)
      setEmail(res.data.email)
      setPhone(res.data.phone)
      setName(res.data.name)
      setIsNewUser(false)
    })
    .catch((error) => {
      setIsNewUser(true)
      console.error(error);
    });
  }, [userName])


  const submitUserName = () => {
    if (isNewUSer) {
      axios.post("http://localhost:3002/users", {
        username: userName,
        name: name,
        email: email,
        phone: phone,
        dob: dob
      }).then( (response)=> {
        console.log(response);
      })
      .catch( (error)=> {
        console.log(error);
      });
    }
    else {
      axios.patch("http://localhost:3002/users/" + userName, {
        username: userName,
        name: name,
        email: email,
        phone: phone,
        dob: dob
      }).then( (response)=> {
        console.log(response);
       
      })
      .catch( (error)=> {
        console.log(error);
      });
    }
    navigate(
      "/result",
      {
        state: {
          username: userName,
          name: name,
          email: email,
          phone: phone,
          dob: dob,
          mode: isNewUSer ? "created" : "updated" 
        }
      }
    )
    

  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleDobChange = (e) => {
    setDob(e.target.value)
  }
console.log(users, isNewUSer)
  return (
    <div className='Form-page'>
      <form onSubmit={(e) => {
        submitUserName()
      }}>
        <label>Enter Your Details</label>
        <input type="text" required placeholder='name' value={name} onChange={(e) => handleNameChange(e)} />
        <input type="email" required placeholder='email' value={email} onChange={(e) => handleEmailChange(e)} />
        <input type="number" required placeholder='phone' value={phone} onChange={(e) => handlePhoneChange(e)} />
        <input className='date-input' type="date" required placeholder='date of birth' value={dob} onChange={(e) => handleDobChange(e)} />
        <input className='submit-btn' type="submit" value="Submit" />
        <div className='cancel-btn' onClick={() => {
          navigate(
            "/")
        }}>Cancel</div>
      </form>
    </div>
  )
}

export default FormPage
