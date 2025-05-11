import React from 'react'

const Register = () => {
  return (
    <div>
      <h1 className="create-account-title">Create Account</h1>

      <form method="post" novalidate enctype="multipart/form-data">
          <div className="shrink">
              <div className="input-group">
                  <label className="form-label">First name</label>
                  <input className="form-input"/>
                  <span asp-validation-for="FirstName"></span>
              </div>
              <div className="input-group">
                  <label asp-for="LastName" className="form-label"></label>
                  <input asp-for="LastName" className="form-input" value="@Model?.LastName"/>
                  <span asp-validation-for="LastName"></span>
              </div>
          </div>

          <div className="input-group">
              <label asp-for="Email" className="form-label"></label>
              <input asp-for="Email" className="form-input" value="@Model?.Email"/>
              <span asp-validation-for="Email"></span>
          </div>

          <div className="shrink">
              <div className="input-group">
                  <label asp-for="Password" className="form-label"></label>
                  <input asp-for="Password" className="form-input" value="@Model?.Password"/>
                  <span asp-validation-for="Password"></span>
              </div>
              <div className="input-group">
                  <label asp-for="ConfirmPassword" className="form-label"></label>
                  <input asp-for="ConfirmPassword" className="form-input" value="@Model?.ConfirmPassword"/>
                  <span asp-validation-for="ConfirmPassword"></span>
              </div>
          </div>

          <div className="terms">
              <input asp-for="AcceptTerms" type="checkbox"/> <span>I accept</span> <a asp-action="#">Terms and Conditions</a>
              <span asp-validation-for="AcceptTerms"></span>
          </div>

          <button type="submit" className="btn btn-register-login">Create Account</button>
      </form>

      <div className="account-already">
          <p>Already have an account or Google-account?</p><a href='/login'>Login here</a>
      </div>
    </div>
  )
}

export default Register