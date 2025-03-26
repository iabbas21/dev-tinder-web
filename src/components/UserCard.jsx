import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, photoUrl, age, gender } = user;
  const dispatch = useDispatch();

  const sendRequests = async (userId, status) => {
    try {
      await axios.post(BASE_URL + `/send/request/${status}/${userId}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(userId))
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
            <img
              className='h-50'
              src={photoUrl}
              alt="dev" 
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender }</p>}
            <p>{about}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => sendRequests(_id, 'ignored')}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => sendRequests(_id, 'interested')}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard