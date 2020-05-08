import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula';
import { SodukoComponent } from './soduko/soduko.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SodukoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragulaModule.forRoot(),FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}


