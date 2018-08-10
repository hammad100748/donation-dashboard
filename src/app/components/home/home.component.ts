import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { FirestoreService } from '../../services/firestore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _fireStore:FirestoreService,private _router:Router,private spinnerService: Ng4LoadingSpinnerService) { }
  currentProject:Project;
  allProjects:Project[];
  loading=true;
  ngOnInit() {
    this.spinnerService.hide();
    this._fireStore.getCurrentProject()
    .subscribe((project)=>{
      if(project)
      this.currentProject=project;
    });

    this._fireStore.getAllProjects()
    .subscribe((projects)=>{
      if(projects.length>0)
      this.allProjects=projects;
      this.loading=false;
    });
  }

}
