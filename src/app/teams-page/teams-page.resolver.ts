import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { TeamsPage } from './models/teams-page.model';
import { Team } from './models/team.model';
import { DbUtils } from '../common/db-utils';

@Injectable({
  providedIn: 'root'
})
export class TeamsPageResolver implements Resolve<TeamsPage> {

  constructor(private db: AngularFireDatabase) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TeamsPage> {
    const teams = this.db.list<Team>(DbUtils.teamsUrl())
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(s => ({
          key: s.key,
          name: s.payload.val().name
        }))
      ));

    return of({ teams });
  }
}
