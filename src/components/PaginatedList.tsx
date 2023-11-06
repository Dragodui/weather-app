import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setForecast, setWeather } from '../store/features/weatherSlice';
import { IWeatherParams } from '../types';
import { setDay } from '../store/features/daySlice';

const PaginatedList: FC = () => {

    const dayList: string[] = ['Today', 'Tomorrow', '3', '4', '5', '6', '7', '8', '9', '10'];
    const city = useAppSelector(state => state.city.city);
    const dispatch = useAppDispatch();
    const day = useAppSelector(state => state.day.day);

    const changeWeather = (e: MouseEvent) => {
        const button = e.target as HTMLButtonElement;
        dispatch(setDay(button.value));
    }

    return (
        <div className="mt-10 flex w-full justify-between">
           <div className="flex gap-3">
                {
                    dayList.map(day => <button onClick={changeWeather} value={day === 'Today' ? "1" : day==='Tomorrow' ? "2" : day} key={day} className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white">{day}</button>)
                }
           </div>
            <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
        </div>
    );
};

export default PaginatedList;