// src/components/Navbar/index.js
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Navbar extends Component {
  state = {showMobileMenu: false}

  toggleMenu = () => {
    this.setState(prev => ({showMobileMenu: !prev.showMobileMenu}))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showMobileMenu} = this.state
    const {match} = this.props
    const {path} = match

    return (
      <nav className="navbar-header">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo-link">
            <img
              src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
              alt="website logo"
              className="navbar-logo-img"
            />
            <p className="navbar-logo-text">Tasty Kitchens</p>
          </Link>

          <ul className="navbar-desktop-links">
            <li>
              <Link
                to="/"
                className={path === '/' ? 'nav-link active-nav-link' : 'nav-link'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={
                  path === '/cart' ? 'nav-link active-nav-link' : 'nav-link'
                }
              >
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="hamburger-btn"
            onClick={this.toggleMenu}
            aria-label="Toggle Menu"
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        {showMobileMenu && (
          <div className="mobile-menu-container">
            <ul className="mobile-nav-list">
              <li>
                <Link
                  to="/"
                  className={
                    path === '/' ? 'nav-link active-nav-link' : 'nav-link'
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className={
                    path === '/cart' ? 'nav-link active-nav-link' : 'nav-link'
                  }
                >
                  Cart
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-menu-btn"
              onClick={this.toggleMenu}
            >
              <AiFillCloseCircle size={24} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Navbar)