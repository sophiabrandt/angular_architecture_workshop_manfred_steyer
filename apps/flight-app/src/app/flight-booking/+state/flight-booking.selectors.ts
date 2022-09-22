import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights3 = createSelector(
  selectFlightBookingState,
  (fbs) => fbs.flights
);

export const selectSkipList = createSelector(
  selectFlightBookingState,
  (fbs) => fbs.skip
);

export const selectFilteredFlights2 = createSelector(
  selectFlights3,
  selectSkipList,
  (flights, skip) => flights.filter(f => !skip.includes(f.id))
);

export const selectFlights =
  (appState: FlightBookingAppStateSlice) => 
    appState[flightBookingFeatureKey].flights;


export const selectFlights2 = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (flights) => flights.filter(f => f.id % 2 === 0)
);


export const selectFilteredFlights = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].skip,
  (flights, skip) => flights.filter(f => !skip.includes(f.id))
);

export function selectFilteredFlightsWithParams(skip: number[]) {
  return createSelector(
    (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
    (flights) => flights.filter(f => !skip.includes(f.id))
  );
  
}
