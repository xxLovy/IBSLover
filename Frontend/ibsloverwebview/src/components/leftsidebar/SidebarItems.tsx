"use client"
import React, { useState } from 'react';
import { sidebarItems, checkboxItems } from '../../../constants';
import { fetchCurrentLocation } from '@/redux/pin/operations';
import { useAppDispatch } from '@/redux/hooks';
import { setListStateTrue } from '@/redux/listView';

const SidebarItems = () => {
    const dispatch = useAppDispatch();
    const [filterState, setFilterState] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
        women: false,
        men: false,
        accessible: false,
        children: false,
        free: false,
        genderNeutral: false
    });

    const handleFilter = () => {
        setFilterState(!filterState);
    };

    const handleAdd = () => {
        console.log(2);
    };

    const handleFind = () => {
        dispatch(fetchCurrentLocation());
    };

    const handleList = () => {
        dispatch(setListStateTrue());
    };

    const handleClick = (clickType: "Filter" | "Add" | "Find" | "List") => {
        switch (clickType) {
            case "Filter":
                return handleFilter();
            case "Add":
                return handleAdd();
            case "Find":
                return handleFind();
            case "List":
                return handleList();
        }
    };

    const handleCheckboxChange = (key: string) => {
        setSelectedFeatures(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <div className='flex pb-5'>
            <ul className='flex flex-col'>
                {sidebarItems.map((item, index) => (
                    <li key={index} className='pt-5 cursor-pointer hover:text-red-500'>
                        <span onClick={() => handleClick(item.click as "Filter" | "Add" | "Find" | "List")}>
                            {item.lable}
                        </span>
                        {item.click === "Filter" && filterState && (
                            <div className="mt-2 ml-4 text-black">
                                {checkboxItems.map((checkbox, idx) => (
                                    <label key={idx} className="block">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedFeatures[checkbox.key]}
                                            onChange={() => handleCheckboxChange(checkbox.key)}
                                        />
                                        {checkbox.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarItems;