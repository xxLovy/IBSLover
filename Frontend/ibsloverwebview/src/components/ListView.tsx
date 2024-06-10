"use client"
import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateFalse } from '@/redux/listView';
import ToiletCard from './ToiletCard';
import { RootState } from '@/redux/store';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { selectCurrentLocation } from '@/redux/pin/slice';
import { calculateDistance } from '@/lib/distance';
import { IFilter, selectFilterState } from '@/redux/filter';

interface ToiletComponentProps {
    toilets: Toilet[];
    onToiletClick: (toilet: Toilet) => void;
    className: string;
}

const ToiletComponent: React.FC<ToiletComponentProps> = ({ toilets, onToiletClick, className }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {toilets.map((item, index) => (
                <ul
                    key={item._id}
                    className={`p-5 pr-10 ${index !== 0 ? 'border-t border-gray-300' : ''} cursor-pointer hover:bg-gray-200`}
                    onClick={() => onToiletClick(item)}
                >
                    <li className={`font-bold ${!item.isFromUser ? "text-black" : "text-blue-900"}`}>{item.name}</li>
                    <li className="text-gray-600">{item.description}</li>
                    <li>Distance: {item.distance && item.distance * 1000} meters</li>
                </ul>
            ))}
        </div>
    );
};

export const ListView: React.FC = () => {
    const dispatch = useAppDispatch();
    const toiletsFromUser = useAppSelector(selectToiletFromUser);
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle);
    const toilets = toiletsFromUser.concat(toiletsFromGoogle);
    const listState = useAppSelector(selectListState);
    const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
    const mapReduxRef = useAppSelector((state: RootState) => state.map.mapRef);
    const pin = useAppSelector(selectCurrentLocation);
    const toiletFilter = useAppSelector(selectFilterState);
    const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);

    const toiletsWithDistance: Toilet[] = toilets.map((item) => ({
        ...item,
        distance: calculateDistance(pin.latitude, pin.longitude, item.location.coordinates[1], item.location.coordinates[0]),
    }));

    toiletsWithDistance.sort((a, b) => a.distance! - b.distance!);

    function handleClose(): void {
        dispatch(setListStateFalse());
    }

    function handleToiletClick(toilet: Toilet): void {
        setSelectedToilet(toilet);
        mapReduxRef?.panTo({ lat: toilet.location.coordinates[1], lng: toilet.location.coordinates[0] });
    }

    function handleCloseToilet(): void {
        if (selectedToilet !== null) {
            setSelectedToilet(null);
        }
    }

    useEffect(() => {
        const applyFilters = (toilets: Toilet[], filter: IFilter) => {
            return toilets.filter(toilet => {
                if (toilet.isFromUser && toilet.features) {
                    return (
                        ((filter.women && (toilet.features.women === "yes" || toilet.features.women === "dontknow")) || !filter.women) &&
                        ((filter.men && (toilet.features.men === "yes" || toilet.features.men === "dontknow")) || !filter.men) &&
                        ((filter.accessible && (toilet.features.accessible === "yes" || toilet.features.accessible === "dontknow")) || !filter.accessible) &&
                        ((filter.children && (toilet.features.children === "yes" || toilet.features.children === "dontknow")) || !filter.children) &&
                        ((filter.free && (toilet.features.free === "yes" || toilet.features.free === "dontknow")) || !filter.free) &&
                        ((filter.genderNeutral && (toilet.features.genderNeutral === "yes" || toilet.features.genderNeutral === "dontknow")) || !filter.genderNeutral)
                    );
                } else {
                    return true;
                }
            });
        };

        const filtered = applyFilters(toiletsWithDistance, toiletFilter);
        setFilteredToilets(filtered);
    }, [toiletsFromUser, toiletsFromGoogle, toiletFilter, toiletsWithDistance]);

    return (
        <div>
            {listState ? (
                <div>
                    <div className='hidden md:block'>
                        <div className='relative w-[400px] bg-white rounded-2xl pt-5 pl-3 flex flex-col border-2'>
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full z-10"
                            >
                                ✕
                            </button>
                            <ScrollArea className="h-96">
                                <ToiletComponent toilets={filteredToilets} onToiletClick={handleToiletClick} className='hidden md:block' />
                            </ScrollArea>
                        </div>
                    </div>
                    <div className='flex md:hidden w-full h-auto bg-white rounded-2xl pt-5 pl-3 flex-col border-2'>
                        <ScrollArea className="w-full h-[24vh]">
                            <ToiletComponent toilets={filteredToilets} onToiletClick={handleToiletClick} className='block md:hidden' />
                        </ScrollArea>
                    </div>
                </div>
            ) : null}
            {selectedToilet ? (
                <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
            ) : null}
        </div>
    );
};

export default ListView;
