// src/components/Footer/index.js
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-logo-row">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/Group_7420_1_p0f5v0.svg"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-row">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="social-icon" />
      <FaTwitter testid="twitter-social-icon" className="social-icon" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="social-icon"
      />
    </div>
  </footer>
)

export default Footer