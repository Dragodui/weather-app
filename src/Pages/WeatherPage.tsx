import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import PageHeader from '../components/PageHeader';
import PaginatedList from '../components/PaginatedList';
import { IForecastHour } from '../types';
import { setWeather } from '../store/features/weatherSlice';
import Loader from '../components/UI/Loader';

const MainPage: FC = () => {
    
    const weather = useAppSelector(state => state.weather.weather);
    const cityToShow = useAppSelector(state => state.city.visibleCity);
    const city = useAppSelector(state => state.city.city);
    const temperature = useAppSelector(state => state.metricParams.temperature);
    const windSpeed = useAppSelector(state => state.metricParams.windSpeed);
    const measure = useAppSelector(state => state.metricParams.measure);
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
                <div className="animate__animated animate__fadeInRight w-full">
                  <PageHeader title = {`${dayName} weather in ${cityToShow}`}/>
                  <PaginatedList/>
                </div>
                <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10 w-full text-center text-2xl">
                  <div className="animate__animated animate__fadeInTopLeft bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <p>{ cityToShow }</p>
                  </div>
                  <div className="animate__animated animate__fadeInDownBig bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <p className="text-6xl text-yellow-200 font-black text-center block w-full"> {temperature === '°C' ? `${weather.currentTempInC}°C` : `${weather.currentTempInF}°F`}</p>
                  </div>
                  <div className="animate__animated animate__fadeInTopRight bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <span className="text-xl">Wind:</span> <br/> {windSpeed === 'mph' ? `${weather.windMph} mph` : `${weather.windKph} kph`}
                  </div>
                  <div className="animate__animated animate__fadeInBottomLeft bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <img className="w-20" src={weather.condition.icon} alt="" /> 
                    <p>{weather.condition.text}</p>
                  </div>
                  <div className="animate__animated animate__fadeInUpBig bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <span className="text-xl">Humidity</span> <br/> 
                    {weather.humidity}%
                    </div>
                  <div className="animate__animated animate__fadeInBottomRight bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                    <span className="text-xl">Precipitation</span> <br/> 
                    {measure === 'mm' ? `${weather.precipMm} mm` : `${weather.precipIn} in`}
                    </div>
                </div>
                <div className="flex overflow-x-auto scrollbar-hide max-w-full mt-10 gap-5 px-3 animate__animated animate__fadeInLeft">
                    {
                      forecastThisDay.map(hour => 
                        <div key={forecastThisDay.indexOf(hour)} className="px-3 py-2 font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-white  rounded-xl flex items-center justify-between flex-col min-w-fit">
                          {forecastThisDay.indexOf(hour) > 12 ? <p>{forecastThisDay.indexOf(hour)-12} pm</p> : <p>{forecastThisDay.indexOf(hour)} am</p>}
                          <img className="w-10 min-w-fit" src={hour.condition.icon} alt="" />
                          <p>{hour.chanceOfPrecip}%</p>
                          {
                            temperature === "°C"
                              ? <p>{hour.tempInC}°C</p>
                              : <p>{hour.tempInF}°F</p>
                          }
                        </div>
                      )
                    }
                </div>
              </>
          : <Loader/>
          : <h1 className="w-full h-full flex items-center justify-center pt-60 text-6xl text-gray-400 font-bold text-center">choose city</h1>
        }
        
        </div>
      </main>
    );
};

export default MainPage;