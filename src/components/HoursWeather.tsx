import { FC } from 'react';
import { IForecastHour } from '../types';
import { useAppSelector } from '../store/store';

interface HoursWeatherProps {
    forecast: IForecastHour[];
}

const HoursWeather: FC<HoursWeatherProps> = ({ forecast }) => {

    const temperature = useAppSelector(state => state.metricParams.temperature);

    return (
        <div className="flex overflow-x-auto scrollbar-hide max-w-full mt-10 gap-5 px-3 py-1 md:animate__animated md:animate__fadeInLeft">
        {
          forecast.map(hour => 
            <div key={forecast.indexOf(hour)} className="px-3 py-2 font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-white  rounded-xl flex items-center justify-between flex-col min-w-fit">
              {forecast.indexOf(hour) > 12 ? <p>{forecast.indexOf(hour)-12} pm</p> : <p>{forecast.indexOf(hour)} am</p>}
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
    );
};

export default HoursWeather;