import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./form-page.css"

const FormPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state.username;
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:3001/users`,
    }).then((res) => {
      setUsers(res.data)
      console.log(res.data)
    })
  }, [])

  useEffect(() => {
    if (users.length) {
      users.forEach((user) => {
        if (user.username === userName) {
          setUser(user)
        }
      })
    }
  }, [users])

  const submitUserName = () => {
    let founduser = false
    if (users.length) {
      users.forEach((user) => {
        if (user.username === userName)
          founduser = true
      })
    }
    if (founduser) {
      axios.patch("http://localhost:3001/users/" + userName, {
        username: userName,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        dob: user?.dob
      })
    }
    else {
      axios.post("http://localhost:3001/users", {
        username: userName,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        dob: user?.dob
      })
    }
    navigate(
      "/result",
      {
        state: {
          username: userName,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          dob: user?.dob,
          mode: founduser === true ? "updated" : "created"
        }
      }
    )

  }

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value })
  }
  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value })
  }
  const handlePhoneChange = (e) => {
    setUser({ ...user, phone: e.target.value })
  }
  const handleDobChange = (e) => {
    setUser({ ...user, dob: e.target.value })
  }

  return (
    <div className='Form-page'>
      <form onSubmit={(e) => {
        submitUserName()
      }}>
        <label>Enter Your Details</label>
        <input type="text" required placeholder='name' value={user?.name} onChange={(e) => handleNameChange(e)} />
        <input type="email" required placeholder='email' value={user?.email} onChange={(e) => handleEmailChange(e)} />
        <input type="tel" required placeholder='phone' value={user?.phone} onChange={(e) => handlePhoneChange(e)} />
        <input className='date-input' type="date" required placeholder='date of birth' value={user?.dob} onChange={(e) => handleDobChange(e)} />
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
