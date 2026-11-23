// src/components/Home/index.js
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsFilterLeft, BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Navbar from '../Navbar'
import Footer from '../Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const LIMIT = 9

const defaultSortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersList: [],
    isOffersLoading: true,
    restaurantsList: [],
    isRestaurantsLoading: true,
    selectedSortByValue: 'Lowest',
    activePage: 1,
    totalPages: 4,
    searchInput: '',
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaurants()
  }

  getOffers = async () => {
    this.setState({isOffersLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({offersList: data.offers, isOffersLoading: false})
    }
  }

  getRestaurants = async () => {
    this.setState({isRestaurantsLoading: true})
    const {activePage, selectedSortByValue, searchInput} = this.state
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const totalPages = Math.max(1, Math.ceil((data.total || 36) / LIMIT))
      this.setState({
        restaurantsList: data.restaurants,
        isRestaurantsLoading: false,
        totalPages,
      })
    } else {
      this.setState({restaurantsList: [], isRestaurantsLoading: false})
    }
  }

  onChangeSortBy = event => {
    this.setState(
      {selectedSortByValue: event.target.value, activePage: 1},
      this.getRestaurants,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.setState({activePage: 1}, this.getRestaurants)
    }
  }

  onClickSearch = () => {
    this.setState({activePage: 1}, this.getRestaurants)
  }

  onClickLeftPagination = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurants)
    }
  }

  onClickRightPagination = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState({activePage: activePage + 1}, this.getRestaurants)
    }
  }

  renderOffersCarousel = () => {
    const {offersList, isOffersLoading} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }

    if (isOffersLoading) {
      return (
        <div
          className="loader-container"
          testid="restaurants-offers-loader"
        >
          <div className="spinner" />
        </div>
      )
    }

    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {offersList.map(each => (
            <div key={each.id}>
              <img
                src={each.image_url}
                alt="offer"
                className="carousel-offer-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurantsList = () => {
    const {restaurantsList, isRestaurantsLoading} = this.state

    if (isRestaurantsLoading) {
      return (
        <div className="loader-container" testid="restaurants-list-loader">
          <div className="spinner" />
        </div>
      )
    }

    if (restaurantsList.length === 0) {
      return (
        <div className="no-restaurants-view">
          <h2>No Restaurants Found</h2>
          <p>Try searching with a different keyword.</p>
        </div>
      )
    }

    return (
      <ul className="restaurants-grid">
        {restaurantsList.map(restaurant => (
          <li
            key={restaurant.id}
            testid="restaurant-item"
            className="restaurant-item"
          >
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="restaurant-link"
            >
              <img
                src={restaurant.image_url}
                alt="restaurant"
                className="restaurant-thumbnail"
              />
              <div className="restaurant-info">
                <h1 className="restaurant-name">{restaurant.name}</h1>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <div className="restaurant-rating-row">
                  <AiFillStar color="#FFCC00" size={16} />
                  <p className="rating-value">
                    {restaurant.user_rating.rating}
                  </p>
                  <h4 className="reviews-count">
                    ({restaurant.user_rating.total_reviews} ratings)
                  </h4>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {
      selectedSortByValue,
      activePage,
      totalPages,
      searchInput,
    } = this.state
    const {sortByOptions = defaultSortByOptions} = this.props

    return (
      <div className="home-page">
        <Navbar />
        <main className="home-main-content">
          {this.renderOffersCarousel()}

          <section className="popular-restaurants-section">
            <div className="restaurants-header">
              <div>
                <h1 className="popular-heading">Popular Restaurants</h1>
                <p className="popular-subtitle">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>

              <div className="controls-row">
                <div className="search-box">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                    onKeyDown={this.onKeyDownSearch}
                    placeholder="Search restaurants"
                    className="search-input"
                  />
                  <button
                    type="button"
                    onClick={this.onClickSearch}
                    className="search-btn"
                  >
                    <BsSearch />
                  </button>
                </div>

                <div className="sort-by-container">
                  <BsFilterLeft size={22} color="#475569" />
                  <p className="sort-by-label">Sort By</p>
                  <select
                    value={selectedSortByValue}
                    onChange={this.onChangeSortBy}
                    className="sort-by-select"
                  >
                    {sortByOptions.map(option => (
                      <option key={option.id} value={option.value}>
                        {option.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <hr className="divider-line" />
            {this.renderRestaurantsList()}

            <div className="pagination-container">
              <button
                type="button"
                testid="pagination-left-button"
                className="pagination-btn"
                onClick={this.onClickLeftPagination}
              >
                <IoIosArrowBack />
              </button>
              <p className="pagination-text">
                <span testid="active-page-number">{activePage}</span> of{' '}
                {totalPages}
              </p>
              <button
                type="button"
                testid="pagination-right-button"
                className="pagination-btn"
                onClick={this.onClickRightPagination}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Home