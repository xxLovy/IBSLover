import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface MapRefRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface StateManageState {
  hasListView: boolean;
  mapRefRegion: MapRefRegion;
  selectedMarker: any | null;
}

const initialState: StateManageState = {
  hasListView: true,
  mapRefRegion: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
  selectedMarker: null,
};

export const stateManageSlice = createSlice({
  name: 'stateManage',
  initialState,
  reducers: {
    setListView: (state) => {
      state.hasListView = !state.hasListView;
    },
    setMapRefRegion: (state, action: PayloadAction<MapRefRegion>) => {
      state.mapRefRegion = action.payload;
    },
    setSelectedMarker: (state, action: PayloadAction<any>) => {
      state.selectedMarker = action.payload;
    },
  },
});

export const { setListView, setMapRefRegion, setSelectedMarker } =
  stateManageSlice.actions;
export const stateManageReducer = stateManageSlice.reducer;

export const selectHasListView = (state: RootState) => state.stateManage.hasListView;
export const selectMapRefRegion = (state: RootState) => state.stateManage.mapRefRegion;
export const selectSelectedMarker = (state: RootState) => state.stateManage.selectedMarker;
