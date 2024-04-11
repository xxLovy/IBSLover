import { configureStore } from '@reduxjs/toolkit'
import { pinReducer } from './pin/slice'

export const store = configureStore({
    reducer: {
        pin: pinReducer,
    },
})

