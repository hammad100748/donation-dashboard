import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { Donation } from '../../interfaces/donation';
import { Project } from '../../interfaces/project';
import { ReturnStatement } from '@angular/compiler';
import * as XLSX from 'xlsx';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-finish-project',
  templateUrl: './finish-project.component.html',
  styleUrls: ['./finish-project.component.css']
})
export class FinishProjectComponent implements OnInit {

  constructor(private _fireStore: FirestoreService, private _router: Router, private spinnerService: Ng4LoadingSpinnerService) { }
  currentProject: Project;
  donations: Donation[];
  ngOnInit() {
    this.createFileName();
    this._fireStore.getCurrentProject().subscribe(project => {
      this.currentProject = project;
      this.getAllDonations(this.currentProject.id);
    });
  }

  getAllDonations(id) {
    this._fireStore.getAllDonations(id)
      .subscribe((donations) => {
        this.donations = donations;
        console.log(this.donations);
      });
  }

  exportTable() {
    this.spinnerService.show();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getDonations());
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Donations');
    /* save to file */
    XLSX.writeFile(wb, this.createFileName());
    this.spinnerService.hide();
  }

  getDonations() {
    return this.donations.map((d: Donation) => {
      return { title: d.sur, name: d.name, amount: d.amount, category: this.filterCategory(d.category).value }
    });
  }

  filterCategory(cat) {
    let category = this.currentProject.categories.filter(t => t.id == cat);
    return category[0];
  }

  createFileName() {
    let date = new Date().toDateString();
    return date + '.xlsx';
  }

  logout() {
    if (confirm("Are you sure to logout & clear data")) {
      this.spinnerService.show();
      this._fireStore.signOut();
    }
  }

  simpleLogout(){
    this.spinnerService.show();
    this._fireStore.simpleLogout();
  }
}
