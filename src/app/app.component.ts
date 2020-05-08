import { Component,ElementRef, ViewChildren, AfterViewInit, Renderer2 } from '@angular/core';

import { Subscription } from 'rxjs';

import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  Math= Math;
  title = 'picSoduko';
  rows={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  columns={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  squares={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
 
  range =[1,2,3,4,5,6,7,8,9];
  tile1 = ["21","38","76"];//chika
  tile2 = ["29","58","85","91"];//dia
  tile3 = ["44"];//hanamaru
  tile4 = ["15","56","67","73"];//kanan
  tile5 = ["47","53","79","82"];//mari
  tile6 = ["24","96"];//riko
  tile7 = ["62","71","99"];//ruby
  tile8 = ["13","27","42","65","94"];//yoshiko
  tile9 = ["18","33","51"];//you
  allTile = this.tile1.concat(this.tile2)
  .concat(this.tile3)
  .concat(this.tile4)
  .concat(this.tile5)
  .concat(this.tile6)
  .concat(this.tile7)
  .concat(this.tile8)
  .concat(this.tile9);

  subs = new Subscription();

  countType(type){
    return this._elementRef.nativeElement.querySelectorAll('[type="'+type+'"]').length-1
  }
  checkdone(){
    for(let i =1; i<=9;i++){
      this.rows[i]=[]
      this.columns[i]=[]
      this.squares[i]=[]
    }
    for(let i =1; i<=9;i++){
      if(this.countType(i)==9){
        this._elementRef.nativeElement.querySelector('[type="'+i+'"].wallet').classList.add("done")
      }
      
      this._elementRef.nativeElement.querySelectorAll('[type="'+i+'"]').forEach(element => {
        if(!element.classList.contains("wallet")){
          this.rows[element.parentElement.attributes.row.value].push(i);
          this.columns[element.parentElement.attributes.column.value].push(i);
          this.squares[element.parentElement.attributes.square.value].push(i);
        }
      });
    }
  }

 

  constructor (dragularService: DragulaService,private _elementRef: ElementRef)
  {

    dragularService.createGroup("Tiles", {
      copy: function (el, source) {
       
        return source.id === "tile-grid";
      },
      removeOnSpill:true,
      accepts: function (el, target) {
        return target !== document.getElementById("tile-grid")
      },
    }
    )


    this.subs.add(dragularService.drop("Tiles")
      .subscribe(({ name, el, target, source, sibling }) => {
        let elType = parseInt(el.getAttribute("type"))
        let tRow =target.getAttribute("row")
        let tCol=target.getAttribute("column")
        let tSqr=target.getAttribute("square")
        if (el.classList.value.includes("wallet"))
        {
          el.classList.remove("wallet")
        }else{
          let sRow =source.getAttribute("row")
          let sCol=source.getAttribute("column")
          let sSqr=source.getAttribute("square")
          this.rows[sRow].splice(this.rows[sRow].indexOf(elType),1)
          this.columns[sCol].splice(this.columns[sCol].indexOf(elType),1)
          this.squares[sSqr].splice(this.squares[sSqr].indexOf(elType),1)
        }
        if (this.rows[tRow].indexOf(elType)>=0 ||this.columns[tCol].indexOf(elType)>=0 ||this.squares[tSqr].indexOf(elType)>=0)
        {
          alert("Can not be placed here")
          document.querySelector('[row="'+tRow+'"][column="'+tCol+'"]>.basic-tile[type="'+elType+'"]').remove()
        }else{
        if(document.querySelectorAll('[row="'+tRow+'"][column="'+tCol+'"]>.basic-tile').length >1){
          document.querySelector('[row="'+tRow+'"][column="'+tCol+'"]>.basic-tile:not([type="'+elType+'"])').remove()
        }}
        this.checkdone()
        
      })
    );
    
    this.subs.add(dragularService.remove("Tiles").subscribe(({el, container, source})=>{
      let elType = parseInt(el.getAttribute("type"))
      let sRow =source.getAttribute("row")
      let sCol=source.getAttribute("column")
      let sSqr=source.getAttribute("square")
      this.rows[sRow].splice(this.rows[sRow].indexOf(elType),1)
      this.columns[sCol].splice(this.columns[sCol].indexOf(elType),1)
      this.squares[sSqr].splice(this.squares[sSqr].indexOf(elType),1)
      this.checkdone()
    }));


  }
  markTiles(type){
    this._elementRef.nativeElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active")
    });
    this._elementRef.nativeElement.querySelectorAll('[type="'+type+'"]:not(.wallet)').forEach(e=>{
      this._elementRef.nativeElement.querySelectorAll('[row="'+e.parentElement.attributes.row.value+'"]').forEach(element => {
        element.classList.add("active")
      });
      this._elementRef.nativeElement.querySelectorAll('[column="'+e.parentElement.attributes.column.value+'"]').forEach(element => {
        element.classList.add("active")  
      });
      this._elementRef.nativeElement.querySelectorAll('[square="'+e.parentElement.attributes.square.value+'"]').forEach(element => {
        element.classList.add("active")  
      });
     
    })
  }
  
  clickHeaderTile(el){
    this.markTiles(el.target.getAttribute("type"))   
  }
  clickTile(el){

    let baseElement = el.target;
    if(baseElement.classList.contains("basic-tile")){
      // baseElement = baseElement.parentElement
      this.markTiles(baseElement.attributes.type.value)
    }
    else{
      this._elementRef.nativeElement.querySelectorAll('[row="'+baseElement.attributes.row.value+'"]').forEach(element => {
        element.classList.add("active")  
      });
      
      this._elementRef.nativeElement.querySelectorAll('[column="'+baseElement.attributes.column.value+'"]').forEach(element => {
        element.classList.add("active")  
      });
    }
  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }
   ngAfterViewInit(){
    this.checkdone()     
   }
    
  
  
}



