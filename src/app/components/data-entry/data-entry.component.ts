import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Donation } from '../../interfaces/donation';
import { FirestoreService } from '../../services/firestore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {


  donation: Donation;
  categories: string[];
  project: Project;
  total_donation = 0;
  model;

  constructor(private _fireStore: FirestoreService,
    private spinnerService: Ng4LoadingSpinnerService,
    private _flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private _router: Router) {
    this.model = {
      sur: "הרב"
    };
    this.donation = {
      category: '1'
    };
  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this._router.navigate(['/']);
      return;
    }
    this.spinnerService.hide();

    this._fireStore.getCurrentProject().subscribe((project) => {
      if (project) {
        this.project = project;
        this.categories = this.project.categories;
      } else {
        this._fireStore.simpleLogout();
      }
    });
  }

  changeCategory(value) {
    this.donation.category = value;
  }
  error = false;
  submitDonation(myForm) {
    if (!localStorage.getItem('user')) {
      this._router.navigate(['/']);
      this._flashMessagesService.show('Project Has Been Finished Logged Out!', { cssClass: 'alert-success', timeout: 2000 });
      return;
    }
    let values = myForm.value;
    if (values.name !== "" && values.amount !== '' && values.name !== null && values.amount !== null) {
      this.error = false;
      if (values.sur == 'other') {
        this.donation.sur = values.otherText;
      } else
        this.donation.sur = values.sur;
      console.log(values.amount);

      this.donation.name = values.name;
      this.donation.amount = values.amount;
      const createdAt = new Date();
      this.donation.createdAt = createdAt;
      // Calculating Total Donation
      this.project.totalDonation += values.amount;
      // Calculating Categories Total
      if (this.donation.category == '1') {
        this.project.category1Total++;
      } else if (this.donation.category == '2') {
        this.project.category2Total++;
      } else if (this.donation.category == '3') {
        this.project.category3Total++;
      } else if (this.donation.category == '4') {
        this.project.category4Total++;
      }
      this.spinnerService.show();

      this._fireStore.addDonation(this.project.id, this.donation)
        .then((docRef) => {
          this.updateCurrentDonation();
          myForm.reset({ sur: "הרב", category: '1' });
        });
    } else {
      this.error = true;
    }

  }

  onSearchChange(value) {
    this.model.sur = 'other';
  }

  updateCurrentDonation() {
    this._fireStore.updateCurrentDisplayDonation(this.donation).then(() => {
      this.updateCurrentProject();
    });
  }

  updateCurrentProject() {
    this._fireStore.updateCurrentDisplayProject(this.project).then(() => {
      this.updateProject()
    });
  }

  updateProject() {
    this._fireStore.updateProject(this.project).then(() => {
      this._flashMessagesService.show('Donation Added!', { cssClass: 'alert-success', timeout: 2000 });
      this.spinnerService.hide();
      this.donation = {};
      this.donation.category = '1';
      this.model = {
        sur: "הרב"
      };
    });
  }

  logout() {
    this.spinnerService.show();
    this._fireStore.simpleLogout();
  }

  _keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
