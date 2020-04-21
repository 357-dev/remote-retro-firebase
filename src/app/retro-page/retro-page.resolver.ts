import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { RetroPage } from './models/retro-page.model';
import { Message } from './models/message.model';
import { Action } from './models/action.model';
import { Sprint } from '../common/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class RetroPageResolver implements Resolve<RetroPage> {

  constructor(private db: AngularFireDatabase) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<RetroPage> {
    const teamKey = route.paramMap.get('teamKey');
    const sprintKey = route.paramMap.get('sprintKey');

    const sprint = this.db.object<Sprint>(`teams/${teamKey}/sprints/${sprintKey}`).valueChanges();
    const messages = this.db.list<Message>(`messages/${sprintKey}`)
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

    const actions = this.db.list<Action>(`actions/${sprintKey}`)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(m => ({
          key: m.key,
          action: m.payload.val().action
        }))
      ));

    return of({ teamKey, sprintKey, sprint, messages, actions });
  }
}
