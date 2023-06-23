
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const submitUserName = () => {
    navigate(
      "/form",
      {
        state: {
          username: userName
        }
      }
    )
  }



  return (
    <div className='Home-page'>
      <form onSubmit={submitUserName}>
        <label>User Name</label>
        <input type="text" required value={userName} placeholder='Enter your Username' onChange={(e) => {
          setUserName(e.target.value);
        }} />
        <input className='submit-btn' type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Home;