
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';
import { DbUtils } from '../common/db-utils';

@Injectable({
  providedIn: 'root'
})
export class TeamPageService {
  constructor(private db: AngularFireDatabase) { }

  createSprint(teamKey: string, name: string) {
    return this.db.list(DbUtils.sprintsUrl(teamKey)).push({ name, created: moment().format('Do MMM YYYY') });
  }

  deleteTeam(teamKey: string) {
    return this.db.object(DbUtils.teamUrl(teamKey)).remove()
      .then(() => {
        this.db.object(DbUtils.estimationsUrl(teamKey)).remove();
        this.db.object(DbUtils.actionsUrl(teamKey)).remove();
        this.db.object(DbUtils.messagesUrl(teamKey)).remove();
      });
  }
}
