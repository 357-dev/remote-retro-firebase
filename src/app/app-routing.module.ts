import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { TeamsPageResolver } from './teams-page/teams-page.resolver';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamPageResolver } from './team-page/team-page.resolver';
import { RetroPageComponent } from './retro-page/retro-page.component';
import { RetroPageResolver } from './retro-page/retro-page.resolver';
import { EstimationPageComponent } from './estimation-page/estimation-page.component';
import { EstimationPageResolver } from './estimation-page/estimation-page.resolver';


const routes: Routes = [
  {
    path: 'teams/:teamKey/sprints/:sprintKey/retros',
    component: RetroPageComponent,
    resolve: {
      model: RetroPageResolver
    }
  },
  {
    path: 'teams/:teamKey/sprints/:sprintKey/estimations',
    component: EstimationPageComponent,
    resolve: {
      model: EstimationPageResolver
    }
  },
  {
    path: 'teams/:teamKey',
    component: TeamPageComponent,
    resolve: {
      model: TeamPageResolver
    }
  },
  {
    path: 'teams',
    component: TeamsPageComponent,
    resolve: {
      model: TeamsPageResolver
    }
  },
  {
    path: '',
    component: IntroPageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
