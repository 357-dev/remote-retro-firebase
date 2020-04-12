import { Injectable } from '@angular/core';
import { SessionsPage } from './models/sessions-page.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Session } from '../common/session.model';

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
        changes.map(s => {
          return { key: s.key, title: s.payload.val().title, created: s.payload.val().created };
        })
      ));

    const model = new SessionsPage(sessions);
    return of(model);
  }
}

/*


[ {
    "payload": {
      "title": "Retro 1"
    },
    "type": "value",
    "prevKey": null,
    "key": "-M4ZgvRNdKNd5O9J6LTF" }, { "payload": { "created": "", "title": "asdads" }, "type": "value", "prevKey": "-M4ZgvRNdKNd5O9J6LTF", "key": "-M4Zi2BBXJ0oRYSfsnun" }, { "payload": { "created": "10th Apr 2020", "title": "aaaa" }, "type": "value", "prevKey": "-M4Zi2BBXJ0oRYSfsnun", "key": "-M4ZiR2bsXqklurNtuda" } ]

*/