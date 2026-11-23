// src/components/NotFound/index.js
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/erroring_1_g9g871.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-text">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound