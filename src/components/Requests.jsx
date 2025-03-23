import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector(state => state.requests)
  const dispatch = useDispatch()

  const reviewRequests = async (requestId, status) => {
    try {
      await axios.post(BASE_URL + `/send/review/${status}/${requestId}`, {}, { withCredentials: true })
      dispatch(removeRequest(requestId))
    } catch(error) {
        console.error(error)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true })
      dispatch(addRequests(res.data))
    } catch(error) {
        console.error(error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className='flex justify-center my-10'>
      {
        requests && requests.length > 0 ? (
          <div>
            <h1 className='text-bold text-3xl text-center'>Requests</h1>
            {requests.map((request, index) => {
              const { firstName, lastName, age, gender, about, photoUrl } = request.fromUserId
              return (
                <div key={index} className='flex justify-between items-center gap-3 bg-base-300 p-3 rounded-lg w-200 m-3'>
                  <div>
                    <img className='w-15 h-15 rounded-full' alt='photo' src={photoUrl}/>
                  </div>
                  <div>
                    <h2 className='text-bold text-xl'>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                  </div>
                  <div>
                    <button className='btn btn-primary btn-sm mx-2' onClick={() => reviewRequests(request._id, 'rejected')}>Reject</button>
                    <button className='btn btn-secondary btn-sm mx-2' onClick={() => reviewRequests(request._id, 'accepted')}>Accept</button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <h1 className='text-2xl'>No Requests</h1>
        )
      }
    </div>
  )
}

export default Requests