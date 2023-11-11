import axios from "axios";
import { ChangeEvent, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import locationIcon from "../assets/header/location.svg";
import logo from "../assets/header/logo.svg";
import { setCities } from "../store/features/citySearchSlice";
import { changeCity, changeSearchCity, changeVisibleCity } from "../store/features/citySlice";
import { setCurrentWeather, setForecast, setWeather } from "../store/features/weatherSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { IWeatherParams } from "../types";


const Header: FC = () => {

  const dispatch = useAppDispatch();
  const city = useAppSelector(state => state.city.city);
  const cityToShow = useAppSelector(state => state.city.visibleCity);
  const cityToSearch = useAppSelector(state => state.city.searchCity);
  const citiesSearch = useAppSelector(state => state.citiesSearch.citiesSearch);

  useEffect(() => {
    const fetchWeather = async() => {
      try {
        const apiKey: string | undefined = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`);
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
        searchCityByMyLocation(latitude, longitude);
      });
    }
  };

  const searchCityByMyLocation = async(latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&format=json&limit=10&accept-language=en&addressdetails=1`);
      if (response.status === 200) {
        const data = response.data;
        const dataResult = data[0];
        const dataAddress = dataResult.address
        const city = {
          id: dataResult.place_id,
          name: dataAddress.city,
          countryCode: dataAddress.country_code.toUpperCase(),
          adminName: dataAddress.state,
        }
        dispatch(changeCity({city:`${city.name}, ${city.adminName}, ${city.countryCode}`}));
        dispatch(changeVisibleCity({visibleCity: `${city.name}, ${city.countryCode}`}));
      }
      else {
        console.log('nie spoko');
      }
   } catch(error) {
      console.log(`error ${error}`);
   }
  };

  const searchCity = async (e: ChangeEvent<HTMLInputElement>) => {
    const city: string = e.target.value;
    dispatch(changeSearchCity({ searchCity: city }));
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=10&accept-language=en&addressdetails=1`
        );
        if (response.status === 200) {
          const data = response.data;
          const list = data
            .map((city) => {
              return city.address.city
                ? {
                    id: city.place_id,
                    name: city.address.city,
                    countryCode: city.address.country_code.toUpperCase(),
                    adminName: city.address.state,
                  }
                : null;
            })
            .filter((city) => city !== null);
          dispatch(setCities(list));
        } else {
          console.log('nie spoko');
        }
      } catch (error) {
        console.log(`error ${error}`);
      }
    }, 500);
  };
  
  // Ваш компонент
  <input
    className="border-2 border-hidden outline-none rounded-xl relative z-20 px-2 py-1 w-full text-xl"
    type="text"
    value={cityToSearch}
    onChange={searchCity}
    placeholder="🔍 type city. . ."
  />
  

    return (
        <header className="w-full flex justify-center items-center z-30 py-4 bg-gradient-to-r from-sky-400 to-purple-500">
          <div className="container max-w-[1100px] mx-2 flex justify-between items-center">
            <Link to="/" className="flex gap-2 items-center"><img src={logo} alt="" className="w-11" /><h1 className="text-3xl text-white font-black hidden md:inline">Weather App</h1></Link>
            <div className="flex items-center gap-2">
              { 
              city 
                ? <Link to="/weather" onClick={handleLocation} className="flex items-center justify-end"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">{cityToShow}</p></Link>
                : <Link to="/weather" onClick={handleLocation} className="flex items-center justify-end"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">find my location</p></Link>
              }
              <div className="max-w-[200px] md:max-w-[300px]">
                <input 
                  className="border-2 border-hidden outline-none rounded-xl relative z-20 px-2 py-1 w-full text-xl" 
                  type="text" 
                  value={cityToSearch} 
                  onChange = {searchCity} 
                  placeholder="🔍 type city. . ."
                />
                <div className="flex flex-col z-40 max-h-24 overflow-y-auto scrollbar-hide absolute top-14 bg-gradient-to-r from-sky-400 to-purple-500 rounded-lg text-white max-w-[200px] md:max-w-[300px]">
                {
                  cityToSearch 
                    ?  citiesSearch.map(city => 
                        <Link to='/weather' className="py-1 px-2 border-b-2" key={city.geonameId}  onClick={() => {
                          dispatch(changeCity({city:`${city.name}, ${city.adminName}, ${city.countryCode}`}));
                          dispatch(changeVisibleCity({visibleCity: `${city.name}, ${city.countryCode}`}));
                          dispatch(changeSearchCity({searchCity: ''}));
                        }}>
                          {city.name}, {city.adminName}, {city.countryCode}
                        </Link>
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
