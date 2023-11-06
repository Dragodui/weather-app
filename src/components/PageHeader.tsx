import React, { FC } from 'react';
import ChangeParams from './UI/ChangeParams';

interface PageHeaderProps {
    title: string;
}

const PageHeader:FC<PageHeaderProps> = ({ title }) => {
    return (
        <div className="flex w-full justify-center gap-3 flex-col sm:justify-between sm:flex-row">
            <h1 className="text-5xl font-black text-center sm:text-left">{title}</h1>
            <ChangeParams/>
        </div>
    );
};

export default PageHeader;