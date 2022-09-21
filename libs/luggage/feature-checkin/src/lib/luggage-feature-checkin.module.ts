import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LuggageDomainModule } from '@flight-workspace/luggage/domain';
import { LuggageUiCardModule } from '@flight-workspace/luggage/ui-card';
import { CheckinComponent } from './checkin.component';

@NgModule({
  imports: [CommonModule, LuggageDomainModule,
    RouterModule.forChild([
      { path: '', component: CheckinComponent }
    ]),
    LuggageUiCardModule
  ],
  declarations: [CheckinComponent],
  exports: [CheckinComponent],
})
export class LuggageFeatureCheckinModule {
}
