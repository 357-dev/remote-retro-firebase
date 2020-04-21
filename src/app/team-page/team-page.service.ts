
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TeamPageService {
  constructor(private db: AngularFireDatabase) { }

  createSprint(teamKey: string, name: string) {
    return this.db.list(`teams/${teamKey}/sprints`).push({ name, created: moment().format('Do MMM YYYY') });
  }

  deleteTeam(teamKey: string) {
    return this.db.object(`teams/${teamKey}`).remove()
      .then(() => {
        this.db.object(`estimations/${teamKey}`).remove();
        this.db.object(`actions/${teamKey}`).remove();
        this.db.object(`messages/${teamKey}`).remove();
      });
  }
}
