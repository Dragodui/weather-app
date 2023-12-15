import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setDay } from '../store/features/daySlice';

const PaginatedList: FC = () => {

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

    const getAfterTomorrowDate = ():string => {
        const today: Date = new Date();
        const afterTomorrow: Date = new Date(today);
        afterTomorrow.setDate(today.getDate() + 2);

        const day: number = afterTomorrow.getDate();
        const month: number = afterTomorrow.getMonth() + 1;
        const year: number = afterTomorrow.getFullYear();

        const formattedDay: string = (day < 10) ? '0' + day : day.toString();
        const formattedMonth: string = (month < 10) ? '0' + month : month.toString();

        return `${formattedDay}.${formattedMonth}.${year}`;
    };

    const dayList: string[] = ['Today', 'Tomorrow', getAfterTomorrowDate()];

    return (
        <div className="mt-10 flex w-full justify-between">
           <div className="gap-3 hidden md:flex">
                {
                    dayList.map(dayFromList => <button onClick={changeWeather} value={(dayList.indexOf(dayFromList)+1).toString()} key={dayFromList} className={` font-bold text-xl px-3 py-1 rounded-xl text-white ${(dayList.indexOf(dayFromList) + 1).toString() === day ? 'bg-sky-800' : 'bg-sky-600'}`}>{dayFromList}</button>)
                }
           </div>
           <div className="gap-3 justify-center flex md:hidden flex-wrap">
              <div className="flex gap-3">
                <button  className="rounded-xl font-bold text-xl px-3 py-1 bg-sky-600  text-white" onClick={changeWeather} value="1">Today</button>
                <button  className="rounded-xl font-bold text-xl px-3 py-1 bg-sky-600  text-white" onClick={changeWeather} value="2">Tomorrow</button>
              </div>
              <div className="flex gap-3">
                <button disabled={day==="1"}  className="rounded-xl disabled:opacity-50 font-bold text-xl px-3 py-1 bg-sky-600  text-white" onClick={changeDay} value="Prev">Prev day</button>
                <button disabled={day === "3"}  className="rounded-xl disabled:opacity-50 font-bold text-xl px-3 py-1 bg-sky-600  text-white" onClick={changeDay} value="Next">Next day</button>
              </div>
            </div>
        </div>
    );
};

export default PaginatedList;