import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Math= Math;
  title = 'picSoduko';
  row1=[];
  column1=[];
  sqaure1=[];
  row2=[];
  column2=[];
  sqaure2=[];
  row3=[];
  column3=[];
  sqaure3=[];
  row4=[];
  column4=[];
  sqaure4=[];
  row5=[];
  column5=[];
  sqaure5=[];
  row6=[];
  column6=[];
  sqaure6=[];
  row7=[];
  column7=[];
  sqaure7=[];
  row8=[];
  column8=[];
  sqaure8=[];
  row9=[];
  column9=[];
  sqaure9=[];
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
  .concat(this.tile9)
}



