"use client"
import React, { useRef, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { setMapRef } from '@/redux/mapSlice';
import { RootState } from '@/redux/store';
import { selectCurrentLocation, selectSuccess } from '@/redux/pin/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { dummyToilets } from '../../../constants';
import ToiletCard from '../ToiletCard';
import { IFilter, selectFilterState } from '@/redux/filter';
import { fetchToiletFromGoogle, fetchToiletFromUser } from '@/redux/toilet/operations';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { calculateDistance } from '@/lib/distance';


const containerStyle = {
    width: '100vw',
    height: '85vh'
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};

export function MyComponent() {
    const mapRef = useRef<google.maps.Map | null>(null);
    const dispatch = useAppDispatch();
    const mapReduxRef = useAppSelector((state: RootState) => state.map.mapRef);
    const pin = useAppSelector(selectCurrentLocation)
    // const toilets = dummyToilets
    const toiletsFromUser = useAppSelector(selectToiletFromUser)
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle)
    let toilets = toiletsFromUser.concat(toiletsFromGoogle)
    const toiletsWithDistance: Toilet[] = toilets.map((item) => {
        const newToilet: Toilet = {
            ...item,
            distance: calculateDistance(pin.latitude, pin.longitude, item.location.coordinates[1], item.location.coordinates[0])
        }
        return newToilet
    })
    toiletsWithDistance.sort((a, b) => a.distance! - b.distance!);
    toilets = toiletsWithDistance
    const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
    const toiletFilter = useAppSelector(selectFilterState)
    const isSuccessful = useAppSelector(selectSuccess)
    const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    function handleToiletClick(toilet: Toilet): void {
        setSelectedToilet(toilet);
        mapReduxRef?.panTo({ lat: toilet.location.coordinates[1], lng: toilet.location.coordinates[0] })
    }
    function handleCloseToilet(): void {
        setSelectedToilet(null)
    }

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        dispatch(fetchToiletFromUser())
        dispatch(fetchToiletFromGoogle({ latitude: pin.latitude, longitude: pin.longitude }))
        mapRef.current = map;
        dispatch(setMapRef(map));
        setMap(map);
    }, [dispatch]);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
        dispatch(setMapRef(null));
    }, [dispatch]);

    useEffect(() => {
        if (mapReduxRef) {
            mapReduxRef.setCenter(center);
            mapReduxRef.setZoom(15);
        }
    }, [mapReduxRef]);

    useEffect(() => {
        mapReduxRef?.panTo({ lat: pin.latitude, lng: pin.longitude })
        if (isSuccessful) {
            dispatch(fetchToiletFromGoogle({ latitude: pin.latitude, longitude: pin.longitude }))
        }
    }, [pin])

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

        const filtered = applyFilters(toilets, toiletFilter);
        setFilteredToilets(filtered);
    }, [toiletsFromUser, toiletsFromGoogle, toiletFilter])
    const MarkerGoogle = '/MarkerGoogle.svg';
    const MarkerUser = '/MarkerUser.svg'

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
                <Marker position={{ lat: pin.latitude, lng: pin.longitude }} />
                {filteredToilets.map((item: Toilet, index) => (
                    <Marker position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }} onClick={() => handleToiletClick(item)} icon={item.isFromUser ? MarkerUser : MarkerGoogle} />
                ))}
                {selectedToilet ? (
                    <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
                ) : null}
            </>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent);
