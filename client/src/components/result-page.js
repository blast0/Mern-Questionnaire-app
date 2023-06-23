import React from 'react'
import { useLocation } from 'react-router-dom';
import "./result-page.css"

const Result = () => {
  const location = useLocation();
  const userDetails = location.state;
  console.log(userDetails)
  return (
    <div className='Result-page'>
      <h1>Congratulations Your Profile has been {userDetails.mode}</h1>
      <h2>
        <a href="/">Home</a>
      </h2>
    </div>
  )
}

export default Result