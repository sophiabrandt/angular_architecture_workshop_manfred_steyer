import { Component, OnInit } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as FlightBookingActions from '../+state/flight-booking.actions';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(s => s.flightBooking.flights);

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe({
        next: flights => {
          this.store.dispatch(FlightBookingActions.loadFlightBookings({ flights }));
        },
        error: error => {
          console.error('error', error);
        }
      });

  }

  delay(): void {
    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = flights[0];

      const oldDate = new Date(flight.date);
      const delayedDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: delayedDate.toISOString() };

      this.store.dispatch(FlightBookingActions.updateFlightBooking({ flight: newFlight }));
    });
  }

}
