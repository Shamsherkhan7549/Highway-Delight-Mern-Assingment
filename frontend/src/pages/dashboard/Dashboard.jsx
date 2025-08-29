import React from 'react'
import './Dashboard.css'
const Dashboard = () => {
  
  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 col-12 py-5">
            <div className="card shadow p-3 mb-5 ">

              <div className="card-body ">
                <h5 className="card-title fw-bold">Welcome, User</h5>
                <p className="card-text text-muted">Email: user@example.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>

        </div>
      </div>

    </>
  )
}

export default Dashboard