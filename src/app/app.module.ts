import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { RetroMaterialModule } from './common/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SessionsPageComponent } from './sessions-page/sessions-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { SessionsPageResolver } from './sessions-page/sessions-page.resolver';
import { SessionPageComponent } from './session-page/session-page.component';
import { SessionsPageService } from './sessions-page/sessions-page.service';
import { CategoryFilterPipe } from './session-page/category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SessionsPageComponent,
    IntroPageComponent,
    SessionPageComponent,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    RetroMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [SessionsPageResolver, SessionsPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }