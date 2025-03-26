import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + '/signup', {
        firstName,
        lastName,
        emailId,
        password
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data));
      navigate('/profile');
    } catch(error) {
      console.error(error)
    }
  }

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
                <h2 className="card-title text-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                <div>
                    {
                      !isLoginForm && (
                        <>
                          <div className='my-3'>
                            <input 
                              type="text" 
                              placeholder="First Name" 
                              className="input"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className='my-3'>
                            <input 
                              type="text" 
                              placeholder="Last Name" 
                              className="input"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </>
                      )
                    }
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
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>Login</button>
                    </div>
                </div>
                <p role='button' className='text-center cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>
                  {isLoginForm ? 'New User? Sign Up Here' : 'Existing User? Login Here'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login