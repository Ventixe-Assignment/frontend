import React from 'react'

const Register = () => {
  return (
    <div>
      <h1 className="create-account-title">Create Account</h1>

      <form method="post" noValidate enctype="multipart/form-data">
          <div className="shrink">
              <div className="input-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" />
              </div>
              <div className="input-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" />
              </div>
          </div>

          <div className="input-group">
              <label className="form-label">Email</label>
              <input className="form-input" />
          </div>

          <div className="shrink">
              <div className="input-group">
                  <label className="form-label">Password</label>
                  <input className="form-input" />
              </div>
              <div className="input-group">
                  <label className="form-label">Confirm Password</label>
                  <input className="form-input" />
              </div>
          </div>

          <div className="terms">
              <input type="checkbox"/> <span>I accept</span> <a asp-action="#">Terms and Conditions</a>
          </div>

          <button type="submit" className="btn btn-register-login">Create Account</button>
      </form>

      <div className="account-already">
          <p>Already have an account or Google-account?</p><a href='/'>Login here</a>
      </div>
    </div>
  )
}

export default Register