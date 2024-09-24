import { configureStore } from '@reduxjs/toolkit'
import { pinReducer } from './pin/slice'
import { filterReducer } from './filter/slice';
import { toiletReducer } from './googleMapsPlaces/slice';
import { userReducer } from './auth/slice';
import { stateManageReducer } from './stateManage/slice';

export const store = configureStore({
    reducer: {
        pin: pinReducer,
        filter: filterReducer,
        toilet: toiletReducer,
        user: userReducer,
        stateManage: stateManageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


