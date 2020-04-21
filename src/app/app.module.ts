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
import { IntroPageComponent } from './intro-page/intro-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { RetroPageComponent } from './retro-page/retro-page.component';
import { EstimationPageComponent } from './estimation-page/estimation-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsPageResolver } from './teams-page/teams-page.resolver';
import { TeamsPageService } from './teams-page/teams-page.service';
import { TeamPageResolver } from './team-page/team-page.resolver';
import { TeamPageService } from './team-page/team-page.service';
import { EstimationPageResolver } from './estimation-page/estimation-page.resolver';
import { EstimationPageService } from './estimation-page/estimation-page.service';
import { RetroPageResolver } from './retro-page/retro-page.resolver';
import { CategoryFilterPipe } from './retro-page/category.pipe';
import { MultistoryInputComponent } from './estimation-page/multistory-input/multistory-input.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    TeamsPageComponent,
    TeamPageComponent,
    RetroPageComponent,
    CategoryFilterPipe,
    EstimationPageComponent,
    MultistoryInputComponent
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
  providers: [TeamsPageResolver, TeamsPageService,
    TeamPageResolver, TeamPageService,
    EstimationPageResolver, EstimationPageService,
    RetroPageResolver, RetroPageResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }