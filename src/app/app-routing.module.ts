import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionsPageComponent } from './sessions-page/sessions-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { SessionsPageResolver } from './sessions-page/sessions-page.resolver';
import { SessionPageComponent } from './session-page/session-page.component';
import { SessionPageResolver } from './session-page/session-page.resolver';


const routes: Routes = [
  {
    path: 'sessions/:sessionKey',
    component: SessionPageComponent,
    resolve: {
      model: SessionPageResolver
    }
  },
  {
    path: 'sessions',
    component: SessionsPageComponent,
    resolve: {
      model: SessionsPageResolver
    }
  }, {
    path: '',
    component: IntroPageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
