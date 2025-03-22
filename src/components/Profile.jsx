import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.user)

  return (
    <div className='mt-10 mb-20'>
      {user && <EditProfile user={user} />}
    </div>
  )
}

export default Profile