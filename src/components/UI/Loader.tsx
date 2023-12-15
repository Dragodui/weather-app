import { FC } from 'react';

const Loader: FC = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="w-24 h-24 border-t-8 border-t-sky-700 border-r-8 border-l-8 border-b-8  border-solid rounded-full animate-spin fixed"></div>
        </div>
    );
};

export default Loader;