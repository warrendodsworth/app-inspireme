import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { FcmService } from './fcm.service';
import { HomeComponent } from './home/home.component';
import { NominateComponent } from './nominate/nominate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NominateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ContentLoaderModule,

  ],
  providers: [
    AuthService,
    FcmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
