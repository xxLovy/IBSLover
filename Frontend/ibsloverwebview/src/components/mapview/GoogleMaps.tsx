"use client"
import React, { useRef, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setMapRef } from '@/redux/mapSlice';
import { RootState } from '@/redux/store';
import { selectCurrentLocation } from '@/redux/pin/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
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
    }, [pin])

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
            </>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent);
