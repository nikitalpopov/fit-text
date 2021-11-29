import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { InputAreaComponent } from './input-area/input-area.component'
import { AngularMaterialModule } from './material.module'
import { PresentationAreaComponent } from './presentation-area/presentation-area.component'
import { FitDirective } from './fit.directive'

@NgModule({
  declarations: [
    AppComponent,
    InputAreaComponent,
    PresentationAreaComponent,
    FitDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
