import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { FirestoreService } from '../../services/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-screen-three',
  templateUrl: './screen-three.component.html',
  styleUrls: ['./screen-three.component.css']
})
export class ScreenThreeComponent implements OnInit {
  project:Project;
  numCat;
  transformY;
  x='$';
  constructor(private _fireStore:FirestoreService,private _sanitizer: DomSanitizer) { }
 
  ngOnInit() {
    
    this._fireStore.getCurrentProject()
    .subscribe((project)=>{
      if(project){
        console.log(project);
        this.project=project;
        if(this.project.categories.length===3){
          this.numCat=4;
          this.transformY='-35%';
        }else if(this.project.categories.length===4){
          this.numCat=3;
          this.transformY='-40%';
        }else if(this.project.categories.length===2){
          this.numCat=6;
          this.transformY='-20%';
        }else{
          this.numCat=12;
          this.transformY='-20%';
        }
      }else{ 
        this.project.category1Total=0; 
        this.project.category2Total=0;
        this.project.category3Total=0;
        this.project.category4Total=0;
      }      
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

} 
