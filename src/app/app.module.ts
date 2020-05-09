import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula';
import { SodukoComponent } from './soduko/soduko.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from "@angular/material/select"
import {MatSlideToggleModule} from "@angular/material/slide-toggle"
import {MatButtonModule} from "@angular/material/button"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatDividerModule} from "@angular/material/divider"
import {MatCardModule} from "@angular/material/card"
@NgModule({
  declarations: [
    AppComponent,
    SodukoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragulaModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,         
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}


