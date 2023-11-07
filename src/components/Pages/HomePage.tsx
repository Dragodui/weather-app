import React, { FC, useState, useEffect } from 'react';
import { IWeatherParams } from '../../types';
import axios from 'axios';
import WeatherBlock from '../WeatherBlock';
import PageHeader from '../PageHeader';
import Loader from '../UI/Loader';

type WeahterForHomePage = {
    weather:  IWeatherParams;
    city: string;
};

const HomePage: FC = () => {

    const biggestCities: string[] = ['New York', 'London', 'Berlin'];

    const [biggestCitiesWeather, setBiggestCitiesWeather] = useState<WeahterForHomePage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchWeatherForAllCities = async () => {
          setIsLoading(true);
          const weatherData = await Promise.all(
            biggestCities.map(async (city) => {
              try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=45b0bc58cbed407a813225410230111&q=${city}&aqi=no`);
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
        };
      
        fetchWeatherForAllCities();
      }, []);

    return (
        <main className="w-full flex justify-center flex-col items-center flex-1 pt-10">
             <div className="container max-w-[1100px] pt-20 flex flex-col justify-center items-center mx-4 px-3">
               {
                isLoading
                ? <Loader/>
                : <>
                    <PageHeader title = "Weather in big cities"/>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 animate__bounceInLeft animate__animated ">
                        {
                            biggestCitiesWeather.map(weather =>  <WeatherBlock key={weather.weather.windMph} weather={ weather.weather } city={weather.city}/>)
                        }
                    </div>
                  </>
               }
             </div>
        </main>
    );
};

export default HomePage;