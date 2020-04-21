
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { TeamPage } from './models/team-page.model';
import { Sprint } from '../common/sprint.model';
import { DbUtils } from '../common/db-utils';

@Injectable({
  providedIn: 'root'
})
export class TeamPageResolver implements Resolve<TeamPage> {

  constructor(private db: AngularFireDatabase) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TeamPage> {
    const teamKey = route.paramMap.get('teamKey');
    const sprints = this.db.list<Sprint>(DbUtils.sprintsUrl(teamKey))
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(s => ({
          key: s.key,
          name: s.payload.val().name,
          created: s.payload.val().created
        }))
      ));

    return of({ key: teamKey, sprints });
  }
}
