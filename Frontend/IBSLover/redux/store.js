import { configureStore } from '@reduxjs/toolkit'
import { pinReducer } from './pin/slice'
import { googlePlacesReducer } from './googleMapsPlaces/slice'
import { stateManageReducer } from './stateManage/slice'
import { userPlacesReducer } from './userCreatedPlaces/slice'
import { filterReducer } from './filter/slice'

export const store = configureStore({
    reducer: {
        pin: pinReducer,
        googlePlaces: googlePlacesReducer,
        stateManage: stateManageReducer,
        userPlaces: userPlacesReducer,
        filter: filterReducer,
    },
})

