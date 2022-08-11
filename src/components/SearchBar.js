/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/SearchBar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CUISINES } from '../resources/data/RESTAURANTS';

function SearchBar({ cuisineSelectOn }) {
  const d = new Date();

  let navigate = useNavigate();

  function onSubmitSearchBar(event) {
    event.preventDefault();

    // Using URLSearchParams to navigate to /search/q.
    const paramsObj = 
      {
        cuisine: `${event.target.cuisine ? event.target.cuisine.value : "All"}`,
        date: event.target.date.value,
        hour: event.target.hour.value,
        partySize: event.target.partySize.value
      };
    const searchParams = new URLSearchParams(paramsObj);
    const searchParamsString = searchParams.toString();
    navigate(`/search/${searchParamsString}`);
  }

  // Using useParams() and URLSearchParams to get each param including cuisine, date, hour, partySize.
  let params = useParams();
  const searchParams = new URLSearchParams(params.q);
  const searchParamsObj = 
    {
      cuisine: searchParams.get('cuisine'),
      date: searchParams.get('date'),
      hour: searchParams.get('hour'),
      partySize: searchParams.get('partySize')
    };

  // Get cuisinesArray for SearchBarCuisineSelect to use for options.
  const cuisinesArray = CUISINES;
  // if (searchParamsObj.cuisine === "All") {
  //   cuisinesArray = CUISINES;
  // } else {
  //   cuisinesArray = CUISINES.filter((cuisine) => cuisine === searchParamsObj.cuisine);
  // }

  return (
    <form className="search-bar" onSubmit={onSubmitSearchBar}>
      <SearchBarDateInput d={d} qDate={searchParamsObj.date} />
      <SearchBarHourSelect d={d} qHour={searchParamsObj.hour} />
      <SearchBarPartySizeSelect maxSize="10" qPartySize={searchParamsObj.partySize} />
      {cuisineSelectOn ? 
        <SearchBarCuisineSelect cuisinesArray={cuisinesArray} qCuisine={searchParamsObj.cuisine} />
        :
        null
      }
      <button type="submit" className="search-bar-btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}

function SearchBarDateInput({ d, qDate }) {
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  // Updateing showDate state whenever receiving a new and different qDate from params. 
  const [showDate, setShowDate] = useState(qDate);

  useEffect(() => {
    if (qDate !== showDate) {
      setShowDate(qDate);
    }
  }, [qDate]);

  function onInputDate(event) {
    setShowDate(event.target.value);
  }

  return (
    <label>Date
      <input 
        type="date" 
        name="date" 
        min={dateStringNow} 
        value={showDate || dateStringNow} 
        onChange={onInputDate} 
      />
    </label>
  );
}

function SearchBarHourSelect({ d, qHour }) {
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
  const currentHourNumber = Number(timeStringNow.slice(0, 2));
  
  // Array of hour integers from current hour to 22;
  const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

  // Updateing showHour state whenever receiving a new and different qHour from params. 
  const [showHour, setShowHour] = useState(qHour);

  useEffect(() => {
    if (qHour !== showHour) {
      setShowHour(qHour);
    }
  }, [qHour]);

  function onSelectHour(event) {
    setShowHour(event.target.value);
  }

  return (
    <label>Time
      <select name="hour" value={showHour || currentHourNumber} onChange={onSelectHour}>
        {hourNumbersArray.map((hour, i) => {
          return (
            <option key={hour} value={hour}>{i === 0 ? "Now" : `${hour}:00`}</option>
          );
        })}
      </select>
    </label>
  );
}

function SearchBarPartySizeSelect({ maxSize, qPartySize }) {
  const partySizeNumbersArray = Array.from(Array(Number(maxSize)), (e, i) => i + 1);

  // Updateing showPartySize state whenever receiving a new and different qPartySize from params. 
  const [showPartySize, setShowPartySize] = useState(qPartySize);

  useEffect(() => {
    if (qPartySize !== showPartySize) {
      setShowPartySize(qPartySize);
    }
  }, [qPartySize]);

  function onSelectPartySize(event) {
    setShowPartySize(event.target.value);
  }

  return (
    <label>Party Size
      <select name="partySize" value={showPartySize || 2} onChange={onSelectPartySize}>
        {partySizeNumbersArray.map((number) => {
          return (
            <option key={number} value={number}>{number} guests</option>
          );
        })}
      </select>
    </label>
  );
}

function SearchBarCuisineSelect({ cuisinesArray, qCuisine }) {

  // Updateing showCuisine state whenever receiving a new and different qCuisine from params. 
  const [showCuisine, setShowCuisine] = useState(qCuisine);

  useEffect(() => {
    if (qCuisine !== showCuisine) {
      setShowCuisine(qCuisine);
    }
  }, [qCuisine]);

  function onSelectCuisine(event) {
    setShowCuisine(event.target.value);
  }

  return (
    <label>Cuisine
      <select name="cuisine" value={showCuisine} onChange={onSelectCuisine}>
        {cuisinesArray.map((cuisine) => {
          return <option key={cuisine} value={cuisine}>{cuisine}</option>
        })}
      </select>
    </label>
  );
}

export default SearchBar;