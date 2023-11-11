import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import WeatherBlock from '../components/WeatherBlock';
import PageHeader from '../components/PageHeader';
import Loader from '../components/UI/Loader';
import { WeatherForHomePage } from '../types';


const HomePage: FC = () => {

    const biggestCities: string[] = ['New York', 'London', 'Berlin', 'Moscow', 'Minsk', 'Warsaw'];

    const [biggestCitiesWeather, setBiggestCitiesWeather] = useState<WeatherForHomePage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherForAllCities = async () => {
          setIsLoading(true);
          const weatherData = await Promise.all(
            biggestCities.map(async (city) => {
              try {
                const apiKey : string | undefined = process.env.WEATHER_API_KEY;
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
                if (response.status === 200) {
                  const data = response.data;
                  setIsLoading(false);
                  return {
                    weather: {
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
                    },
                    city
                  };
                }
              } catch (error) {
                console.log(`error ${error}`);
              }
            })
          );
      
          setBiggestCitiesWeather(weatherData.filter((data) => data !== undefined));
          setIsLoading(false);
        };
      
        fetchWeatherForAllCities();
      }, []);

    return (
        <main className="w-full flex flex-col items-center pt-10">
             <div className="container max-w-[1100px] pt-10 flex flex-col justify-center items-center mx-4 px-3">
               {
                isLoading
                ? <Loader/>
                : <>
                    <div  className="animate__animated animate__bounceInRight w-full"><PageHeader title = "Weather in big cities"/></div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 animate__bounceInLeft animate__animated ">
                        {
                            biggestCitiesWeather.map(weather =>  <WeatherBlock key={weather.weather.windMph+weather.weather.precipMm} weather={ weather.weather } city={weather.city}/>)
                        }
                    </div>
                  </>
               }
             </div>
        </main>
    );
};

export default HomePage;
