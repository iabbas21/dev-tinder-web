import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + '/login', {
        emailId,
        password
      }, {
        withCredentials: true
      })
      console.log(res);
      dispatch(addUser(res.data));
      navigate('/');
    } catch(error) {
        console.log(error);
        setError(error.response.data);
    }
  }

  return (
    <div className='flex items-center justify-center my-20'>
        <div className="card bg-base-200 w-96 shadow-sm">   
            <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <div>
                    <div className='my-3'>
                      <input 
                        type="text" 
                        placeholder="Email Id" 
                        className="input"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                      />
                    </div>
                    <div className='my-3'>
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className='text-center text-red-500'>{error}</p>}
                    <div className='text-center my-3'>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login