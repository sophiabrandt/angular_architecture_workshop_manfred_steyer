import { Flight } from '@flight-workspace/flight-lib';
import { on } from '@ngrx/store';
import { createImmerReducer, immerOn} from 'ngrx-immer/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
}

export interface FlightBookingAppState {
  flightBooking: State;
}

export const initialState: State = {
  flights: []
};

export const reducer = createImmerReducer(
  initialState,

  on(FlightBookingActions.loadFlightBookings, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  immerOn(FlightBookingActions.updateFlightBooking, (state, action) => {
    const flight = action.flight;
    state.flights = state.flights.map(f => f.id === flight.id? flight: f);
  }),
);
