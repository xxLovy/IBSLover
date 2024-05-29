"use client"
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyToilets } from '../../../constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateFalse } from '@/redux/listView';
import ToiletCard from '../ToiletCard'; import { RootState } from '@/redux/store';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
;

interface ToiletComponentProps {
    toilets: Toilet[];
    onToiletClick: (toilet: Toilet) => void;
}

export const ListView: React.FC = () => {
    // const toilets = dummyToilets;
    const toiletsFromUser = useAppSelector(selectToiletFromUser)
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle)
    const toilets = toiletsFromUser.concat(toiletsFromGoogle)
    const dispatch = useAppDispatch();
    const listState = useAppSelector(selectListState);
    const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
    const mapReduxRef = useAppSelector((state: RootState) => state.map.mapRef);

    function handleClose(): void {
        dispatch(setListStateFalse());
    }

    function handleToiletClick(toilet: Toilet): void {
        setSelectedToilet(toilet);
        mapReduxRef?.panTo({ lat: toilet.location.coordinates[1], lng: toilet.location.coordinates[0] })
    }

    function handleCloseToilet(): void {
        setSelectedToilet(null)
    }

    return (
        <>
            {listState ? (
                <div className='relative w-[400px] bg-white rounded-2xl pt-5 pl-3 flex flex-col border-2'>
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full z-10"
                    >
                        ✕
                    </button>
                    <ScrollArea className="h-96">
                        <ToiletComponent toilets={toilets} onToiletClick={handleToiletClick} />
                    </ScrollArea>
                </div>
            ) : null}
            {selectedToilet ? (
                <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
            ) : null}
        </>
    );
};

const ToiletComponent: React.FC<ToiletComponentProps> = ({ toilets, onToiletClick }) => {
    return (
        <div className="space-y-4">
            {toilets.map((item, index) => (
                <ul
                    key={item._id}
                    className={`p-5 pr-10 ${index !== 0 ? 'border-t border-gray-300' : ''} cursor-pointer hover:bg-gray-200`}
                    onClick={() => onToiletClick(item)}
                >
                    <li className="font-bold">{item.name}</li>
                    <li className="text-gray-600">{item.description}</li>
                </ul>
            ))}
        </div>
    );
};

export default ListView;
