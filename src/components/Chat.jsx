import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Chat = () => {
  const { targetUserId } = useParams()
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const user = useSelector(state => state.user)
  const userId = user?._id
  const firstName = user?.firstName
  const lastName = user?.lastName

  const sendMessage = () => {
    console.log(setText((prevText) => prevText))
    const socket = createSocketConnection()
    socket.emit('sendMessage', { firstName, lastName, userId, targetUserId, text })
    setText('')
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(BASE_URL + `/chat/${targetUserId}`, { withCredentials: true })

      if(response.status === 200) {
        const chat = response.data
        const chatMessages = chat?.messages.map(message => ({
          name: `${message.senderId.firstName} ${message.senderId.lastName}`,
          text: message.text,
          time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }))
        setMessages(chatMessages || [])
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    if(userId && targetUserId) {
      const socket = createSocketConnection()
      socket.emit('joinChat', { firstName, userId, targetUserId })

      socket.on('messageReceived', ({ firstName, lastName, text }) => {
        console.log(firstName + ' : ' + text);
        setMessages(prevMessages => [...prevMessages, { name: `${firstName} ${lastName}`, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [targetUserId, userId])

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {
          messages.map((message, index) => (
            <div key={index} className={`chat ${message.name === `${firstName} ${lastName}` ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-header">
                    {message.name}
                    <time className="text-xs opacity-50">
                      {message.time}
                    </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))
        }
      </div>
      <div className='p-5 border-t border-gray-600 flex justify-center gap-2'>
        <input 
          className='flex-1 border border-gray-500 rounded p-2' 
          type='text' 
          value={text} 
          onChange={(e) => setText(e.target.value)}  
        />
        <button className='btn btn-success text-white' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat