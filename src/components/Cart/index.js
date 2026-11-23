// src/components/Cart/index.js
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {
    cartData: JSON.parse(localStorage.getItem('cartData')) || [],
    isOrderPlaced: false,
  }

  updateCart = updatedCart => {
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
    this.setState({cartData: updatedCart})
  }

  onIncrementQuantity = id => {
    const {cartData} = this.state
    const updatedCart = cartData.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    this.updateCart(updatedCart)
  }

  onDecrementQuantity = id => {
    const {cartData} = this.state
    const updatedCart = cartData
      .map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item,
      )
      .filter(item => item.quantity > 0)
    this.updateCart(updatedCart)
  }

  onPlaceOrder = () => {
    localStorage.removeItem('cartData')
    this.setState({cartData: [], isOrderPlaced: true})
  }

  calculateTotalPrice = () => {
    const {cartData} = this.state
    return cartData.reduce((acc, item) => acc + item.cost * item.quantity, 0)
  }

  renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/Layer_2_v53411.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderOrderSuccess = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/Vector_u2m332.png"
        alt="payment success"
        className="payment-success-image"
      />
      <h1 className="empty-cart-heading">Payment Successful</h1>
      <p className="empty-cart-text">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  render() {
    const {cartData, isOrderPlaced} = this.state
    const totalPrice = this.calculateTotalPrice()

    return (
      <div className="cart-page">
        <Navbar />
        <main className="cart-main">
          {isOrderPlaced ? (
            this.renderOrderSuccess()
          ) : cartData.length === 0 ? (
            this.renderEmptyCart()
          ) : (
            <div className="cart-content-box">
              <div className="cart-table-header">
                <p className="col-item">Item</p>
                <p className="col-qty">Quantity</p>
                <p className="col-price">Price</p>
              </div>

              <ul className="cart-items-list">
                {cartData.map(item => (
                  <li key={item.id} testid="cartItem" className="cart-item-row">
                    <div className="cart-item-details col-item">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <h1 className="cart-item-title">{item.name}</h1>
                    </div>

                    <div className="cart-qty-controls col-qty">
                      <button
                        type="button"
                        testid="decrement-quantity"
                        className="qty-btn"
                        onClick={() => this.onDecrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span testid="item-quantity" className="qty-count">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        testid="increment-quantity"
                        className="qty-btn"
                        onClick={() => this.onIncrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item-cost col-price">
                      <BiRupee /> {item.cost * item.quantity}.00
                    </p>
                  </li>
                ))}
              </ul>

              <hr className="cart-dashed-divider" />

              <div className="order-total-row">
                <h1 className="order-total-label">Order Total:</h1>
                <div className="order-total-right">
                  <p className="order-total-amount">
                    <BiRupee />
                    <span testid="total-price">{totalPrice}</span>.00
                  </p>
                  <button
                    type="button"
                    className="place-order-btn"
                    onClick={this.onPlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Cart