"use client"
import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyToilets } from '../../../constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateFalse } from '@/redux/listView';
import ToiletCard from '../ToiletCard'; import { RootState } from '@/redux/store';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { selectCurrentLocation } from '@/redux/pin/slice';
import { calculateDistance } from '@/lib/distance';
import { IFilter, selectFilterState } from '@/redux/filter';
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
    const pin = useAppSelector(selectCurrentLocation);
    const toiletsWithDistance: Toilet[] = toilets.map((item) => {
        const newToilet: Toilet = {
            ...item,
            distance: calculateDistance(pin.latitude, pin.longitude, item.location.coordinates[1], item.location.coordinates[0])
        }
        return newToilet
    })
    toiletsWithDistance.sort((a, b) => a.distance! - b.distance!);
    const toiletFilter = useAppSelector(selectFilterState)
    const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);


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

    useEffect(() => {
        const applyFilters = (toilets: Toilet[], filter: IFilter) => {
            return toilets.filter(toilet => {
                if (toilet.isFromUser) {
                    return (
                        (!filter.women || toilet.features?.women) &&
                        (!filter.men || toilet.features?.men) &&
                        (!filter.accessible || toilet.features?.accessible) &&
                        (!filter.children || toilet.features?.children) &&
                        (!filter.free || toilet.features?.free) &&
                        (!filter.genderNeutral || toilet.features?.genderNeutral)
                        // && (toilet.votesCount >= filter.voteCount) &&
                        // (filter.keyword.length === 0 || filter.keyword.some(keyword => toilet.keywords.includes(keyword)))
                    );
                } else {
                    return true
                }

            });
        };

        const filtered = applyFilters(toiletsWithDistance, toiletFilter);
        setFilteredToilets(filtered);
    }, [toiletsFromUser, toiletsFromGoogle, toiletFilter])

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
                        <ToiletComponent toilets={filteredToilets} onToiletClick={handleToiletClick} />
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
                    <li>Distance: {item.distance && item.distance * 1000} meters</li>
                </ul>
            ))}
        </div>
    );
};

export default ListView;
