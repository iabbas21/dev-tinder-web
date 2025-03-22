import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector(state => state.feed)
  const dispatch = useDispatch()

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true
      })
      dispatch(addFeed(res.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(!feed) fetchFeed()
  }, [])

  return (
    <div className='flex justify-center my-4'>
      {feed && feed.length > 0 && (
        <UserCard user={feed[0]} />
      )}
    </div>
  )
}

export default Feed