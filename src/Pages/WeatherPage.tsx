import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import PageHeader from '../components/PageHeader';
import PaginatedList from '../components/PaginatedList';
import { IForecastHour } from '../types';
import { setWeather } from '../store/features/weatherSlice';
import Loader from '../components/UI/Loader';
import HoursWeather from '../components/HoursWeather';
import WeatherPageContent from '../components/WeatherPageContent';

const MainPage: FC = () => {
    
    const weather = useAppSelector(state => state.weather.weather);
    const cityToShow = useAppSelector(state => state.city.visibleCity);
    const city = useAppSelector(state => state.city.city);
    const forecast = useAppSelector(state => state.weather.forecast);
    const day = useAppSelector(state => state.day.day);
    const currentWeather = useAppSelector(state => state.weather.currentWeather);
    const dispatch = useAppDispatch();
    const [forecastThisDay, setForecastThisDay] = useState<IForecastHour[]>([]);
    const [dayName, setDayName] = useState<string>('current');

    const getDate = (dayNum: string): string => {
      const date = new Date();

      date.setDate(date.getDate() + parseInt(dayNum) - 1);

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2); 

      return `${day}.${month}.${year}`;
    }
    useEffect(() => {
      if (forecast.length) {
        setForecastThisDay(forecast[parseInt(day)-1].hour);
        if (parseInt(day)!==1) dispatch(setWeather(forecast[parseInt(day)-1].day));
        else dispatch(setWeather(currentWeather));
        switch (day) {
          case "1":
            setDayName('current');
            break;  
          case "2":
            setDayName('tomorrow');
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
          : <h1 className="w-full h-full flex items-center justify-center pt-60 text-6xl text-gray-400 font-bold text-center">choose city</h1>
        }
        
        </div>
      </main>
    );
};

export default MainPage;