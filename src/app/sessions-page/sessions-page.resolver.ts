import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../common/session.model';
import { SessionsPage } from './models/sessions-page.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsPageResolver implements Resolve<SessionsPage> {

  constructor(private db: AngularFireDatabase) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SessionsPage> {
    const sessions = this.db.list<Session>('sessions')
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(s => ({
          key: s.key,
          title: s.payload.val().title,
          created: s.payload.val().created
        }))
      ));

    const model = new SessionsPage(sessions);
    return of(model);
  }
}
