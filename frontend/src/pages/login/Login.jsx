import React from 'react'
import './Login.css'
import Form from './Form'

const Login = () => {
  return (
    <div className='container Login'>
      <div className='row h-100'>
        <div className='col-lg-5  col-md-6 col-12'>
          <Form/>
        </div>

        <div className='col-lg-7 col-md-6 h-100 image d-none d-md-block'>
            <img className='w-100 h-100 rounded' src="/signupImage.jpg" alt="signup-theme" />
        </div>
      </div>
    </div>
  )
}

export default Login