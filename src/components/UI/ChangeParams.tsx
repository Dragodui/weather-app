import React from 'react';
import { changeTemperatureMetric, changeWindSpeedMetric, changeMeasureMetric } from '../../store/features/metricParamsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ChangeParams = () => {

    const dispatch = useAppDispatch();
    const temperature = useAppSelector(state => state.metricParams.temperature);
    const windSpeed = useAppSelector(state => state.metricParams.windSpeed);
    const measure = useAppSelector(state => state.metricParams.measure);

    const changeTemp = () => dispatch(changeTemperatureMetric());
    const changeWind = () => dispatch(changeWindSpeedMetric());
    const changeMeasure = () => dispatch(changeMeasureMetric());

    return (
        <div className="flex gap-4 justify-center sm:justify-normal">
            <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-white" onClick={changeTemp}>{temperature}</button>
            <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-white"  onClick={changeWind}>{windSpeed}</button>
            <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-white"  onClick={changeMeasure}>{measure}</button>
        </div>
    );
};

export default ChangeParams;