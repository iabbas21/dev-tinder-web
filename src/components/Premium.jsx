import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false)

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/premium/verify', { withCredentials: true })

      if(res.data.isPremium) {
        setIsPremiumUser(true)
      }
    } catch(err) {
        console.log(err)
    }
  }

  const handleBuyPremium = async (type) => {
    try {
      const order = await axios.post(BASE_URL + '/payment/create', { membershipType: type }, { withCredentials: true })

      const { keyId, amount, currency, orderId, notes } = order.data
      // Open Razorpay Checkout Dialog
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Developer Book',
        description: 'Connect to other developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch(err) {
        console.log(err)
    }
  }

  useEffect(() => {
    verifyPremiumUser()
  }, [])

  return (
    isPremiumUser ? (
      <h1>You are already a premium user</h1>
    ) : (
        <div className='m-10'>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                <h1 className='font-bold text-2xl'>Silver Membership</h1>
                <ul>
                    <li>- Chat with others</li>
                    <li>- 10 requests per day</li>
                    <li>- blue tick</li>
                    <li>- 3 months</li>
                </ul>
                <button onClick={() => handleBuyPremium('silver')} className='btn btn-primary'>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-2xl'>Gold Membership</h1>
                    <ul>
                        <li>- Chat with others</li>
                        <li>- 100 requests per day</li>
                        <li>- blue tick</li>
                        <li>- 6 months</li>
                    </ul>
                    <button onClick={() => handleBuyPremium('gold')} className='btn btn-secondary'>Buy Gold</button>
                </div>
            </div>
        </div>
    )
  )
}

export default Premium