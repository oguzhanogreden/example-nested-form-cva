import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDayComponent } from './form-day/form-day.component';
import { FormPeriodComponent } from './form-period/form-period.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormDayComponent,
    FormPeriodComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
