// src/components/Login/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <form className="login-form-card" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
              alt="website logo"
              className="login-website-logo"
            />
            <h1 className="login-brand-title">Tasty Kitchens</h1>
            <h2 className="login-heading">Login</h2>

            <div className="input-group">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        <div className="login-image-wrapper">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Rectangle_1456_1_y9t6u2.png"
            alt="website login"
            className="login-landing-image"
          />
        </div>
      </div>
    )
  }
}

export default Login