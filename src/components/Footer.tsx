import { FC } from 'react';
import { Link } from 'react-router-dom';
import locationIcon from "../assets/header/location.svg";
import logo from "../assets/header/logo.svg";
import { useAppSelector } from '../store/store';

const Footer: FC = () => {

    const city = useAppSelector(state => state.city.city);
    const cityToShow = useAppSelector(state => state.city.visibleCity);

    return (
        <footer className="mt-10 w-full flex justify-center items-center z-30 py-4 bg-gradient-to-r from-sky-400 to-purple-500">
            <div className="container max-w-[1100px] mx-2 flex justify-between items-center">
                <Link to="/" className="flex gap-2 items-center"><img src={logo} alt="" className="w-11" /><h1 className="text-3xl text-white font-black hidden md:inline">Weather App</h1></Link>
                <div className="flex items-center gap-2">
                    { 
                    city 
                    ? <Link to="/weather" className="flex items-center justify-end"><img className="w-7" src={locationIcon} alt="" /> <p className="text-white font-bold">{cityToShow}</p></Link>
                    : <Link to="/weather" className="flex items-center justify-end"><img className="w-7" src={locationIcon} alt="" /></Link>
                    }    
                </div>
            </div>
        </footer>
    );
};

export default Footer;