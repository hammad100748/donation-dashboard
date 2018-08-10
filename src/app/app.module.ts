import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { environment } from '../environments/environment';
import { FirestoreService } from './services/firestore.service';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ScreenOneComponent } from './components/screen-one/screen-one.component';
import { ScreenTwoComponent } from './components/screen-two/screen-two.component';
import { ScreenThreeComponent } from './components/screen-three/screen-three.component';
import { CategoryScreenOneComponent } from './components/category-screen-one/category-screen-one.component';
import { CategoryScreenTwoComponent } from './components/category-screen-two/category-screen-two.component';
import { FinishProjectComponent } from './components/finish-project/finish-project.component';
import { HomeComponent } from './components/home/home.component';
import { DonationsComponent } from './components/donations/donations.component';
import { SearchByNamePipe } from './pipes/search-by-name.pipe';
import { ScreenTwoWithoutSumComponent } from './components/screen-two-without-sum/screen-two-without-sum.component';
import { ScreenTwoSumComponent } from './components/screen-two-sum/screen-two-sum.component';
import { LimitToDirectiveDirective } from './pipes/limit-to-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateProjectComponent,
    DataEntryComponent,
    ScreenOneComponent,
    ScreenTwoComponent,
    ScreenThreeComponent,
    CategoryScreenOneComponent,
    CategoryScreenTwoComponent,
    FinishProjectComponent,
    HomeComponent,
    DonationsComponent,
    SearchByNamePipe,
    ScreenTwoWithoutSumComponent,
    ScreenTwoSumComponent,
    LimitToDirectiveDirective
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AngularFirestoreModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireAuth,FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
