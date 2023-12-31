import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { IWeatherParams } from '../types';
import { Link } from 'react-router-dom';
import { changeCity, changeVisibleCity } from '../store/features/citySlice';

interface WeatherBlockProps {
    weather: IWeatherParams;
    city: string;
}

const WeatherBlock: FC<WeatherBlockProps> = ({ weather, city }) => {
  
    const temperature = useAppSelector(state => state.metricParams.temperature);
    const windSpeed = useAppSelector(state => state.metricParams.windSpeed);
    const dispatch = useAppDispatch();

    const changeCityAndWeather = (): void => {
      dispatch(changeCity({city: city}));
      dispatch(changeVisibleCity({visibleCity: city}));
    };

    return (
      <Link 
        to="/weather" 
        onClick={changeCityAndWeather} 
        className="flex flex-col gap-1 justify-center items-center p-3 bg-sky-600 rounded-3xl text-white text-left"
      >
        <div className="flex justify-between items-start w-full gap-6">
          <div>
            <p className="text-5xl text-yellow-200 font-black text-left block w-full"> {temperature === '°C' ? `${weather.currentTempInC}°C` : `${weather.currentTempInF}°F`}</p>
            <p className="text-3xl font-bold text-left mt-2 sm:w-60">{city}</p>  
          </div> 
        </div> 
        <div className="flex justify-between items-end gap-10 font-bold mt-4 w-full">
          <div>
            <p className="text-xl ">Humidity: {weather.humidity}%</p>
            <p className="text-xl mt-3">Wind: {windSpeed === 'mph' ? `${weather.windMph} mph` : `${weather.windKph} kph`}</p>
          </div>
          <div className="flex flex-col items-center justify-center relative bottom-1">
            <img className="relative top-3 w-24" src={weather.condition.icon} alt="" />
            <p>{weather.condition.text}</p>
          </div>
        </div>
      </Link>
    );
};

export default WeatherBlock;