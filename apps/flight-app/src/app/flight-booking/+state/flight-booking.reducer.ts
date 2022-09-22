import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppStateSlice {
  [flightBookingFeatureKey]: FlightBookingState
}

export interface FlightBookingState {
  flights: Flight[];
  basket: object;
  stats: object;
  skip: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  stats: {},
  skip: [4],
/*
  [FE] ---> [BFF] ----> [BE]
  flights: {

    1: { ...  },
    10: { ... },
    52: { ... }
  },
  tickets: {
    10: { id:10, passenger: 100, flight: 1},
    20: {},
    30: {}
  },
 passenger: {
    100: { id: 100, name: 'Smith', firstName: 'Anne' },
  },
  bookings: [
    { passengerId: 1, flightId: 3 },
    { passengerId: 1, flightId: 5 },
  ],
  user: { name: 'anne.smith', passengerId: 1 },

*/
};

export const reducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights;

    // Don't mutate your state
    // state.flights = flights;

    return { ...state, flights };

  }),

  on(updateFlight, (state, action) => {
    const flight = action.flight;

    const flights = state.flights.map(f => f.id === flight.id ? flight : f);

    // Don't mutate your state
    // state.flights[1] = flight;
    // state.flights = flights;

    return { ...state, flights };
  }),

);
