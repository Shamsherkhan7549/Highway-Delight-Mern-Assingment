import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { AppContext } from '../../context/ContextApi'
import { Button } from '@mui/material';


const Dashboard = () => {
  const { user, appGreet } = useContext(AppContext)
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 col-12 py-5">
            <div className="card shadow p-3 mb-5 ">

              <div className="card-body ">

                <h5 className="card-title fw-bold">Welcome, {user && user.name}</h5>
                <p className="card-text text-muted">Email: {user && user.email}</p>

              </div>
              
            </div>
            <div className='text-center'>
              <Button variant="contained" className='note' size="large" type='submit' >Create Note</Button>
            </div>
            
          </div>

          <div className="col-md-1"></div>
        </div>
      </div>

    </>
  )
}

export default Dashboard