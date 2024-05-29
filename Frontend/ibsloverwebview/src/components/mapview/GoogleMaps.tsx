"use client"
import React, { useRef, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { setMapRef } from '@/redux/mapSlice';
import { RootState } from '@/redux/store';
import { selectCurrentLocation, selectSuccess } from '@/redux/pin/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { dummyToilets } from '../../../constants';
import ToiletCard from '../ToiletCard';
import { selectFilterState } from '@/redux/filter';
import { fetchToiletFromGoogle } from '@/redux/toilet/operations';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';

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
    const toilets = toiletsFromUser.concat(toiletsFromGoogle)
    const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
    const filter = useAppSelector(selectFilterState)
    const isSuccessful = useAppSelector(selectSuccess)

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

    useEffect(() => { }, [filter])

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
                {toilets.map((item: Toilet, index) => (
                    <Marker position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }} onClick={() => handleToiletClick(item)} />
                ))}
                {selectedToilet ? (
                    <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
                ) : null}
            </>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent);
