import '../styles/HomePage.css';
import HomeBannerImage from '../resources/images/home-banner.jpg';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';

function HomePage() {
  return (
    <div className="home-page">
      <HomeBanner />
      <div className="banner-down-container">
        <SearchBar />
        <RestaurantShow />
      </div>
    </div>
  );
}

function HomeBanner() {
  return (
    <div className="home-banner">
      <img className="home-banner-img" src={HomeBannerImage} alt="Collage of delicious foods." />
      <pre className="home-banner-text">  DELICIOUS<br/>STARTS <br/>          HERE. </pre>
    </div>
  );
}

function SearchBar() {
  const d = new Date();

  return (
    <form className="search-bar">
      <SearchBarDateInput d={d} />
      <SearchBarHourSelect d={d} />
      <SearchBarPartySizeSelect maxSize="10" />
      <button type="submit" className="search-bar-btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}

function SearchBarDateInput({ d }) {
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  return (
    <label>&nbsp;Date
      <input type="date" name="date" min={dateStringNow} defaultValue={dateStringNow} />
    </label>
  );
}

function SearchBarHourSelect({ d }) {
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
  const currentHourNumber = Number(timeStringNow.slice(0, 2));
  // Array of hour integers from current hour to 22;
  const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

  return (
    <label>&nbsp;Time
      <select name="hour" defaultValue={currentHourNumber}>
        {hourNumbersArray.map((hour, i) => {
          return (
            <option key={hour} value={hour}>{i === 0 ? "Now" : `${hour}:00`}</option>
          );
        })}
      </select>
    </label>
  );
}

function SearchBarPartySizeSelect({ maxSize }) {
  const partySizeNumbersArray = Array.from(Array(Number(maxSize)), (e, i) => i + 1);

  return (
    <label>&nbsp;Party Size
      <select defaultValue="2" name="partySize">
        {partySizeNumbersArray.map((number) => {
          return (
            <option key={number} value={number}>{number} guests</option>
          );
        })}
      </select>
    </label>
  );
}

function RestaurantShow() {
  // Shows only 8 restaurants, most recently added.
  const restaurants = RESTAURANTS.slice(-8);

  return (
    <div className="restaurant-show">
      <h3 className="restaurant-show-header">Just Added</h3>
      <p className="restaurant-show-subheader">New restaurants on Toock</p>
      <RestaurantShowGrid restaurants={restaurants} />
    </div>
  );
}

function RestaurantShowGrid({ restaurants }) {
  return (
    <div className="restaurant-show-grid">
      {restaurants.map((restaurant) => {
        return (
          <RestaurantCard 
            key={restaurant.name}
            restaurant={restaurant}
          />
      );
    })}
    </div>
  );
}

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img className="restaurant-card-img" src={restaurant.photoURL} alt={restaurant.name} />
      <h5 className="restaurant-card-header">{restaurant.name}</h5>
      <p className="restaurant-card-text">{restaurant.cuisine}</p>
    </div>
  );
}

export default HomePage;