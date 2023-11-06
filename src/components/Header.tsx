import { ChangeEvent, FC, useEffect } from "react";
import axios from "axios";
import { IForecastHour, ISearchedCity, IWeatherParams } from "../types";
import logo from "../assets/header/logo.svg";
import locationIcon from "../assets/header/location.svg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCurrentWeather, setForecast, setWeather } from "../store/features/weatherSlice";
import { changeCity } from "../store/features/citySlice";
import { changeVisibleCity } from "../store/features/citySlice";
import { changeSearchCity } from "../store/features/citySlice";
import { setCities } from "../store/features/citySearchSlice";
import { Link } from "react-router-dom";

const Header: FC = () => {

    
  const dispatch = useAppDispatch();
  const city = useAppSelector(state => state.city.city);
  const cityToShow = useAppSelector(state => state.city.visibleCity);
  const cityToSearch = useAppSelector(state => state.city.searchCity);
  const citiesSearch = useAppSelector(state => state.citiesSearch.citiesSearch);

  useEffect(() => {
    const fetchWeather = async() => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=45b0bc58cbed407a813225410230111&q=${city}&days=10&aqi=no&alerts=no`);
        if (response.status === 200) {
          const data = response.data;
          const weatherParams: IWeatherParams = {
            currentTempInC: data.current.temp_c,
            currentTempInF: data.current.temp_f,
            condition: {
              text: data.current.condition.text,
              icon: data.current.condition.icon
            },
            windMph: data.current.wind_mph,
            windKph: data.current.wind_kph,
            humidity: data.current.humidity,
            precipMm: data.current.precip_mm,
            precipIn: data.current.precip_in,
          };

          const forecastParams = data.forecast.forecastday.map(day => {
            return {
              day: day.day,
              hour: day.hour,
            };
          });
          
          forecastParams.map(forecast => {
            forecast.day = {
              humidity: forecast.day.avghumidity,
              currentTempInC: forecast.day.avgtemp_c,
              currentTempInF: forecast.day.avgtemp_f,
              condition: {
                text: forecast.day.condition.text,
                icon: forecast.day.condition.icon
              },
              precipIn: forecast.day.totalprecip_in,
              precipMm: forecast.day.totalprecip_mm,
              windKph: forecast.day.avgvis_km,
              windMph: forecast.day.avgvis_miles
            };
            forecast.hour = forecast.hour.map(newHour => ({
              chanceOfPrecip: newHour.chance_of_rain > newHour.chance_of_show ? newHour.chance_of_snow : newHour.chance_of_rain,
              tempInC: newHour.temp_c,
              tempInF: newHour.temp_f,
              condition: {
              text: newHour.condition.text,
              icon: newHour.condition.icon
            }
            }));
          });
          
          console.log(forecastParams);

          dispatch(setForecast(forecastParams));
          dispatch(setWeather(weatherParams));
          dispatch(setCurrentWeather(weatherParams));
        }
      } catch(error) {
        console.log(`error ${error}`);
      }
    };

    fetchWeather();

  }, [city]);

  const handleLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        searchCityByLocation(latitude, longitude);
      });
    }
  };

  const searchCityByLocation = async(latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&username=dragodui&style=full`);
      if (response.status === 200) {

        const data = response.data;
        const city: ISearchedCity = {
          geonameId: data.geonames[0].adminId2,
          name: data.geonames[0].adminName2,
          countryCode: data.geonames[0].countryCode,
          adminName1: data.geonames[0].adminName3,
        }
        dispatch(changeCity({city:`${city.name}, ${city.adminName1}, ${city.countryCode}`}));
        dispatch(changeVisibleCity({visibleCity: `${city.name}, ${city.countryCode}`}));
      }
      else {
        console.log('nie spoko');
      }
   } catch(error) {
      console.log(`error ${error}`);
   }
  };

  const searchCity = async(e: ChangeEvent<HTMLInputElement>) => {
   dispatch(changeSearchCity({searchCity:e.target.value}));
   try {
      const response = await axios.get(`http://api.geonames.org/searchJSON?name=${e.target.value}&maxRows=20&username=dragodui`);
      if (response.status === 200) {
        const data = response.data;
        const geonames = data.geonames;

        geonames.sort((a, b) => b.population - a.population);

        const list = data.geonames.map((city: ISearchedCity) => ({
          geonameId: city.geonameId,
          name: city.name,
          countryCode: city.countryCode,
          adminName1: city.adminName1,
        }));

        dispatch(setCities(list));
      }
      else {
        console.log('nie spoko');
      }
   } catch(error) {
      console.log(`error ${error}`);
   }
  };


    return (
        <header className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-sky-400 to-purple-500">
        <div className="container max-w-[1100px] mx-2 flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center"><img src={logo} alt="" className="w-11" /><h1 className="text-3xl text-white font-black hidden md:inline">Weather App</h1></Link>
        
        <div className="flex items-center gap-2">
          { 
          city 
            ? <Link to="/weather" onClick={handleLocation} className="flex items-center w-full justify-end"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">{cityToShow}</p></Link>
            : <Link to="/weather" onClick={handleLocation} className="flex items-center w-full justify-end"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">find my location</p></Link>
          }
        <div className="max-w-[200px] w-full md:max-w-[300px]">
          <input 
            className="border-2 border-hidden outline-none rounded-xl relative z-20 px-2 py-1 w-full text-xl" 
            type="text" 
            value={cityToSearch} 
            onChange = {searchCity} 
            placeholder="🔍 type city. . ."
          />
          <div className="flex flex-col max-h-20 overflow-y-auto scrollbar-hide fixed bg-gradient-to-r from-sky-400 to-purple-500 rounded-lg text-white w-[200px] md: w-[300px]">
          {
            cityToSearch 
              ?  citiesSearch.map(city => 
                  <button className="py-1 px-2 border-b-2" key={city.geonameId}  onClick={() => {
                    dispatch(changeCity({city:`${city.name}, ${city.adminName1}, ${city.countryCode}`}));
                    dispatch(changeVisibleCity({visibleCity: `${city.name}, ${city.countryCode}`}));
                    dispatch(changeSearchCity({searchCity: ''}));
                  }}>
                    {city.name}, {city.adminName1}, {city.countryCode}
                  </button>
                )
              : ''
          }
          </div>
        </div>
        </div>
       </div>
      </header>
    );
};

export default Header;