import { FC } from 'react';
import { useAppSelector } from '../store/store';

const WeatherPageContent: FC = () => {

    const weather = useAppSelector(state => state.weather.weather);
    const cityToShow = useAppSelector(state => state.city.visibleCity);
    const temperature = useAppSelector(state => state.metricParams.temperature);
    const windSpeed = useAppSelector(state => state.metricParams.windSpeed);
    const measure = useAppSelector(state => state.metricParams.measure);

    return (
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10 w-full text-center text-2xl">
            <div className="md:animate__animated md:animate__fadeInTopLeft bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                <p className="text-4xl font-black">{ cityToShow }</p>
            </div>
            <div className="md:animate__animated md:animate__fadeInDownBig bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                <p className="text-6xl text-yellow-200 font-black text-center block w-full"> {temperature === '°C' ? `${weather.currentTempInC}°C` : `${weather.currentTempInF}°F`}</p>
            </div>
            <div className="md:animate__animated md:animate__fadeInTopRight bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                <span className="text-xl font-black">Wind:</span> <br/> <p className="font-black">{windSpeed === 'mph' ? `${weather.windMph} mph` : `${weather.windKph} kph`}</p>
            </div>
            <div className="md:animate__animated md:animate__fadeInBottomLeft bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                <img className="w-20" src={weather.condition.icon} alt="" /> 
                <p className="font-black">{weather.condition.text}</p>
            </div>
            <div className="md:animate__animated md:animate__fadeInUpBig  bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-black">
                <span className="text-xl">Humidity</span> <br/> 
                <p className="font-black">{weather.humidity}%</p>
            </div>
            <div className="md:animate__animated md:animate__fadeInBottomRight bg-sky-600  text-white rounded-2xl p-3 text-2xl flex flex-col items-center justify-center font-bold">
                <span className="text-xl font-black">Precipitation</span> <br/> 
                <p className="font-black">{measure === 'mm' ? `${weather.precipMm} mm` : `${weather.precipIn} in`}</p>
        </div>
      </div>
    );
};

export default WeatherPageContent;