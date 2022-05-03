import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import{SharedService} from './shared.service';


import{HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatrizComponent } from './body/matriz/matriz.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    MetodologiaComponent,
    MatrizComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
  ],
  
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
