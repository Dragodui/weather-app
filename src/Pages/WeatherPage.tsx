import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import PageHeader from '../components/PageHeader';
import PaginatedList from '../components/PaginatedList';
import { IForecastHour } from '../types';
import { setWeather } from '../store/features/weatherSlice';
import Loader from '../components/UI/Loader';
import HoursWeather from '../components/HoursWeather';
import WeatherPageContent from '../components/WeatherPageContent';
import axios from 'axios';
import { changeCity, changeMyLocation, changeVisibleCity } from '../store/features/citySlice';
import locationIcon from "../assets/header/location.svg";

const WeatherPage: FC = () => {
    
    const weather = useAppSelector(state => state.weather.weather);
    const cityToShow = useAppSelector(state => state.city.visibleCity);
    const city = useAppSelector(state => state.city.city);
    const forecast = useAppSelector(state => state.weather.forecast);
    const day = useAppSelector(state => state.day.day);
    const currentWeather = useAppSelector(state => state.weather.currentWeather);
    const dispatch = useAppDispatch();
    const [forecastThisDay, setForecastThisDay] = useState<IForecastHour[]>([]);
    const [dayName, setDayName] = useState<string>('Current');

    const getDate = (dayNum: string): string => {
      const date = new Date();

      date.setDate(date.getDate() + parseInt(dayNum) - 1);

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2); 

      return `${day}.${month}.${year}`;
    }

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
          dispatch(changeMyLocation({myLocation: `${city.name}, ${city.countryCode}`}));
        }
        else {
          console.log('nie spoko');
        }
     } catch(error) {
        console.log(`error ${error}`);
     }
    };

    useEffect(() => {
      if (forecast.length) {
        setForecastThisDay(forecast[parseInt(day)-1].hour);
        if (parseInt(day)!==1) dispatch(setWeather(forecast[parseInt(day)-1].day));
        else dispatch(setWeather(currentWeather));
        switch (day) {
          case "1":
            setDayName('Current');
            break;  
          case "2":
            setDayName('Tomorrow');
            break;
          default:
            setDayName(`${getDate(day)}`);
            break;
        } 
      } 
    }, [forecast, day])

    return (
      <main className="w-full flex flex-col items-center pt-10">
        <div className="container max-w-[1100px] pt-10 pb-20 flex flex-col justify-center items-center px-3">
        {
          city 
          ? weather
            ? <>
                <div className="md:animate__animated md:animate__fadeInRight w-full">
                  <PageHeader title = {`${dayName} weather in ${cityToShow}`}/>
                  <PaginatedList/>
                </div>
                <WeatherPageContent />
                <HoursWeather
                  forecast={forecastThisDay}
                />
              </>
          : <Loader/>
          : <button onClick={handleLocation} className="flex items-center justify-end py-5 px-10 text-2xl gap-2 font-bold bg-sky-700 rounded-[24px] mt-[200px]"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">find my location</p></button>
        }
        
        </div>
      </main>
    );
};

export default WeatherPage;