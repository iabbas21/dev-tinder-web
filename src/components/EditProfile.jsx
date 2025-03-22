import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
        const res = await axios.patch(BASE_URL + '/profile/edit', {
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about
        }, {
            withCredentials: true
        })
        dispatch(addUser(res.data))
        setIsProfileSaved(true)
        setTimeout(() => setIsProfileSaved(false), 3000)
    } catch (error) {
        setError(error.response.data)
    }
  }

  return (
    <>
    <div className='flex justify-center gap-5'>
        <div className="card bg-base-200 w-96 shadow-sm">   
            <div className="card-body">
                <h2 className="card-title text-center">Edit</h2>
                <div>
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
                    <div className='my-3'>
                      <input 
                        type="text" 
                        placeholder="Age" 
                        className="input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className='flex gap-3 my-3'>
                      <div>
                        <label htmlFor='male'>Male</label>
                        <input 
                            type="radio"
                            id='male'
                            name="male" 
                            className="radio mx-2"
                            checked={gender === "male"}
                            onChange={e => setGender(e.target.name)}
                        />
                      </div>
                      <div>
                        <label htmlFor='female'>Female</label>
                        <input 
                            type="radio"
                            id='female'
                            name="female" 
                            className="radio mx-2"
                            checked={gender === "female"}
                            onChange={e => setGender(e.target.name)}
                        />
                      </div>
                      <div>
                        <label htmlFor='other'>Other</label>
                        <input 
                            type="radio"
                            id='other'
                            name="other" 
                            className="radio mx-2"
                            checked={gender === "other"}
                            onChange={e => setGender(e.target.name)}
                        />
                      </div>
                    </div>
                    <div className='my-3'>
                      <input 
                        type="text" 
                        placeholder="photo URL" 
                        className="input"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                      />
                    </div>
                    <div className='my-3'>
                      <textarea 
                        className="textarea" 
                        placeholder="Bio"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                    {error && <p className='text-center text-red-500'>{error}</p>}
                    <div className='text-center my-3'>
                        <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }}/>
    </div>
    { isProfileSaved && (
        <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved successfully</span>
            </div>
        </div>
    ) }
    </>
  )
}

export default EditProfile