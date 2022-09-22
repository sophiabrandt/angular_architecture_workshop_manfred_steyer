import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectFilteredFlights, selectFilteredFlightsWithParams, selectFlights, selectFlights2 } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(selectFilteredFlightsWithParams([5]));

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<FlightBookingAppStateSlice>,
    private flightService: FlightService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));
  }

  delay(): void {
    this.flightService.delay();
  }

}
