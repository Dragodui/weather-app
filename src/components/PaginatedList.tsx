import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setDay } from '../store/features/daySlice';

const PaginatedList: FC = () => {

    const dayList: string[] = ['Today', 'Tomorrow', '3', '4', '5', '6', '7', '8', '9', '10'];
    const dispatch = useAppDispatch();
    const day = useAppSelector(state => state.day.day);

    const changeWeather: MouseEventHandler<HTMLButtonElement> = (e) => {
        const button = e.target as HTMLButtonElement;
        dispatch(setDay(button.value));
    };
    
    const changeDay: MouseEventHandler<HTMLButtonElement> = (e) => {
        const button = e.target as HTMLButtonElement;
        const newDay: number = button.value === 'Next' ? parseInt(day) + 1 : parseInt(day) - 1;
        dispatch(setDay(newDay.toString()));
    };

    return (
        <div className="mt-10 flex w-full justify-between">
           <div className="gap-3 hidden md:flex">
                {
                    dayList.map(dayFromList => <button onClick={changeWeather} value={(dayList.indexOf(dayFromList)+1).toString()} key={dayFromList} className={` font-bold text-xl px-3 py-1 rounded-xl text-white ${(dayList.indexOf(dayFromList) + 1).toString() === day ? 'bg-black' : 'bg-gradient-to-r from-sky-400 to-purple-500'}`}>{dayFromList}</button>)
                }
           </div>
           <div className="gap-3 justify-center flex md:hidden flex-wrap">
              <div className="flex gap-3">
                <button  className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeWeather} value="1">Today</button>
                <button  className=" font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeWeather} value="2">Tomorrow</button>
              </div>
              <div className="flex gap-3">
                <button disabled={day === "10"}  className="disabled:opacity-50 font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeDay} value="Next">Next day</button>
                <button disabled={day==="1"}  className="disabled:opacity-50 font-bold text-xl px-3 py-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl text-white" onClick={changeDay} value="Prev">Prev day</button>
              </div>
            </div>
        </div>
    );
};

export default PaginatedList;