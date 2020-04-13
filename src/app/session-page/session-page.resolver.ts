import { Injectable } from '@angular/core';
import { SessionPage } from './models/session-page.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './models/message.model';
import { Session } from '../common/session.model';
import { Action } from './models/action.model';

@Injectable({
  providedIn: 'root'
})
export class SessionPageResolver implements Resolve<SessionPage> {

  constructor(private db: AngularFireDatabase) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SessionPage> {
    const sessionKey = route.paramMap.get('sessionKey');
    const session = this.db.object<Session>(`sessions/${sessionKey}`)
      .snapshotChanges()
      .pipe(map(s => ({
        key: sessionKey,
        title: s.payload.val().title,
        created: s.payload.val().created
      })));

    const messages = this.db.list<Message>(`messages/${sessionKey}`)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(m => ({
          key: m.key,
          body: m.payload.val().body,
          author: m.payload.val().author,
          category: m.payload.val().category,
          votes: m.payload.val().votes
        }))
      ));

    const actions = this.db.list<Action>(`actions/${sessionKey}`)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(m => ({
          key: m.key,
          action: m.payload.val().action
        }))
      ));

    return of({ sessionKey, session, messages, actions });
  }
}
