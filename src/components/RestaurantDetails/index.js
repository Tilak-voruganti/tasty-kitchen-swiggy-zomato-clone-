// src/components/RestaurantDetails/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItems: [],
    isLoading: true,
    cartData: JSON.parse(localStorage.getItem('cartData')) || [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        restaurantData: data,
        foodItems: data.food_items || [],
        isLoading: false,
      })
    }
  }

  updateLocalStorage = updatedCart => {
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
    this.setState({cartData: updatedCart})
  }

  onAddFoodItem = item => {
    const {cartData} = this.state
    const newItem = {
      cost: item.cost,
      quantity: 1,
      id: item.id,
      imageUrl: item.image_url,
      name: item.name,
    }
    this.updateLocalStorage([...cartData, newItem])
  }

  onIncrementQuantity = id => {
    const {cartData} = this.state
    const updatedCart = cartData.map(each =>
      each.id === id ? {...each, quantity: each.quantity + 1} : each,
    )
    this.updateLocalStorage(updatedCart)
  }

  onDecrementQuantity = id => {
    const {cartData} = this.state
    const updatedCart = cartData
      .map(each =>
        each.id === id ? {...each, quantity: each.quantity - 1} : each,
      )
      .filter(each => each.quantity > 0)
    this.updateLocalStorage(updatedCart)
  }

  getItemQuantity = id => {
    const {cartData} = this.state
    const found = cartData.find(each => each.id === id)
    return found ? found.quantity : 0
  }

  render() {
    const {restaurantData, foodItems, isLoading} = this.state

    return (
      <div className="restaurant-details-page">
        <Navbar />
        {isLoading ? (
          <div className="loader-container" testid="restaurant-details-loader">
            <div className="spinner" />
          </div>
        ) : (
          <main>
            <section className="restaurant-banner">
              <div className="restaurant-banner-inner">
                <img
                  src={restaurantData.image_url}
                  alt="restaurant"
                  className="banner-restaurant-image"
                />
                <div className="banner-details">
                  <h1 className="banner-name">{restaurantData.name}</h1>
                  <p className="banner-cuisine">{restaurantData.cuisine}</p>
                  <p className="banner-location">{restaurantData.location}</p>
                  <div className="banner-stats">
                    <div>
                      <p className="stat-top">
                        <AiFillStar /> {restaurantData.rating}
                      </p>
                      <p className="stat-bottom">
                        {restaurantData.reviews_count}+ Ratings
                      </p>
                    </div>
                    <div className="stat-separator" />
                    <div>
                      <p className="stat-top">
                        <BiRupee /> {restaurantData.cost_for_two}
                      </p>
                      <p className="stat-bottom">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="food-items-section">
              <ul className="food-items-grid">
                {foodItems.map(item => {
                  const quantity = this.getItemQuantity(item.id)
                  return (
                    <li
                      key={item.id}
                      testid="foodItem"
                      className="food-item-card"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="food-item-image"
                      />
                      <div className="food-item-info">
                        <h1 className="food-item-name">{item.name}</h1>
                        <div className="food-item-cost">
  <BiRupee />
  <p>{item.cost}</p>
</div>
                        <p className="food-item-rating">
                          <AiFillStar color="#FFCC00" /> {item.rating}
                        </p>

                        {quantity === 0 ? (
                          <button
                            type="button"
                            className="add-food-btn"
                            onClick={() => this.onAddFoodItem(item)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="quantity-controls">
                            <button
                              type="button"
                              testid="decrement-count"
                              className="qty-btn"
                              onClick={() => this.onDecrementQuantity(item.id)}
                            >
                              -
                            </button>
                            <span testid="active-count" className="qty-count">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              testid="increment-count"
                              className="qty-btn"
                              onClick={() => this.onIncrementQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          </main>
        )}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
