import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';


const Form = () => {
  const [userOtp, setUserOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [error, setError] = useState("");
   const url = import.meta.env.VITE_BACKEND_URL;

  const [userInfo, setUserInfo] = useState({
    name: '',
    dob: '',
    email: ''
  });

  const handlingChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handlingSubmit = async(event) => {
    event.preventDefault();
    try{
      console.log(userOtp, serverOtp);

      if(userOtp != serverOtp){
        console.error("Invalid OTP");
        return;
      }

      const response = await axios.post(url + "/signup", userInfo);
      const data = response.data;
      

      if(data.success){
        console.log("User signed up successfully");
        setUserInfo({
          name: '',
          dob: '',
          email: ''
        });
      }else{
        console.log("User signup failed");
      }

    }catch(error){
      setError(error.response.data.message);
      console.error("Error during form submission:", error);
    }

  }

 

  // otp

  const handlingOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

  const handlingOtp = async() => {

    try{
      const response = await axios.post(`${url}/otp` , 
        { email: userInfo.email }
      );

      console.log(response)
      const data = response.data;

      if (data.success) {
        setOtpField(true);
        setServerOtp(data.otp);
        console.log("OTP sent successfully");
      }

    } catch (error) {
      console.log("Error sending OTP:", error);
    }
  }


  return (
    <div className=' my-5 mx-5'>
      <form className='' onSubmit={handlingSubmit}>
        <h3>Sign up</h3>
        <p className='text-muted'>Sign up to enjoy the feature of HD</p>

        <TextField name='name' value={userInfo.name} onChange={handlingChange} className='w-100' id="name" label="Your Name" variant="outlined" /> <br /> <br />
        <TextField name='dob' value={userInfo.dob} onChange={handlingChange} className='w-100' id="dob" type="Date" variant="outlined" /> <br /> <br />
        <TextField name='email' value={userInfo.email} onChange={handlingChange} className='w-100' id="email" label="Your Email" variant="outlined" /> <br /> <br />
        {
          otpField === true ?
            <>
              <TextField className='w-100' id="otp" type='password' label="OTP" variant="outlined" value={userOtp} onChange={handlingOtpChange} /> <br /> <br />
              {error && <p className='text-danger'>{error}</p>}
              <Button variant="contained" className='w-100' size="large"  type='submit' >Sign Up</Button>
            </>
            :
            <Button onClick={handlingOtp} variant="contained" className='w-100' size="large" >Get OTP</Button>
        }
        <p className='text-center my-2'>Already have account?? <span className='text-primary'>Sign In</span></p>
      </form>
    </div>
  )
}

export default Form