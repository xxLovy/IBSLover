"use client"
import React, { useState } from 'react';
import { sidebarItems, checkboxItems } from '../../../constants';
import { fetchCurrentLocation } from '@/redux/pin/operations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateReverse, setListStateTrue } from '@/redux/listView';
import { setAccessible, setChildren, setFree, setGenderNeutral, setMen, setWomen } from '@/redux/filter';
import { useRouter } from 'next/navigation';
import { selectError, selectIsLoading, selectSuccess } from '@/redux/pin/slice';
import { useToast } from '../ui/use-toast';

const SidebarItems = () => {
    const dispatch = useAppDispatch();
    const [filterState, setFilterState] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
        women: false,
        men: false,
        accessible: false,
        children: false,
        free: true,
        genderNeutral: false,
    });
    const showListView = useAppSelector(selectListState)
    const router = useRouter();
    const success = useAppSelector(selectSuccess)
    const { toast } = useToast();

    const handleFilter = () => {
        setFilterState(!filterState);
    };

    const handleAdd = () => {
        if (!success) {
            toast({
                variant: "destructive",
                title: "Oh no, something went wrong",
                description: "Cannot get your current location.",
            })
        } else {
            router.push("/addToilet")
        }

    };

    const handleFind = () => {
        dispatch(fetchCurrentLocation());
    };

    const handleList = () => {
        dispatch(setListStateReverse());
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
        console.log(selectedFeatures)
        const newValue = !selectedFeatures[key];
        setSelectedFeatures({
            ...selectedFeatures,
            [key]: newValue
        });
        switch (key) {
            case 'women':
                dispatch(setWomen(newValue));
                break;
            case 'men':
                dispatch(setMen(newValue));
                break;
            case 'accessible':
                dispatch(setAccessible(newValue));
                break;
            case 'children':
                dispatch(setChildren(newValue));
                break;
            case 'free':
                dispatch(setFree(newValue));
                break;
            case 'genderNeutral':
                dispatch(setGenderNeutral(newValue));
                break;
        }
    };

    return (
        <div className='flex pb-5'>
            <ul className='flex flex-col'>
                {sidebarItems.map((item, index) => (
                    <li key={index * 10} className='pt-5 cursor-pointer hover:text-red-500'>
                        <span onClick={() => handleClick(item.click as "Filter" | "Add" | "Find" | "List")}>
                            {(showListView && item.lable2) ? item.lable2 : item.lable}
                        </span>
                        {item.click === "Filter" && filterState && (
                            <div className="mt-2 ml-4 text-black">
                                {checkboxItems.map((checkbox, idx) => (
                                    <label key={idx * 100} className="block">
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