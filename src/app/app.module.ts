import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (private dragularService: DragulaService)
  {
    dragularService.createGroup("Tiles", {
      copy: function (el, source) {
        return source.id === "tile-grid";
      },
      removeOnSpill:true,
      accepts: function (el, target) {
        console.log(target.id)
        return target !== document.getElementById("tile-grid")
      }
      // drop:
    }
    )
  }

}


