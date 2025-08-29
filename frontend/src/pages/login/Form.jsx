import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../../context/ContextApi';


const Form = () => {
  const [userOtp, setUserOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [register, setRegister] = useState(true);
  const context = useContext(AppContext);

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

  const handlingSubmit = async (event) => {
    event.preventDefault();
    try {

      if (userOtp != serverOtp) {
        setError("Invalid OTP");
        return;
      }

      if (!register) {
        const response = await axios.post(url + "/signup", userInfo);
        const data = response.data;
        console.log(data);
        if (data.success) {
          context.setToken(data.token);
          setUserInfo({
            name: '',
            dob: '',
            email: ''
          });
          setUserOtp("");
          setServerOtp("");
          setOtpField(false);
        } else {
          setError("User signup failed");
          console.log("User signup failed");
        }
      } else {
        const response = await axios.post(url + "/login", { email: userInfo.email });
        const data = response.data;
        console.log(data);
        if (data.success) {
          context.setToken(data.token);
          setUserInfo({
            name: '',
            dob: '',
            email: ''
          });
          setUserOtp("");
          setServerOtp("");
          setOtpField(false);
        } else {
          setError("User login failed");

          console.log();
        }
      }

    } catch (error) {
      setError(error.response.data.message);
      console.error("Error during form submission:", error);
    }

  }

  const handlingRegister = () => {
    setRegister(!register);
  }

  // otp

  const handlingOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

  const handlingOtp = async () => {

    try {
      const response = await axios.post(`${url}/otp`,
        { email: userInfo.email }
      );

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
    <div className=' my-5 py-5 px-5  px-md-3'>
      <form className='' onSubmit={handlingSubmit}>
        <h3>{register ? "Sign In" : "Sign Up"} </h3>
        <p className='text-muted'>Sign up to enjoy the feature of HD</p>

        {
          register === false && <>
            <TextField name='name' value={userInfo.name} onChange={handlingChange} className='w-100' id="name" label="Your Name" variant="outlined" /> <br /> <br />
            <TextField name='dob' value={userInfo.dob} onChange={handlingChange} className='w-100' id="dob" label="DOB" type="Date" InputLabelProps={{ shrink: true }} variant="outlined" /> <br /> <br />
          </>
        }
        <TextField name='email' value={userInfo.email} onChange={handlingChange} className='w-100' id="email" label="Your Email" variant="outlined" /> <br /> <br />
        {
          otpField === true ?
            <>
              <TextField className='w-100' id="otp" type='password' label="OTP" variant="outlined" value={userOtp} onChange={handlingOtpChange} /> <br /> <br />
              <p className='text-primary pointer' onClick={handlingOtp}><u>Resend OTP</u></p>

              {error && <p className='text-danger'>{error}</p>}
              <Button variant="contained" className='w-100' size="large" type='submit' > {register ? "Sign In" : "Sign Up"}</Button>
            </>
            :
            <Button onClick={handlingOtp} variant="contained" className='w-100' size="large" >Get OTP</Button>
        }
        <p className='text-center my-2'>Already have account?? <span className='text-primary pointer' onClick={handlingRegister}>{register ? "Sign Up" : "Sign In"}</span></p>
      </form>
    </div>
  )
}

export default Form