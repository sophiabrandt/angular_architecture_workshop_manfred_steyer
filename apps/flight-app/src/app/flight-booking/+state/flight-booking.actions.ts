import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const loadFlightBookings = createAction(
  '[FlightBooking] Load FlightBookings',
  props<{flights: Flight[]}>()
);

export const updateFlightBooking = createAction(
  '[FlightBooking] Update FlightBooking',
  props<{flight: Flight}>()
);




