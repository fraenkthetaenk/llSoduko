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
      if(this.countType(i)==9){
        console.log("asd")
        this._elementRef.nativeElement.querySelector('[type="'+i+'"].wallet').classList.add("done")
      }
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
          document.querySelector('[row="'+tRow+'"][column="'+tCol+'"]').innerHTML=""
          alert("Can not be placed here")
        }
        else{
          this.rows[tRow].push(elType)
          this.columns[tCol].push(elType)
          this.squares[tSqr].push(elType)
        }
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

  clickTile(el){
    this._elementRef.nativeElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active")
    });
    let baseElement = el.target;
    if(baseElement.classList.contains("basic-tile")){
      // baseElement = baseElement.parentElement
      let type = baseElement.attributes.type.value
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
      this._elementRef.nativeElement.querySelectorAll('[type="1"]').forEach(element => {
       if(!element.classList.contains("wallet")){
        this.rows[element.parentElement.attributes.row.value].push(1);
        this.columns[element.parentElement.attributes.column.value].push(1);
        this.squares[element.parentElement.attributes.square.value].push(1);
       }
     });
     this._elementRef.nativeElement.querySelectorAll('[type="2"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(2);
       this.columns[element.parentElement.attributes.column.value].push(2);
       this.squares[element.parentElement.attributes.square.value].push(2);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="3"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(3);
       this.columns[element.parentElement.attributes.column.value].push(3);
       this.squares[element.parentElement.attributes.square.value].push(3);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="4"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(4);
       this.columns[element.parentElement.attributes.column.value].push(4);
       this.squares[element.parentElement.attributes.square.value].push(4);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="5"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(5);
       this.columns[element.parentElement.attributes.column.value].push(5);
       this.squares[element.parentElement.attributes.square.value].push(5);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="6"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(6);
       this.columns[element.parentElement.attributes.column.value].push(6);
       this.squares[element.parentElement.attributes.square.value].push(6);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="7"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(7);
       this.columns[element.parentElement.attributes.column.value].push(7);
       this.squares[element.parentElement.attributes.square.value].push(7);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="8"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(8);
       this.columns[element.parentElement.attributes.column.value].push(8);
       this.squares[element.parentElement.attributes.square.value].push(8);
      }
    });
    this._elementRef.nativeElement.querySelectorAll('[type="9"]').forEach(element => {
      if(!element.classList.contains("wallet")){
       this.rows[element.parentElement.attributes.row.value].push(9);
       this.columns[element.parentElement.attributes.column.value].push(9);
       this.squares[element.parentElement.attributes.square.value].push(9);
      }
    });
    this.checkdone()     
   }
    
  
  
}



