import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useSelector, useDispatch } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector(state => state.connection)
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
      dispatch(addConnection(res.data))
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  return (
    <div className='flex justify-center my-10'>
      {
        connections && connections.length > 0 ? (
          <div>
            <h1 className='text-bold text-3xl text-center'>Connections</h1>
            {connections.map((connection, index) => (
                <div key={index} className='flex items-center gap-3 bg-base-300 p-3 rounded-lg w-200 m-3'>
                  <div>
                    <img className='w-15 h-15 rounded-full' alt='photo' src={connection.photoUrl}/>
                  </div>
                  <div>
                    <h2 className='text-bold text-xl'>{connection.firstName + " " + connection.lastName}</h2>
                    {connection.age && connection.gender && <p>{connection.age + ", " + connection.gender}</p>}
                    <p>{connection.about}</p>
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <h1 className='text-2xl'>No Connections</h1>
        )
      }
    </div>
  )
}

export default Connections