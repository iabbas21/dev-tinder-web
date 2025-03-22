import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true })
      dispatch(addUser(res.data))
    } catch (error) {
      console.error(error)
      if(error.status === 401) navigate('/login')
    }
  }

  useEffect(() => {
    if(!user) fetchUser()
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body