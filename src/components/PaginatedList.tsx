import { ChangeEvent, FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setForecast, setWeather } from '../store/features/weatherSlice';
import { IWeatherParams } from '../types';
import { setDay } from '../store/features/daySlice';

const PaginatedList: FC = () => {

    const dayList: string[] = ['Today', 'Tomorrow', '3', '4', '5', '6', '7', '8', '9', '10'];
    const [dates, setDates] = useState<Date[]>([]);
    const [chosenDate, setChosenDate] = useState<string>('');
    const city = useAppSelector(state => state.city.city);
    const dispatch = useAppDispatch();
    const day = useAppSelector(state => state.day.day);

   useEffect(() => {
        const generateDateRange = (startDate: Date, endDate: Date): void => {
            const dateArray: Date[] = [];
            const currentDate = new Date(startDate);
        
            while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
            }
        
        setDates(dateArray);
        };

        const calculateEndDate = (startDate: Date, daysToAdd: number): Date => {
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + daysToAdd);
            return endDate;
        };

        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + 14);    
        const endDate = calculateEndDate(today, 300);

        generateDateRange(startDate, endDate);
    }, []);

    const fetchFutureWeather = async(e: ChangeEvent<HTMLSelectElement>) => {
        setChosenDate(e.target.value);
        try {
            const apiKey: string | undefined = process.env.WEATHER_API_KEY; 
            const response = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${e.target.value}`);
            if (response.status === 200) {
              const data = response.data;

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

              const newWeather: IWeatherParams = forecastParams[0].day;

              dispatch(setForecast(forecastParams));
              dispatch(setWeather(newWeather));
            }
          } catch(error) {
            console.log(`error ${error}`);
          }
    };

    const changeWeather = (e: MouseEvent) => {
        const button = e.target as HTMLButtonElement;
        dispatch(setDay(button.value));
    };

    const changeDay = (e: MouseEvent) => {
        const button = e.target as HTMLButtonElement;
        const newDay: number = button.value === 'Next' ? parseInt(day) + 1 : parseInt(day) - 1;
        dispatch(setDay(newDay.toString()));
    };

    const formatDateToYYYYMMDD = (date: Date): string => {
        const year = date.getFullYear();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="mt-10 flex w-full justify-between">
           <div className="gap-3 hidden md:flex">
                {
                    dayList.map(day => <button onClick={changeWeather} value={day === 'Today' ? "1" : day==='Tomorrow' ? "2" : day} key={day} className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white">{day}</button>)
                }
           </div>
           <div className="gap-3 justify-center flex md:hidden flex-wrap">
              <button  className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeWeather} value="1">Today</button>
              <button  className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeWeather} value="2">Tomorrow</button>
              <button disabled={day === "10"}  className="disabled:opacity-50 font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeDay} value="Next">Next day</button>
              <button disabled={day==="1"}  className="disabled:opacity-50 font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeDay} value="Prev">Prev day</button>
           </div>
            {/* <select onChange={fetchFutureWeather}>
                <option selected disabled>Another date:</option>
               {
                dates.map(date => <option key={formatDateToYYYYMMDD(date)} value={`${formatDateToYYYYMMDD(date)}`}>{formatDateToYYYYMMDD(date)}</option>)
               }
            </select> */}
        </div>
    );
};

export default PaginatedList;