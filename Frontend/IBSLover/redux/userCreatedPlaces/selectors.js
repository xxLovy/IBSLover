export const selectCurrentLocation = (state) => [state.pin.latitude, state.pin.longitude];

export const selectIsLoading = (state) => state.pin.isLoading;
