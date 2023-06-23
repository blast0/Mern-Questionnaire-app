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
  const [isNewUSer, setIsNewUser] = useState(false)


  useEffect(() => {
    //Find userDetails by username 
    axios({
      method: 'get',
      url: `http://localhost:3002/users/${userName}`,
    }).then((res) => {
      //Set the User Details in the controlled inputs state 
      setName(res.data.name)
      setEmail(res.data.email)
      setPhone(res.data.phone)
      setDob(res.data.dob)
      setIsNewUser(false)
    })
      .catch((error) => {
        //If not found assume new user
        setIsNewUser(true)
        console.error(error);
      });
  }, [userName])


  const submitUserName = () => {
    if (isNewUSer) {
      //Create the user with the details entered in the input boxes
      axios.post("http://localhost:3002/users", {
        username: userName,
        name: name,
        email: email,
        phone: phone,
        dob: dob
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      //Replace the user with the new details entered in the input boxes
      axios.patch("http://localhost:3002/users/" + userName, {
        username: userName,
        name: name,
        email: email,
        phone: phone,
        dob: dob
      }).then((response) => {
        console.log(response);

      })
        .catch((error) => {
          console.log(error);
        });
    }
    //Move to Result Page
    navigate(
      "/result",
      {
        state: {
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
