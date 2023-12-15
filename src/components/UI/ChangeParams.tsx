import { changeTemperatureMetric, changeWindSpeedMetric, changeMeasureMetric } from '../../store/features/metricParamsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { motion } from "framer-motion";

const ChangeParams = () => {

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };

    const dispatch = useAppDispatch();
    const temperature = useAppSelector(state => state.metricParams.temperature);
    const windSpeed = useAppSelector(state => state.metricParams.windSpeed);
    const measure = useAppSelector(state => state.metricParams.measure);

    const changeTemp = () => dispatch(changeTemperatureMetric());
    const changeWind = () => dispatch(changeWindSpeedMetric());
    const changeMeasure = () => dispatch(changeMeasureMetric());

    return (
        <div className="flex gap-4 justify-center sm:justify-normal">
            <div className={`bg-sky-600 flex rounded-full items-center p-2 cursor-pointer w-[80px] h-10 ${temperature === '°C' ? 'justify-end' : 'justify-start'}`}data-isOn={`${temperature === '°C'}`} onClick={changeTemp}>
                <motion.div className="bg-sky-900 font-bold h-7 w-7 rounded-full flex items-center justify-center text-white" layout transition={spring}>
                    {temperature}
                </motion.div>
            </div>
            <div className={`bg-sky-600 flex rounded-full items-center p-2 cursor-pointer w-[80px] h-10 ${windSpeed === 'kph' ? 'justify-end' : 'justify-start'}`} data-isOn={`${windSpeed === 'kph'}`} onClick={changeWind}>
                <motion.div className="bg-sky-900 font-bold h-7 w-7 rounded-full flex items-center justify-center text-white" layout transition={spring}>
                    {windSpeed}
                </motion.div>
            </div>
            <div className={`bg-sky-600 flex rounded-full items-center p-2 cursor-pointer w-[80px] h-10 ${measure === 'mm' ? 'justify-end' : 'justify-start'}`} data-isOn={`${measure === 'mm'}`} onClick={changeMeasure}>
                <motion.div className="bg-sky-900 font-bold h-7 w-7 rounded-full flex items-center justify-center text-white" layout transition={spring}>
                    {measure}
                </motion.div>
            </div>
            {/* <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-sky-600  text-white" onClick={changeTemp}>{temperature}</button>
            <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-sky-600  text-white"  onClick={changeWind}>{windSpeed}</button>
            <button className=" h-fit px-4 py-2 rounded-xl font-bold bg-sky-600  text-white"  onClick={changeMeasure}>{measure}</button> */}
        </div>
    );
};

export default ChangeParams;