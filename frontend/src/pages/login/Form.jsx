import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../../context/ContextApi';
import { useNavigate } from 'react-router-dom';


const Form = () => {
  const [userOtp, setUserOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();
  const { setUser, setToken, message, setMessage } = useContext(AppContext);

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
        setMessage("Invalid OTP");
        return;
      }

      if (!register) {
        const response = await axios.post(url + "/signup", userInfo);
        const data = response.data;
        if (data.success) {
          setToken(data.token);
          setUserInfo({
            name: '',
            dob: '',
            email: ''
          });
          setUserOtp("");
          setServerOtp("");
          setOtpField(false);
          setUser(data.user);
          navigate('/dashboard')

        } else {
          setMessage("User already exists");
        }
      } else {
        const response = await axios.post(url + "/login", { email: userInfo.email });
        const data = response.data;
        if (data.success) {
          setToken(data.token);

          setUserInfo({
            name: '',
            dob: '',
            email: ''
          });
          setUserOtp("");
          setServerOtp("");
          setOtpField(false);
          setUser(data.user);
          navigate('/dashboard');

        } else {
          setMessage("User not registered");
        }
      }

    } catch (error) {
      setMessage(error.response.data.message);

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
      }

    } catch (error) {
      setMessage(error.response.data.message);
    }
  }


  return (
    <div className=' my-5  px-5  px-md-3'>
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

              {message && <p className='text-danger fw-semibold'>{message}</p>}
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