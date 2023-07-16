import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [search, setSearch] = useState("");
  let [place, setPlace] = useState("Somewhere on Earth");
  // let [lat,setLat]=useState(10.009792);
  // let [long,setLong]=useState(76.9552045);

  const [result, setResult] = useState({
    cod: 200,
    name: "Somewhere on Earth",
    main: { temp: 293, feels_like: 293, humidity: 97, pressure: 1012 },
    weather: [{ main: "Clouds", icon: "02d" }],
    wind: { speed: 5 },
  });

  const getData = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5b4bee0ba241d092159faf007e166080`
    );
    res.json().then((data) => {
      setResult(data);
    });
  };

  const getCord = () => {
    // const options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0,
    // };

    // function success(pos) {
    //   const crd = pos.coords;

    //   console.log("Your current position is:");
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    //   // setLat(crd.latitude);
    //   // setLong(crd.longitude);
    //   let lat = crd.latitude;
    //   let long = crd.longitude;
    //   console.log(lat, long);
    //   getCurrentLocData(lat, long);
    // }

    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    //   alert("Turn on Location")
    // }

    if (navigator.geolocation) {
      console.log("IF");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("POS", position);
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          console.log(lat, long);
          getCurrentLocData(lat, long);
        },
        (error) => {
          console.log(error);
          if (error) {
            alert("Turn on Location");
          }
        }
      );
    } else {
      console.log("ELSE");
      alert("Turn on Location");
    }
  };
  const getCurrentLocData = async (lat, long) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bf11ac1bcef52413bd5275e89d024a17`
    );

    res.json().then((data) => {
      console.log(data);
      setResult(data);
    });
  };

  useEffect(() => {
    getCord();
    //     getCurrentLocData()
  }, []);
  function findW() {
    setPlace(search);
    getData();
    console.log(result);
  }
  return (
    <div className="App ">
      <input
        className="searchBox mt-5 ms-5 w-50"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-primary" onClick={findW}>
        Search
      </button>
      <h1 className="text-center text-light">{result.name}</h1>
      {result.name === "Somewhere on Earth" ? (
        <p className="text-center text-danger font-weight-bold font-italic">
          Please turn on your location
        </p>
      ) : (
        ""
      )}
      {result.cod === 200 ? (
        <div className="display mt-5  text-light border border-light rounded-5 text-center">
          <img
            src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
            alt="showWeather"
          />
          <h2>{Math.round(result.main.temp - 273.15)}&deg;C</h2>
          <p>Feels like {Math.round(result.main.feels_like - 273.15)}&deg;C</p>
          <h3>{result.weather[0].main}</h3>
          <p>Pressure:{result.main.pressure} hPa</p>
          <p>Humidity:{result.main.humidity} %</p>
          <p>Wind:{result.wind.speed} m/s</p>
        </div>
      ) : (
        <h1 className="text-center text-light">
          {result.message[0].toUpperCase() + result.message.slice(1)}
        </h1>
      )}
    </div>
  );
}

export default App;
