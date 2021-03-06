import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import * as baseSodukos from "./../../assets/baseSodukos/baseSodukos.json"
import { element } from 'protractor';

@Component({
  selector: 'app-soduko',
  templateUrl: './soduko.component.html',
  styleUrls: ['./soduko.component.css']
})
export class SodukoComponent implements OnInit,AfterViewInit {

  selCOlor ="red"
  private baseSoduko = baseSodukos["default"];
  Math= Math;
  title = 'picSoduko';
  rows={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  columns={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  squares={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  currentlyMarked = 0;
  classLastAdded="";
  showHints= false;
 
  range =[1,2,3,4,5,6,7,8,9];
  groups = []
  sodukos = []
  selectedGroup ="muse"
  selectedGame ="1"

  subs = new Subscription();
  onGroupSelectChange(){
   this.sodukos =  Object.keys(this.baseSoduko[this.selectedGroup]["sodukos"]);
  }
  loadGame(){
    this.showHints =false;
    this._elementRef.nativeElement.querySelectorAll(".basic-tile.wallet").forEach(element=>{
      element.classList = "basic-tile wallet"
    })
    this._elementRef.nativeElement.querySelectorAll(".item").forEach(element=>{
      element.innerHTML = ""
    })
    Object.keys(this.baseSoduko[this.selectedGroup]["characters"]).forEach(element => {
      this.tiles[parseInt(element)-1] = this.baseSoduko[this.selectedGroup]["sodukos"][this.selectedGame][this.baseSoduko[this.selectedGroup]["characters"][element]["name"]]
    });
    this.allTile= this.tiles.flat();
    this.startRoutine()
  }
  countType(type){
    return this._elementRef.nativeElement.querySelectorAll('[type="'+type+'"]').length-1
  }
  checkdone(){
    for(let i =1; i<=9;i++){
      this.rows[i]=[]
      this.columns[i]=[]
      this.squares[i]=[]
    }
    this._elementRef.nativeElement.querySelectorAll('.wallet').forEach(element=>{element.classList.remove("done")})
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
    if(this.currentlyMarked>0){
      this.markTiles(this.currentlyMarked)
    }
  }

  solve(onlyShowNextSaveNumber=false, onlyShowNextSavePlace=false){
    let saveShowHints= this.showHints;
    this.showHints = true;
    let placedTile = true;
    let tileLocation = "";
    let tileType = "";
    let keepGoing = true;
    let notSovledTypes=document.querySelectorAll(".wallet:not(.done");
    while( placedTile && notSovledTypes.length>0 && keepGoing){
      placedTile = false
      notSovledTypes.forEach(element=>{
        if(!placedTile){
          this.markTiles(element.getAttribute("type"));
          for(let i = 1;i<=9;i++){
            if(document.querySelectorAll("[column='"+i+"']."+this.classLastAdded).length == 1){
              placedTile=true;
              let e=document.querySelector("[column='"+i+"']."+this.classLastAdded)
              let eR =e.getAttribute("row") 
              let eC= e.getAttribute("column")
              if(onlyShowNextSaveNumber ||onlyShowNextSavePlace){
                document.querySelectorAll("."+this.classLastAdded+":not(.wallet)").forEach(element=>{
                  element.classList.remove(this.classLastAdded)
                })
                if(onlyShowNextSaveNumber){
                  document.querySelector(".wallet[type='"+element.getAttribute("type")+"']").classList.add("active")
                }
                else{
                
                  document.querySelector('[row="'+eR+'"][column="'+eC+'"]').classList.add(this.classLastAdded)
                }
                keepGoing=false;
              }
              else{
                this._elementRef.nativeElement.querySelector('[row="'+eR+'"][column="'+eC+'"]').innerHTML= '<div type="'+element.getAttribute("type")+'" class="basic-tile '+this.selectedGroup+'"></div>'
              }
            }
          }
          if (!placedTile){
            for(let i = 1;i<=9;i++){
              if(document.querySelectorAll("[row='"+i+"']."+this.classLastAdded).length == 1){
                placedTile=true;
                let e=document.querySelector("[row='"+i+"']."+this.classLastAdded)
                let eR =e.getAttribute("row") 
                let eC= e.getAttribute("column")
                if(onlyShowNextSaveNumber ||onlyShowNextSavePlace){
                  document.querySelectorAll("."+this.classLastAdded+":not(.wallet)").forEach(element=>{
                    element.classList.remove(this.classLastAdded)
                  })
                  if(onlyShowNextSaveNumber){
                    document.querySelector(".wallet[type='"+element.getAttribute("type")+"']").classList.add("active")
                  }
                  else{
                  
                    document.querySelector('[row="'+eR+'"][column="'+eC+'"]').classList.add(this.classLastAdded)
                  }
                  keepGoing=false;
                }
                else{
                this._elementRef.nativeElement.querySelector('[row="'+eR+'"][column="'+eC+'"]').innerHTML= '<div type="'+element.getAttribute("type")+'" class="basic-tile '+this.selectedGroup+'"></div>'
              }
            }
            }
          }
          
          if(!placedTile){
            for(let i = 1;i<=9;i++){
              if(document.querySelectorAll("[square='"+i+"']."+this.classLastAdded).length == 1){
                placedTile=true;
                let e=document.querySelector("[square='"+i+"']."+this.classLastAdded)
                let eR =e.getAttribute("row") 
                let eC= e.getAttribute("column")
                if(onlyShowNextSaveNumber ||onlyShowNextSavePlace){
                  document.querySelectorAll("."+this.classLastAdded+":not(.wallet)").forEach(element=>{
                    element.classList.remove(this.classLastAdded)
                  })
                  if(onlyShowNextSaveNumber){
                    document.querySelector(".wallet[type='"+element.getAttribute("type")+"']").classList.add("active")
                  }
                  else{
                  
                    document.querySelector('[row="'+eR+'"][column="'+eC+'"]').classList.add(this.classLastAdded)
                  }
                  keepGoing=false;
                }
                else{
                this._elementRef.nativeElement.querySelector('[row="'+eR+'"][column="'+eC+'"]').innerHTML= '<div type="'+element.getAttribute("type")+'" class="basic-tile '+this.selectedGroup+'"></div>'
              }}
            }
          }
      }
      })
      
      if(keepGoing){
      this.checkdone();
      }
      notSovledTypes=document.querySelectorAll(".wallet:not(.done");
    }
    this.showHints =saveShowHints;
  }
  onlyShowNextSaveNumber(){
    this.solve(true,false)
  }
  onlyShowNextSavePlace(){
    this.solve(false,true)
  }
  tiles: Array<Number>[] = []
  
  allTile = [];

  constructor (dragularService: DragulaService,private _elementRef: ElementRef)
  {
    for(let i = 0 ;i <9;i++){
      this.tiles[i]=[]
    }
    this.groups = Object.keys(this.baseSoduko)
    this.selectedGroup = this.groups[0]
    this.sodukos = Object.keys(this.baseSoduko[this.selectedGroup]["sodukos"])
    this.selectedGame = this.sodukos[0]
    Object.keys(this.baseSoduko[this.selectedGroup]["characters"]).forEach(element => {
      this.tiles[parseInt(element)-1] = this.baseSoduko[this.selectedGroup]["sodukos"][this.selectedGame][this.baseSoduko[this.selectedGroup]["characters"][element]["name"]]
    });
    this.allTile= this.tiles.flat();
  
    console.log(this.groups)
    
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
    this.currentlyMarked = type;
    if(this.classLastAdded.length >0){
    this._elementRef.nativeElement.querySelectorAll(("."+this.classLastAdded)).forEach(element => {
      element.classList.remove(this.classLastAdded);
    });
  }
    this._elementRef.nativeElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");      
    });
    this.classLastAdded = this.baseSoduko[this.selectedGroup]["characters"][this.currentlyMarked]["name"]
    if(this.showHints){
    this._elementRef.nativeElement.querySelector('[type="'+type+'"].wallet').classList.add("active")
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
    this._elementRef.nativeElement.querySelectorAll(".item:not(.active):empty").forEach(element => {
      element.classList.add(this.classLastAdded )
    });
    
    for(let i = 1;i<=9;i++){
      let cColums = [];
      let cRows = [];
      this._elementRef.nativeElement.querySelectorAll("[square='"+i+"']."+this.classLastAdded).forEach(element =>{
        cColums.push(element.getAttribute("column"));
        cRows.push(element.getAttribute("row"))
      })

      cRows = ([ ... new Set(cRows)])
      cColums = ([ ... new Set(cColums)])
      
      if(cRows.length ==1){
        this._elementRef.nativeElement.querySelectorAll("."+this.classLastAdded+"[row='"+cRows[0]+"']:not([square='"+i+"'])").forEach(element => {
          element.classList.remove(this.classLastAdded)
        });
      }
      else{
        if(cColums.length ==1 )
        {
          this._elementRef.nativeElement.querySelectorAll("."+this.classLastAdded+"[column='"+cColums[0]+"']:not([square='"+i+"'])").forEach(element => {
            element.classList.remove(this.classLastAdded)
          });
        }

      }


    }
  }
    
  }
  
  clickHeaderTile(el){
    if(this.showHints){
    this.markTiles(el.target.getAttribute("type"))   
    }else{
      if(this.classLastAdded.length >0){
        this._elementRef.nativeElement.querySelectorAll(("."+this.classLastAdded)).forEach(element => {
          element.classList.remove(this.classLastAdded);
        });
      }
        this._elementRef.nativeElement.querySelectorAll(".active").forEach(element => {
          element.classList.remove("active");      
        });
    }
  }
  clickTile(el){
    if(this.showHints){
    let baseElement = el.target;
    if(baseElement.classList.contains("basic-tile")){
      this.markTiles(baseElement.attributes.type.value)
    }
    else{
      this._elementRef.nativeElement.querySelectorAll('.wallet').forEach(element=>{element.classList.add("active")});
      let all = []
      this._elementRef.nativeElement.querySelectorAll('[row="'+baseElement.attributes.row.value+'"]>.basic-tile').forEach(element => {
        all.push(parseInt(element.attributes.type.value.toString()))
      });
      this._elementRef.nativeElement.querySelectorAll('[column="'+baseElement.attributes.column.value+'"]>.basic-tile').forEach(element => {
        all.push(parseInt(element.attributes.type.value.toString()))
      });
      this._elementRef.nativeElement.querySelectorAll('[square="'+baseElement.attributes.square.value+'"]>.basic-tile').forEach(element => {
        if(all.indexOf(parseInt(element.attributes.type.value.toString()))==-1){
          all.push(parseInt(element.attributes.type.value.toString()))
        }
      });
      all = ([ ... new Set(all)])
      all.forEach(element => {
        this._elementRef.nativeElement.querySelector('[type="'+element.toString()+'"].wallet').classList.remove("active")
      })
    }
    // else{
    //   this._elementRef.nativeElement.querySelectorAll('[row="'+baseElement.attributes.row.value+'"]').forEach(element => {
    //     element.classList.add("active")  
    //   });
      
    //   this._elementRef.nativeElement.querySelectorAll('[column="'+baseElement.attributes.column.value+'"]').forEach(element => {
    //     element.classList.add("active")  
    //   });
    // }
  }
  else{
    if(this.classLastAdded.length >0){
      this._elementRef.nativeElement.querySelectorAll(("."+this.classLastAdded)).forEach(element => {
        element.classList.remove(this.classLastAdded);
      });
    }
      this._elementRef.nativeElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");      
      });
  }

  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }

  populateDefault(){
    this._elementRef.nativeElement.querySelectorAll(".basic-tile.wallet").forEach(element=>{
      element.classList.add(this.selectedGroup)
    })
    Object.keys(this.baseSoduko[this.selectedGroup]["characters"]).forEach(element => {
      this.baseSoduko[this.selectedGroup]["sodukos"][this.selectedGame][this.baseSoduko[this.selectedGroup]["characters"][element]["name"]].forEach(e =>{
        this._elementRef.nativeElement.querySelector('[row="'+e[0]+'"][column="'+e[1]+'"]').innerHTML= '<div type="'+element+'" class="basic-tile '+this.selectedGroup+'"></div>'
      })

    });
  }

  startRoutine(){
    this.populateDefault()
    this.checkdone()
  }

   ngAfterViewInit(){
     this.startRoutine()
   }
  ngOnInit(): void {
  }

}
