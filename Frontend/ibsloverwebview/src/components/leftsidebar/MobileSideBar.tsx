"use client";
import React, { useState } from 'react'
import SearchBox from './SearchBox'
import { Button } from '../ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { checkboxItems } from '../../../constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setWomen, setMen, setAccessible, setChildren, setFree, setGenderNeutral } from '@/redux/filter'
import { selectListState, setListStateReverse } from '@/redux/listView';


const MobileSideBar = () => {
    const dispatch = useAppDispatch();
    const showListView = useAppSelector(selectListState)

    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
        women: false,
        men: false,
        accessible: false,
        children: false,
        free: true,
        genderNeutral: false,
    });

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
    const handleList = () => {
        dispatch(setListStateReverse());
    };

    return (
        <div>
            <div>
                <SearchBox />
            </div>
            <div className='py-2'>
                <Sheet>
                    <SheetTrigger className='bg-black rounded-md h-10'><span className='text-white m-5'>Filter</span></SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Choose a filter</SheetTitle>
                        </SheetHeader>
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
                    </SheetContent>
                </Sheet>

                <Button onClick={() => handleList()}> <span>{showListView ? "Hide List View" : "Show List View"}</span> </Button>

            </div>

        </div>
    )
}

export default MobileSideBar