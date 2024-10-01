import { ChangeEvent, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import {
  changeCity,
  changeSearchCity,
  changeVisibleCity,
} from '../../store/features/citySlice';
import { setCities } from '../../store/features/citySearchSlice';

interface SearchModalProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  searchCity: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchModal: FC<SearchModalProps> = ({
  isOpened,
  setIsOpened,
  searchCity,
}) => {
  const dispatch = useAppDispatch();
  const cityToSearch = useAppSelector((state) => state.city.searchCity);
  const citiesSearch = useAppSelector(
    (state) => state.citiesSearch.citiesSearch,
  );

  return (
    <div
      className={`fixed z-50 px-3 w-[100%] h-[100%] ${
        isOpened ? 'flex' : 'hidden'
      } justify-center items-center bg-[rgb(0,0,0,0.4)]`}
      onClick={() => {
        dispatch(changeSearchCity({ searchCity: '' }));
        dispatch(setCities([]));
        setIsOpened(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='max-w-[650px] rounded-xl p-3 max-h-[500px] w-full h-full text-center flex flex-col items-center bg-white'
      >
        <h1 className='font-bold text-[40px]'>Search city</h1>
        <input
          type='text'
          className='shadow-custom-shadow mt-2 text-4xl w-full rounded-xl px-4 py-2 font-bold'
          value={cityToSearch}
          onChange={searchCity}
          placeholder='🔍search city. . .'
        />
        <div className='flex flex-col z-40 max-h-[300px] overflow-y-auto mt-4 bg-sky-600 text-white rounded-lg w-full'>
          {searchCity
            ? citiesSearch.map((city) => (
                <Link
                  to='/weather'
                  className='py-1 px-2 font-bold text-xl'
                  key={city.geonameId}
                  onClick={() => {
                    dispatch(
                      changeCity({
                        city: `${city.name}, ${city.adminName}, ${city.countryCode}`,
                      }),
                    );
                    dispatch(
                      changeVisibleCity({
                        visibleCity: `${city.name}, ${city.countryCode}`,
                      }),
                    );
                    dispatch(changeSearchCity({ searchCity: '' }));
                    dispatch(setCities([]));
                    setIsOpened(false);
                  }}
                >
                  {city.name}, {city.adminName}, {city.countryCode}
                </Link>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
