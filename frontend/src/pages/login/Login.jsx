import React from 'react'
import './Login.css'
import Form from './Form'

const Login = () => {
  return (
    <div className='container Login'>
      <div className='row h-100'>
        <div className='col-md-5'>
          <Form/>
        </div>

        <div className='col-md-7 h-100 image'>
            <img className='w-100 h-100 rounded' src="/signupImage.jpg" alt="signup-theme" />
        </div>
      </div>
    </div>
  )
}

export default Login