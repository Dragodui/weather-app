import { FC } from 'react';
import { useRef } from 'react';
import { IForecastHour } from '../types';
import { useAppSelector } from '../store/store';
import { useDraggable } from "react-use-draggable-scroll";

interface HoursWeatherProps {
    forecast: IForecastHour[];
}

const HoursWeather: FC<HoursWeatherProps> = ({ forecast }) => {

    const temperature = useAppSelector(state => state.metricParams.temperature);
    const ref = useRef(); 
    const { events } = useDraggable(ref);

    return (
        <div 
          className="flex overflow-x-auto cursor-grabbing scrollbar-hide max-w-full mt-10 gap-5 px-3 py-1 md:animate__animated md:animate__fadeInLeft"
          {...events}
          ref={ref}
        >
        {
          forecast.map(hour => 
            <div key={forecast.indexOf(hour)} className="px-3 py-2 font-bold bg-sky-700 text-white  rounded-xl flex items-center justify-between flex-col min-w-fit">
              {forecast.indexOf(hour) > 12 ? <p>{forecast.indexOf(hour)-12} pm</p> : <p>{forecast.indexOf(hour)} am</p>}
              <img className="pointer-events-none w-10 min-w-fit" src={hour.condition.icon} alt="" />
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